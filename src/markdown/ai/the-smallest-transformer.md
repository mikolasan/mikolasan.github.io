---
article: quest
title: The smallest Transformer
date: 2023-06-03
published: 2023-06-03
lastModified: 2023-06-03
---


## Questions

- What stacks add to the whole picture? How are they different?
- Why 2 parts are called encoder and encoder if they both take input data similarly and process data with almost exact layers? (Only if the first layer of the decoder consisting of the masked multi-head attention is converting encoder into decoder. Or because data from encoder is forwarded into the decoder?). I think that names of these two parts should reflect time-relative context.

>  The models proposed recently for neural machine translation often belong to a family of encoder-decoders and consists of an encoder that encodes a source sentence into a fixed-length vector from which a decoder generates a translation.
>
> _[Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/abs/1409.0473)_


Based on [this tutorial](https://www.tensorflow.org/text/tutorials/transformer)

I am trying to understand the difference in training data between sequence2sequence and bidirectional Transformers (like [BERT](https://arxiv.org/pdf/1810.04805.pdf), [code](https://github.com/tensorflow/models/blob/master/official/legacy/bert/bert_models.py))


## Reference

White papers that we are going to use

- [Original Transformer](https://nlp.seas.harvard.edu/2018/04/03/attention.html) with code
- [Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- The Annotated Transformer [version 1](https://nlp.seas.harvard.edu/2018/04/03/attention.html) [version 2](https://nlp.seas.harvard.edu/annotated-transformer/) (PyTorch)
- [Embedding](https://medium.com/deeper-learning/glossary-of-deep-learning-word-embedding-f90c3cec34ca) is just a way of converting sentences into vectors.


## Code

So let's start coding our simple version. In its core the transformer has encoder-decoder structure.

```py
import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F


class Transformer(nn.Module):
    def __init__(self, input_size, hidden_size, num_heads, num_layers):
        super(Transformer, self).__init__()
        self.embedding = nn.Embedding(input_size, hidden_size)
        self.encoder = Encoder(hidden_size, num_heads, num_layers)
        self.decoder = Decoder(hidden_size, num_heads, num_layers)
        self.output_layer = nn.Linear(hidden_size, input_size)

    def forward(self, src, trg):
        src = self.embedding(src)
        trg = self.embedding(trg)
        enc_output = self.encoder(src)
        dec_output = self.decoder(trg, enc_output)
        output = self.output_layer(dec_output)
        return output
```

We start with the Encoder which is 

```py
class Encoder(nn.Module):
    def __init__(self, hidden_size, num_heads, num_layers):
        super(Encoder, self).__init__()
        # use nn.ModuleList instead of nn.Sequential because `num_layers` is an input parameter
        self.layers = nn.ModuleList([
            EncoderLayer(hidden_size, num_heads) for _ in range(num_layers)
        ])

    def forward(self, x):
        for layer in self.layers:
            x = layer(x)
        return x
```

```py
# Define the Encoder Layer
class EncoderLayer(nn.Module):
    def __init__(self, hidden_size, num_heads):
        super(EncoderLayer, self).__init__()
        self.self_attention = MultiHeadAttention(hidden_size, num_heads)
        self.feedforward = FeedForward(hidden_size)

    def forward(self, x):
        att_output = self.self_attention(x, x, x)
        x = att_output + x
        x = self.feedforward(x)
        return x

# Define the Multi-Head Attention mechanism
class MultiHeadAttention(nn.Module):
    def __init__(self, hidden_size, num_heads):
        super(MultiHeadAttention, self).__init__()
        self.num_heads = num_heads
        self.head_size = hidden_size // num_heads
        self.q_linear = nn.Linear(hidden_size, hidden_size)
        self.k_linear = nn.Linear(hidden_size, hidden_size)
        self.v_linear = nn.Linear(hidden_size, hidden_size)
        self.out_linear = nn.Linear(hidden_size, hidden_size)

    def forward(self, query, key, value):
        batch_size = query.shape[0]

        Q = self.q_linear(query).view(batch_size, -1, self.num_heads, self.head_size)
        K = self.k_linear(key).view(batch_size, -1, self.num_heads, self.head_size)
        V = self.v_linear(value).view(batch_size, -1, self.num_heads, self.head_size)

        Q = Q.permute(0, 2, 1, 3)
        K = K.permute(0, 2, 1, 3)
        V = V.permute(0, 2, 1, 3)

        att_scores = torch.matmul(Q, K.permute(0, 1, 3, 2)) / self.head_size**0.5
        att_scores = F.softmax(att_scores, dim=-1)

        att_output = torch.matmul(att_scores, V)
        att_output = att_output.permute(0, 2, 1, 3).contiguous().view(batch_size, -1, self.num_heads * self.head_size)

        att_output = self.out_linear(att_output)
        return att_output

# Define the Feed-Forward Layer
class FeedForward(nn.Module):
    def __init__(self, hidden_size):
        super(FeedForward, self).__init__()
        self.fc1 = nn.Linear(hidden_size, 4 * hidden_size)
        self.fc2 = nn.Linear(4 * hidden_size, hidden_size)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# Initialize the model and define a simple training loop
input_size = 2  # 0 and 1 in the sequence
hidden_size = 256
num_heads = 4
num_layers = 2
seq_length = 10

model = Transformer(input_size, hidden_size, num_heads, num_layers)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Generate a simple input sequence (1 0 1 0 1 0...)
input_seq = torch.tensor([1, 0] * (seq_length // 2), dtype=torch.long)
target_seq = input_seq[1:]  # Shift the target by one time step

# Training loop
for epoch in range(1000):
    optimizer.zero_grad()
    output = model(input_seq.unsqueeze(0), target_seq.unsqueeze(0))
    loss = criterion(output.view(-1, input_size), target_seq)
    loss.backward()
    optimizer.step()

    if (epoch + 1) % 100 == 0:
        print(f'Epoch [{epoch + 1}/1000], Loss: {loss.item():.4f}')

# Test the model
with torch.no_grad():
    test_input = torch.tensor([1, 0] * (seq_length // 2), dtype=torch.long)
    predicted_output = model(test_input.unsqueeze(0), test_input[:seq_length - 1].unsqueeze(0))
    predicted_sequence = torch.argmax(predicted_output, dim=-1).squeeze().tolist()
    print("Input Sequence:", test_input.tolist())
    print("Predicted Sequence:", predicted_sequence)

```

## Homework

- What is a usual window size for attention in current models? See [here](https://stats.stackexchange.com/questions/411736/why-do-attention-models-need-to-choose-a-maximum-sentence-length/411919#411919) why it's theoretically infinite
- How Transformers solve problem with [overfitting usually caused by softmax](https://smerity.com/articles/2017/mixture_of_softmaxes.html)?

> The softmax allows you to produce a probability distribution over a set of classes