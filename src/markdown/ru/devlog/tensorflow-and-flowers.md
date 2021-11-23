---
date: 2020-06-20
title: TensorFlow и цветочки
path: /ru/blog/tensorflow-and-flowers
language: "ru"
published: 2021-10-28
lastModified: 2021-10-28
---

Нашел квест для себя на субботу

https://stackoverflow.com/questions/62090925/how-to-get-data-generator-more-efficient

---

To train a neural network, I modified a code I found on YouTube. It looks as follows:

```
def data_generator(samples, batch_size, shuffle_data = True, resize=224):
  num_samples = len(samples)
  while True:
    random.shuffle(samples)

    for offset in range(0, num_samples, batch_size):
      batch_samples = samples[offset: offset + batch_size]

      X_train = []
      y_train = []

      for batch_sample in batch_samples:
        img_name = batch_sample[0]
        label = batch_sample[1]
        img = cv2.imread(os.path.join(root_dir, img_name))

        #img, label = preprocessing(img, label, new_height=224, new_width=224, num_classes=37)
        img = preprocessing(img, new_height=224, new_width=224)
        label = my_onehot_encoded(label)

        X_train.append(img)
        y_train.append(label)

      X_train = np.array(X_train)
      y_train = np.array(y_train)

      yield X_train, y_train
```

