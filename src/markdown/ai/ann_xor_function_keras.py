"""
Original code:
https://github.com/ardendertat/Applied-Deep-Learning-with-Keras/blob/master/notebooks/Part%201%20-%20Artificial%20Neural%20Networks.ipynb
"""

from keras.layers import Dense
from keras.models import Sequential
import numpy as np
import pandas as pd

import matplotlib.pyplot as plt

X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
Y = np.array([0, 1, 1, 0])


model = Sequential()
model.add(Dense(1, input_shape=(2,), activation='sigmoid'))
model.compile('adam', 'binary_crossentropy', metrics=['accuracy'])
history = model.fit(X, Y, verbose=1, epochs=20)


def plot_loss_accuracy(history):
    historydf = pd.DataFrame(history.history, index=history.epoch)
    plt.figure(figsize=(8, 6))
    historydf.plot(ylim=(0, max(1, historydf.values.max())))
    loss = history.history['loss'][-1]
    acc = history.history['accuracy'][-1]
    plt.title('Loss: %.3f, Accuracy: %.3f' % (loss, acc))
    plt.show()


plot_loss_accuracy(history)