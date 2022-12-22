---
path: "/ru/neural-networks/nlp-introduction"
date: "2020-07-15"
title: Введение в обработку естественного языка
language: "ru"
draft: true
published: 2021-10-13
lastModified: 2022-07-31
---

Вот наша цель - понимать остроту мемов.

- **The Hateful Memes Challenge: Detecting Hate Speech in Multimodal Memes**
- https://arxiv.org/abs/2005.04790
- https://arxiv.org/pdf/2005.04790.pdf

Как это принято в науке, зададим некоторые ограничения, которые помогут формалиозовать задачу.

Начнем с английского языка, для которого существует множество исследований и опубликованных моделей. В дельнейшем выбранный алгоритм можно будет попробовать натренировать на русском языке.

Определение о дискриминации данное в статье, должно задавать классификацию как тренировочным так и тестовым мемам. Я думаю, что подход "без учителя" даст непреодолимое преимущество по сравнению с другими моделями, которые скорей всего будут использовать нейронные сети, которые в свою очередь очень зависят от тренировочных данных.

Если возможно описывать происходящее на картинке, пересказывать смысл текста, если он использует зашифрованные культурные знания, связывать текст с картинки с подписью и делать вывод опираясь на определение. Синтаксический анализ и машинное зрение должны привести нас к логическому выводу. Приступим.


## Поисковые запросы:

- language processing modality
- machine learning generate questions from text
- how machine can understand text
- ...


## Новые понятия

