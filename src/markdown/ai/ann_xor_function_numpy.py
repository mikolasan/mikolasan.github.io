"""
Original code:
https://raw.githubusercontent.com/ahmedfgad/NumPyANN/master/TutorialProject/ann_numpy.py

"""

import numpy


def sigmoid(inpt):
    return 1.0 / (1 + numpy.exp(-1 * inpt))

def relu(inpt):
    result = inpt
    result[inpt < 0] = 0
    return result

def update_weights(weights, learning_rate):
    new_weights = weights - learning_rate * weights
    return new_weights

def train_network(num_iterations,
                  weights,
                  biases,
                  data_inputs,
                  data_outputs,
                  learning_rate,
                  activation="relu"):
    for iteration in range(num_iterations):
        print("Itreation ", iteration)
        
        n_training_steps = data_inputs.shape[0]
        for sample_idx in range(n_training_steps):
            x = data_inputs[sample_idx, :]
            for idx in range(len(weights) - 1):
                curr_weights = weights[idx]
                x = numpy.matmul(x, curr_weights)
                if activation == "relu":
                    x = relu(x)
                elif activation == "sigmoid":
                    x = sigmoid(x)
            curr_weights = weights[-1]
            x = numpy.matmul(x, curr_weights)
            predicted_label = numpy.where(x == numpy.max(x))[0][0]
            desired_label = data_outputs[sample_idx]
            if predicted_label != desired_label:
                weights = update_weights(weights, learning_rate)

    return (weights, biases)


def predict_outputs(weights, data_inputs, activation="relu"):
    predictions = numpy.zeros(shape=(data_inputs.shape[0]))
    for sample_idx in range(data_inputs.shape[0]):
        x = data_inputs[sample_idx, :]
        for curr_weights in weights:
            x = numpy.matmul(x, curr_weights)
            if activation == "relu":
                x = relu(x)
            elif activation == "sigmoid":
                x = sigmoid(x)
        predicted_label = numpy.where(x == numpy.max(x))[0][0]
        predictions[sample_idx] = predicted_label
    return predictions


data_inputs = numpy.array([ [0,0], [0,1], [1,0], [1,1] ], numpy.int32)
data_outputs = numpy.array([0,1,1,0], numpy.int32)
n_neurons_per_layer = [data_inputs.shape[1], 2, 1]
weights = numpy.random.uniform(low=-0.1, high=0.1,
                               size=(n_neurons_per_layer[0], n_neurons_per_layer[1]))
biases = numpy.random.uniform(low=-0.1, high=0.1,
                              size=(n_neurons_per_layer[1], n_neurons_per_layer[2]))

weights_tarined, biases_tarined = train_network(num_iterations=10,
                        weights=weights,
                        biases=biases,
                        data_inputs=data_inputs,
                        data_outputs=data_outputs,
                        learning_rate=0.01,
                        activation="relu")

print(weights_tarined)
print(biases_tarined)


# predictions = predict_outputs(weights, data_inputs)
# num_flase = numpy.where(predictions != data_outputs)[0]
# print("num_flase ", num_flase.size)


# if __name__ == "__main__":
#     model = XOR()
#     train(model)
#     plot_model(model)