Now, I tried to train a neural network using this code, train sample size is 105.000 (image files which contain 8 characters out of 37 possibilities, A-Z, 0-9 and blank space). I used a relatively small batch size (32, I think that is already too small) to get it more efficient but nevertheless it took like forever to train one quarter of the first epoch (I had 826 steps per epoch, and it took 90 minutes for 199 steps... steps_per_epoch = num_train_samples // batch_size).

The following functions are included in the data generator:

```
def shuffle_data(data):
  data=random.shuffle(data)
  return data
```

I don't think we can make this function anyhow more efficient or exclude it from the generator.

```
def preprocessing(img, new_height, new_width):
  img = cv2.resize(img,(new_height, new_width))
  img = img/255
  return img
```

For preprocessing/resizing the data I use this code to get the images to a unique size of e.g. (224, 224, 3). I think, this part of the generator takes the most time, but I don't see a possibility to exclude it from the generator (since my memory would be full, if we resize the images outside the batches).

```
#One Hot Encoding of the Labels
from numpy import argmax
# define input string

def my_onehot_encoded(label):
    # define universe of possible input values
    characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ '
    # define a mapping of chars to integers
    char_to_int = dict((c, i) for i, c in enumerate(characters))
    int_to_char = dict((i, c) for i, c in enumerate(characters))
    # integer encode input data
    integer_encoded = [char_to_int[char] for char in label]
    # one hot encode
    onehot_encoded = list()
    for value in integer_encoded:
        character = [0 for _ in range(len(characters))]
        character[value] = 1
        onehot_encoded.append(character)

    return onehot_encoded 
```

I think, in this part there could be one approach to make it more efficient. I am thinking about to exclude this code from the generator and produce the array y_train outside of the generator, so that the generator does not have to one hot encode the labels every time.

What do you think? Or should I maybe go for a completely different approach?

---

Вопрос простой: почему всё так медленно?

Ответ обычно тоже прост: все вычисления должны быть на компилируемом языке, распареллелены между многими машинами и ядрами с использованием мощностей современных видеокарт.

## Почему же это квест?

Потому что, хотя вопрос и содержит много фрагментов кода и описания, он не дает каких-либо конкретных ссылок на полный код вместе с данными для обучения, и тем более даже не описывает решаемую проблему. Поэтому мне и стало интересно по некоторым отрывкам информации восстановить полную картину, сформулировать проблему, попробовать ее решить и ответить на вопрос и получить наградные очки на StackOverflow. Итак, поехали.

## Кодирование "Один Горяченький"

Как видно из кода, `onehot` это очень уникальное слово, которое может и быть основной решаемой задачей.

Но нет. 

https://machinelearningmastery.com/why-one-hot-encode-data-in-machine-learning/

Когда в обучающейся выборке имеются не числовые данные, то мы кодируем их числами, чтобы скормить алгоритму. Но природа некоторых алгоритмов такова, что они толкуют числа буквально, добавляя скрытый смысл в их значения, сравнивая их и сортируя. Для таких вещей мы создаем под каждое значение категории отдельный параметр, который может быть 0 или 1. Из всей группы добавленных параметров только один может равняться 1, чтобы соответствовать закодированной категории. Отсюда и название только "один активирован". Как же его перевели, интересно в российских публикациях?

Поиск по Гитхабу иногда заменяет мне все документации, ответы на StackOverflow. Просто потому что я нахожу использование функции в контексте и это почему-то оказывается легче понять и применить к своей задаче, чем читать аналитичесие статьи. Нужно чтобы просто работало.

https://github.com/search?q=def+data_generator%28samples%2C+batch_size%2C+shuffle_data+%3D+True%2C+resize%3D224%29&type=Code

А вот и он

https://github.com/anujshah1003/custom_data_generator

И его видео на ютубе

Part-1: Introduction - https://youtu.be/oy5EeamF_M8

Part-2: What is a generator function - https://youtu.be/2tRR45vcn3o

Часть 3 https://www.youtube.com/watch?v=EkzB6PJIcCA

## Пытаемся воспользоваться кодом из видео

Скачиваем датасет https://www.kaggle.com/alxmamaev/flowers-recognition/data (нужна регистрация в kaggle, если у вас еще нет)

## Для ответа

I guess you have made a wrong conclusion that the data generator itself causes the problem of slow training. 

That three part video tutorial and github code https://github.com/anujshah1003/custom_data_generator work with single images only using stack of convolutional layers. But as I understand you are combining 8 characters into one image and you want to follow approach of recognizing multiple images at once. For that task you need R-CNN or YOLO as your model. 

If you are playing with OCR or handwritten charather recognition may be it is better to start with another tutorials focused on your field. For example, https://github.com/frereit/TensorflowHandwritingRecognition, https://medium.com/@ageitgey/machine-learning-is-fun-part-3-deep-learning-and-convolutional-neural-networks-f40359318721

## Other datasets

- https://www.nist.gov/srd/nist-special-database-19
- https://s3.amazonaws.com/nist-srd/SD19/by_merge.zip
- https://lionbridge.ai/datasets/15-best-ocr-handwriting-datasets/
- Flowers https://www.robots.ox.ac.uk/~vgg/data/flowers/17/index.html
- Images https://www.robots.ox.ac.uk/~vgg/data/flowers/17/17flowers.tgz

## The Answer

I have found your question very intriguing because you give only clues. So here is my investigation.

Using your snippets, I have found [GitHub repository][1] and 3 part video tutorial on YouTube that mainly focuses [on the benefits][2] of using generator functions in Python.
The data is based on [this kaggle][3] (I would recommend to check out different kernels on that problem to compare the approach that you already tried with another CNN networks and review API in use).

You do not need to write a data generator from scratch, though it is not hard, but inventing the wheel is not productive. 

- Keras has the [ImageDataGenerator][4] class.
- Plus here is a more generic example for [DataGenerator][5].
- Tensorflow offers [very neat pipelines][6] with their `tf.data.Dataset`.

Nevertheless, to solve the kaggle's task, the model needs to perceive single images only, hence the model is a simple deep CNN. But as I understand, you are combining 8 random characters (classes) into one image to [recognize multiple classes][7] at once. For that task, you need R-CNN or YOLO as your model. I just recently opened for myself [YOLO v4][8], and it is possible to make it work for specific task really quick.

General advice about your design and code.
- Make sure the library uses GPU. It saves a lot of time. (Even though I repeated flowers experiment from the repository very fast on CPU - about 10 minutes, but resulting predictions are no better than a random guess. So full training requires a lot of time on CPU.) 
- Compare different versions to find a bottleneck. Try a dataset with 48 images (1 per class), increase the number of images per class, and compare. Reduce image size, change the model structure, etc.
- Test brand new models on small, artificial data to prove the idea or use iterative process, start from projects that can be converted to your task ([handwriting recognition][9]?).

[1]: https://github.com/anujshah1003/custom_data_generator
[2]: http://www.jessicayung.com/using-generators-in-python-to-train-machine-learning-models/
[3]: https://www.kaggle.com/alxmamaev/flowers-recognition
[4]: https://keras.io/api/preprocessing/image/#imagedatagenerator-class
[5]: https://stanford.edu/~shervine/blog/keras-how-to-generate-data-on-the-fly
[6]: https://www.tensorflow.org/api_docs/python/tf/data/Dataset
[7]: https://machinelearningmastery.com/object-recognition-with-deep-learning/
[8]: https://github.com/AlexeyAB/darknet
[9]: https://github.com/topics/handwriting-recognition?l=python&o=desc&s=stars
