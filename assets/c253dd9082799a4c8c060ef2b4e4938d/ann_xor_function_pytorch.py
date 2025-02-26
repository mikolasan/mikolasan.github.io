"""
Original code:
https://courses.cs.washington.edu/courses/cse446/18wi/sections/section8/XOR-Pytorch.html

Another reference from:
https://medium.com/mlearning-ai/learning-xor-with-pytorch-c1c11d67ba8e
https://colab.research.google.com/drive/1sKJfB5YAfAUD9PU-SNDGlMdKa9M7yCcH?usp=sharing

Made it work in Python 3, PyTorch 1.11
"""

import torch
import torch.nn as nn
import numpy as np

import matplotlib.pyplot as plt
# %matplotlib inline

# for reproducible results
# torch.manual_seed(2)
# np.random.seed(2)

epochs = 2001
X = torch.Tensor([ [0,0], [0,1], [1,0], [1,1] ])
Y = torch.Tensor([0,1,1,0]).view(-1,1)


class XOR(nn.Module):
    def __init__(self, input_dim = 2, output_dim=1):
        super(XOR, self).__init__()
        self.linear1 = nn.Linear(input_dim, 2)
        self.linear2 = nn.Linear(2, output_dim)
    
    def forward(self, x):
        x = self.linear1(x)
        x = torch.sigmoid(x)
        x = self.linear2(x)
        return x


def train(model):
    def weights_init(model):
        # initialize the weight tensor and bias
        linear_layers = [m for m in model.modules() if isinstance(m, nn.Linear)]
        for m in linear_layers:
                # here we use a normal distribution
                m.weight.data.normal_(0, 1)
                # print(f'Initial weights: {m.weight}')

    weights_init(model)
    mseloss = nn.MSELoss() # mean squared error
    optimizer = torch.optim.SGD(model.parameters(), lr=0.02, momentum=0.9)
    # optimizer = torch.optim.Adam(model.parameters(), lr=0.03)

    for i in range(epochs):
        y_hat = model.forward(X)
        loss = mseloss(y_hat, Y)
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()

        if i % 500 == 0:
            print(f'Epoch: {i}, Loss: {loss.item()}') 


def plot_model(model):
    model_params = list(model.parameters()) # returns weights and biases
    model_weights = model_params[0].data.numpy()
    print(f' Model weights: {model_weights}')
    model_bias = model_params[1].data.numpy()
    print(f' Model bias: {model_bias}')
    # model_weights = model_params[2].data.numpy()
    # print(f' Model weights: {model_weights}')
    # model_bias = model_params[3].data.numpy()
    # print(f' Model bias: {model_bias}')

    plt.scatter(X.numpy()[[0,-1], 0], X.numpy()[[0, -1], 1], s=50)
    plt.scatter(X.numpy()[[1,2], 0], X.numpy()[[1, 2], 1], c='red', s=50)

    x_1 = np.arange(-0.1, 1.1, 0.1)
    y_1 = ((x_1 * model_weights[0,0]) + model_bias[0]) / (-model_weights[0,1])
    plt.plot(x_1, y_1)

    x_2 = np.arange(-0.1, 1.1, 0.1)
    y_2 = ((x_2 * model_weights[1,0]) + model_bias[1]) / (-model_weights[1,1])
    plt.plot(x_2, y_2)
    plt.legend(["neuron_1", "neuron_2"], loc=8)
    plt.show()


if __name__ == "__main__":
    model = XOR()
    train(model)
    plot_model(model)