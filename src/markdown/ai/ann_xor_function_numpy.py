"""
Original code:
https://raw.githubusercontent.com/ahmedfgad/NumPyANN/master/TutorialProject/ann_numpy.py

The matmul function implements the semantics of the @ operator introduced in Python 3.5 following PEP 465.
"""

import numpy as np


def sigmoid(x):
    return 1 / (1 + np.exp(-1 * x))


def relu(x):
    return max(0, x)


def forward(idx, inputs, weights, biases, activation):
    x = inputs
    # first hidden layer
    y_1 = np.dot(x, weights[0]) + biases[0][idx, :]
    y_1 = activation(y_1)
    # output
    y_2 = np.dot(y_1, weights[1]) + biases[1][idx, :]
    y_2 = activation(y_2)
    return [y_1, y_2]
    

def train_network(epochs,
                  weights,
                  biases,
                  data_inputs,
                  data_outputs,
                  learning_rate,
                  activation=sigmoid):
    for i in range(epochs):
        print("Itreation ", i)
        
        n_training_steps = data_inputs.shape[0]
        for idx in range(n_training_steps):
            x = data_inputs[idx, :]
            y = forward(idx, x, weights, biases, activation)
            
            # mean squared error ?
            # mse = np.sum(diff) / (2.0 * y_hat.shape[0])
            
            diff = x - y[1]
            
            grad_2 = y[1] * (1 - y[1])
            d_2 = 2 * diff * grad_2
            weights[1] += learning_rate * y[0].T.dot(d_2)
            
            grad_1 = y[0] * (1 - y[0])
            d_1 = d_2 @ weights[1] * grad_1
            weights[0] += learning_rate * x * d_1

    return (weights, biases)


def predict_outputs(weights, data_inputs, activation=sigmoid):
    predictions = np.zeros(shape=(data_inputs.shape[0]))
    for sample_idx in range(data_inputs.shape[0]):
        x = forward(data_inputs[sample_idx, :], weights, biases, activation)
        predicted_label = np.where(x == np.max(x))[0][0]
        predictions[sample_idx] = predicted_label
    return predictions


data_inputs = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
data_outputs = np.array([0, 1, 1, 0])
n_neurons_per_layer = [data_inputs.shape[1], 2, 1]

# weights_1 = np.random.uniform(low=-0.1, high=0.1,
#                                size=(n_neurons_per_layer[0], n_neurons_per_layer[1]))
# weights_2 = np.random.uniform(low=-0.1, high=0.1,
#                                size=(n_neurons_per_layer[1], n_neurons_per_layer[2]))
# weights = [weights_1, weights_2]

# bias_1 = np.random.uniform(low=-0.1, high=0.1,
#                               size=(n_neurons_per_layer[1], 1))
# bias_2 = np.random.uniform(low=-0.1, high=0.1,
#                               size=(n_neurons_per_layer[2], 1))
# biases = [bias_1, bias_2]

weights_1 = np.random.randn(n_neurons_per_layer[0], n_neurons_per_layer[1]) * 0.1
weights_2 = np.random.randn(n_neurons_per_layer[1], n_neurons_per_layer[2]) * 0.1
weights = [weights_1, weights_2]

bias_1 = np.zeros((n_neurons_per_layer[1], 1))
bias_2 = np.zeros((n_neurons_per_layer[2], 1))
biases = [bias_1, bias_2]


(weights_tarined, biases_tarined) = train_network(epochs=10,
                        weights=weights,
                        biases=biases,
                        data_inputs=data_inputs,
                        data_outputs=data_outputs,
                        learning_rate=0.02,
                        activation=sigmoid)

print(weights_tarined)
print(biases_tarined)


# predictions = predict_outputs(weights, data_inputs)
# num_flase = np.where(predictions != data_outputs)[0]
# print("num_flase ", num_flase.size)


# if __name__ == "__main__":
#     model = XOR()
#     train(model)
#     plot_model(model)