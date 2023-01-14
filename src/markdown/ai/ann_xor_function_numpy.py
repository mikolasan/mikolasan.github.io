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


epochs = 3000
learning_rate = 0.1
data_inputs = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
data_outputs = np.array([0, 1, 1, 0])
n_neurons_per_layer = [data_inputs.shape[1], 2, 1]

# normal or uniform?

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

bias_1 = np.zeros((1, n_neurons_per_layer[1]))
bias_2 = np.zeros((1, n_neurons_per_layer[2]))


print(weights_1)
print(bias_1)
print(weights_2)
print(bias_2)

print("Learning started >>>>>>")

for i in range(epochs):
    # print("Itreation ", i)
    
    n_training_steps = data_inputs.shape[0]
    for idx in range(n_training_steps):
        x = data_inputs[idx, :]
        y = data_outputs[idx] # scalar
        
        x = x[:, np.newaxis].T # column vector
        # first hidden layer
        y_1 = np.dot(x, weights_1) + bias_1 # why x is first? (bias - column vector)
        y_1 = sigmoid(y_1) # column vector
        # output
        y_2 = np.dot(y_1, weights_2) + bias_2 # column vector (just one row)
        # y_2 = sigmoid(y_2)
        y_2 = relu(y_2)
        
        diff = y - y_2 # 1 element matrix (column vector)

        # mean squared error ?
        # mse = np.sum(diff) / (2.0 * y_2.shape[0])
        # print(idx, mse)
        
        grad_2 = 1 # y_2 * (1 - y_2) # sigmoid derivative
        d_2 = diff * grad_2 # 1 element matrix (column vector)
        # np.sum(dZ2,axis=1,keepdims=True)
        dw2 = y_1.T.dot(d_2)
        weights_2 += learning_rate * dw2
        bias_2 += learning_rate * d_2
        
        grad_1 = y_1 * (1 - y_1) # sigmoid derivative
        d_1 = (weights_2.T * d_2) * grad_1
        dw1 = x.T.dot(d_1)
        weights_1 += learning_rate * dw1
        bias_1 += learning_rate * d_1


print(weights_1)
print(bias_1)
print(weights_2)
print(bias_2)

# weights_1 = np.array([[ 2.270331,  -2.229928 ],
#  [-2.6983902,  2.6428392]])
# bias_1 = np.array([[-1.5070016, -1.8964257]])
# weights_2 = np.array([[2.6182203, 2.580663 ]])
# bias_2 = np.array([[-0.81167006]])

def network_forward(x):
    global weights_1, weights_2, bias_1, bias_2
    y_1 = np.dot(x, weights_1) + bias_1
    y_1 = sigmoid(y_1)
    y_2 = np.dot(y_1, weights_2) + bias_2
    y_2 = relu(y_2)
    if isinstance(y_2, np.ndarray):
        y_2 = y_2.item()
    return y_2

 

print(network_forward(np.array([0,0])))
print(network_forward(np.array([0,1])))
print(network_forward(np.array([1,0])))
print(network_forward(np.array([1,1])))