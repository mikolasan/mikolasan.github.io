---
path: "/ru/neural-networks/face-recognition"
date: "2020-08-09"
title: Распознавание лиц
language: "ru"
draft: true
published: 2021-10-13
lastModified: 2022-07-31
---

## Теоретическая база

В распознавании изображений и лиц сейчас правят сверточные сети. Чтобы понимать их конфигурацию описываемую в статьях, нужно знать основные понятия:

- сверточный слой
- ядро свертки, шаг свертки, пул
- ReLu

- https://cs231n.github.io/convolutional-networks/ - большая подробная статья, некогда читать.
- https://towardsdatascience.com/a-comprehensive-guide-to-convolutional-neural-networks-the-eli5-way-3bd2b1164a53 - здесь все понятно из картинок, не надо читать.

## Пробуем существующие модели

Не буду пересказывать эту статью https://machinelearningmastery.com/how-to-perform-face-recognition-with-vggface2-convolutional-neural-network-in-keras/. В нее просто нужно заглянуть.

Начнем мы с картинок. VGGFace2 http://www.robots.ox.ac.uk/~vgg/data/vgg_face2/

ResNet 50 https://github.com/WeidiXie/Keras-VGGFace2-ResNet50

## Многозадачная каскадная сверточная сеть

Модели, которые нас интересуют будут решать задачу классификации, и возможно предсказания, в частности определение пола, возраста, расовой, этнической принадлежности (эту классификацию я буду использовать для мемов). Но в самом первом шаге связанном с обработкой изображений они опираются на совсем другую модель - MTCNN (Multi-task Cascaded Convolutional Networks). https://kpzhang93.github.io/MTCNN_face_detection_alignment/paper/spl.pdf

- https://kpzhang93.github.io/MTCNN_face_detection_alignment/index.html - оригинальная статья и код
- https://github.com/davidsandberg/facenet - FaceNet, где MTCNN присутствует на этапе подгонки (https://github.com/davidsandberg/facenet/tree/master/src/align)
- https://github.com/ipazc/mtcnn - взяли из FaceNet и переписали лучше


```
pip install mtcnn tensorflow
```

Hatefull Memes data/img -> 01235.png, 01247.png
https://en.wikipedia.org/wiki/File:Sharon_Stone_Cannes_2013_2.jpg -> sharon_stone1.jpg
```
>>> import mtcnn
>>> import matplotlib.pyplot as plt
>>> detector = mtcnn.MTCNN()

>>> pixels = plt.imread("01235.png")
>>> results = detector.detect_faces(pixels)
>>> results
[]
>>> pixels = plt.imread("01247.png")
>>> results = detector.detect_faces(pixels)
>>> results
[]
>>> pixels = plt.imread("sharon_stone1.jpg")
>>> results = detector.detect_faces(pixels)
>>> results
[{'box': [269, 133, 106, 145], 'confidence': 0.9998786449432373, 'keypoints': {'left_eye': (292, 191), 'right_eye': (341, 191), 'nose': (312, 216), 'mouth_left': (293, 238), 'mouth_right': (343, 238)}}]
```

:'(

Может с FaceNet будет больше удачи?

Очень хорошо оформленная статья о том, как задавать переменные окружения https://www3.ntu.edu.sg/home/ehchua/programming/howto/Environment_Variables.html

Первый вопрос, конечно, как это запустить и где взять соленых огурчиков? 

Многие (один и тот же человек, но много раз) задаются этим вопросом

https://github.com/davidsandberg/facenet/issues/463
https://github.com/davidsandberg/facenet/issues/1107
https://github.com/davidsandberg/facenet/issues/1115

Хорошо, что автор предоставил подробную вики

https://github.com/davidsandberg/facenet/wiki/Train-a-classifier-on-own-images


