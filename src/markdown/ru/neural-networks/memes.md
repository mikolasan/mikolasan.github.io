---
date: "2020-08-11"
title: Мемы
language: "ru"
draft: true
published: 2021-10-13
lastModified: 2022-07-31
---

[Соревнование](https://twitter.com/stakanmartini/status/1283281648360886272) по классификации мемов, которое на первый взгляд кажется полностью подходит под [обработку естественного языка](/ru/neural-networks/nlp-introduction). Как мне кажется мемы обретают свой смысл только благодаря тексту. Текст подчеркивает происходящее на картинке, пересказывает ее или меняет смысл на противоположный. Именно в тексте заложены гиперболы или аллегории, легко раскрывающиеся благодаря картинке, но в принципе возможные для понимания и без нее. Поэтому первоочередной задачей я ставлю понимание текста.


## Критерий

A direct or indirect attack on people based on characteristics, including ethnicity, race, nationality, immigration status, religion, caste, sex, gender identity, sexual orientation, and disability or disease. We define attack as violent or dehumanizing (comparing people to non-human things, e.g. animals) speech, statements of inferiority, and calls for exclusion or segregation. Mocking hate crime is also considered hate speech.


## План

На картинках есть важная информация, которую нужно извлечь. Эта информация не заключена в пикселях, она заключена в контексте, который нужно понимать (извлекать, майнить). Если бы важная информация заключалась в самих картинках, то достаточно было бы предоставленого датасета. Но в поставленной задаче **картинки никак между собой не связаны**, они только лишь несут дополнительную информацию (контекст) к написанному тексту.

Значит ли это что нам нужно расширить датасет? На какие категории нужно нацелить предварительное обучение? Например, по картинки, если на ней изображен человек, определять пол, расу, возраст - вещи по которым можно провести дискриминацию. Сколько процентов из всего датасета будет покрыто при одном только [распозновании лиц](/ru/neural-networks/face-recognition)?


## Текст

Первая идея заключается в том, чтобы использовать классификацию из обучения и выделить из предложений слова, которые можно назвать маркером ненависти. Если эти слова будут встречаться на тестах, то такие предложения будут соответственно классицироваться. Если слова не повторяются, то такая модель не работает.

Можно ли находить закономерности и применять их по подобию к другим словам?

- Если в предложение входит слово "black", "muslim", "jew" - каков процент, что этот мем будет про расизм? Сколько предложений из выборки так можно покрыть? Решающие деревья?
- Как остальные расистские высказывания свести к первой группе?

## Закономерности

- direct or indirect attack on ethnicity
- direct or indirect attack on race
- direct or indirect attack on nationality
- direct or indirect attack on immigration status
- direct or indirect attack on religion
- direct or indirect attack on caste
- direct or indirect attack on sex
- direct or indirect attack on gender identity
- direct or indirect attack on sexual orientation
- direct or indirect attack on disability
- direct or indirect attack on disease

## Далее

- Определение сарказма? https://towardsdatascience.com/sarcasm-detection-using-word-embeddings-in-android-999a791d676a