- [Formal semantics](https://en.wikipedia.org/wiki/Formal_semantics_(linguistics))
- RNTN - Recursive Neural Tensor Network
- KL Divergence [1](https://machinelearningmastery.com/divergence-between-probability-distributions/) [2](https://www.countbayesie.com/blog/2017/5/9/kullback-leibler-divergence-explained) [3](https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence)
- [Dependency grammar](https://en.wikipedia.org/wiki/Dependency_grammar) - грамматика зависимостей

## Статьи и зачем их стоит прочитать еще раз


### ... with respect to Linguistic Modality

Vishal Shukla

**Gap Analysis of Natural Language Processing Systems with respect to Linguistic Modality**

- https://arxiv.org/abs/1504.04716
- https://arxiv.org/pdf/1504.04716.pdf

Плохой английский. Скудный литературный стиль. Но список разных имен и направлений затрагивает. Неплохая обзорная статья для начала. Жаль, что отсутствуют какие-либо детали.


### Simulating Logical Calculi with Tensors

Edward Grefenstette

**Towards a Formal Distributional Semantics: Simulating Logical Calculi with Tensors**

- https://arxiv.org/abs/1304.5823
- https://arxiv.org/pdf/1304.5823.pdf

> tensors and matrices, can be used to simulate different aspects of predicate logic

Показан изоморфизм между тензорами и логикой первого порядка. Как это связано с изучением слов? Чтобы найти важные/значимые слова в тексте все слова в тексте собирают в длинные вектора и затем заполняют матрицу связей между ними. Слова - это вектора в многомерном пространстве. Эту интерпретацию никак не нарисовать, не описать. А вот с логическими высказываниями куда проще. Их может понять человек или хотя бы машина. Поэтому тензоры можно перевести в высказывания логики, советует автор.


### Semantic Relations and Compositions

Peter D. Turney

**Domain and Function: A Dual-Space Model of Semantic Relations and Compositions**

- https://arxiv.org/abs/1309.4035
- https://arxiv.org/pdf/1309.4035.pdf

TODO


### Neural Self Talk

Yezhou Yang, Yi Li, Cornelia Fermuller, Yiannis Aloimonos

**Neural Self Talk: Image Understanding via Continuous Questioning and Answering**

- https://paperswithcode.com/paper/neural-self-talk-image-understanding-via
- https://arxiv.org/abs/1512.03460
- https://arxiv.org/pdf/1512.03460v1.pdf

Рекурентная нейронная сеть учится строить вопросы, модель длительной кратковременной памяти учится отвечать. Процесс обучения построен на картинках с привязанными к ним готовыми вопросами и ответами. Картинки распознаются через конволюционную нейронную сеть. Проверка успешности модели делалась субъективно через опрос.


### Recursive Deep Models

Richard Socher, Alex Perelygin, Jean Y. Wu, Jason Chuang,Christopher D. Manning, Andrew Y. Ng and Christopher Potts

**Recursive Deep Models for Semantic Compositionality Over a Sentiment Treebank**

- https://nlp.stanford.edu/~socherr/EMNLP2013_RNTN.pdf

Приведен алгоритм, который пытается оценивать язвительность отзывов кинокритиков. 
Предложение разбивается на векторы, которые распологаются в виде бинарного дерева. Дерево задает иерархию вычисления специальной функции над частями предложения. Судя по иллюстрациям это помогает учесть влияние отрицания, а также замечать, как меняется оценка сложного предложения, состоящего из противоречащих простых частей. 
Однако обучение проходит в адаптации двух матриц/тензоров, которые ответственны за операции между двумя вершинами одного уровня на всех участках заданного дерева. Эти матрицы не привязаны к конкретным словам и следовательно их "память" размывается со временем. Хотя статья показывает, что лучше с этим размытие, чем без него. 
В статье критикуется метод, где к каждой вершине приписывается своя матрица. Оно и понятно - такой метод непонятно как обучать, т.к. структура дерева постоянно меняется.


### Continuous Phrase Representations and Syntactic Parsing

Richard Socher, Christopher D. Manning, Andrew Y. Ng

**Learning Continuous Phrase Representations and Syntactic Parsing with Recursive Neural Networks**

- https://ai.stanford.edu/~ang/papers/nipsdlufl10-LearningContinuousPhraseRepresentations.pdf

TODO


### Logical reasoning

Samuel R. Bowman

**Can recursive neural tensor networks learn logical reasoning?**

- ?

TODO


### Accurate Unlexicalized Parsing

Dan Klein, Christopher D. Manning

**Accurate Unlexicalized Parsing**

- https://nlp.stanford.edu/~manning/papers/unlexicalized-parsing.pdf

TODO


### The cognitive dialogue

Yiannis Aloimonos and Cornelia Fermüller

**The cognitive dialogue: A new modelfor vision implementing common sense reasoning**

- https://www.semanticscholar.org/paper/The-Cognitive-Dialogue%3A-A-new-model-for-vision-Aloimonos-Ferm%C3%BCller/6498e75942b8aaa3357b729d23f48d6dc6d0b9e0
- http://users.umiacs.umd.edu/~fer/postscript/cognitve.pdf

TODO


### Backpropagation through structure

Christoph Goller, Andreas Küchler

**Learning task-dependent distributed representations by backpropagation through structure**

- http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.49.1968&rep=rep1&type=pdf
- http://research.cs.rutgers.edu/~lihong/ftp/papers/deep/Learning%20Task-dependent%20Distributed%20Representations%20by%20Backpropagation%20through%20Structure.pdf

TODO


### Embodied Language Processing

Katerina Pastra, Eirini Balta

**Embodied Language Processing: A New Generation of Language Technology**

- https://www.semanticscholar.org/paper/Embodied-Language-Processing%3A-A-New-Generation-of-Pastra-Balta/6e45fd8e0f42fb8a48a479d3eabcba0e5d0708da
- http://www.aaai.org/ocs/index.php/WS/AAAIW11/paper/download/4003/4293

TODO


## Вопросы на StackOverflow

на которые я смогу ответить?

https://datascience.stackexchange.com/questions/56476/what-is-the-best-question-generation-state-of-art-with-nlp


## Далее

[Инструменты для обработки естественного языка](/ru/neural-networks/nlp-toolkits)