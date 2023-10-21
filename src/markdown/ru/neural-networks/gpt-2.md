---
date: "2020-08-16"
title: Натренированный генерирующий трансформер (вторая итерация)
language: "ru"
draft: true
published: 2021-10-13
lastModified: 2022-07-31
---

## Вводная

Трансформер https://en.wikipedia.org/wiki/Transformer_(machine_learning_model)

История GPT https://en.wikipedia.org/wiki/OpenAI#Generative_models

Модель страдает от изрядного потребления памяти. На обычных игровых видеокартах тренировать/предсказывать просто не получится. Это связано с той частью обучения, которая определяет, если параметры на текущем шаге улучшены или нет.

>  much later, it occurred to us that the Adam SGD optimizer was part of the memory problem

Открою небольшой секрет. Никакой магии и интеллекта за GPT-2 не скрывается. Эта модель не делает ничего больше, чем выбирает наиболее вероятное следующее слово по вероятности. У модели есть окно - это определенное число слов до и после текущего слова и предсказание модели зависит от всех слов из этого окна. Окно позволяет модели придерживаться контекста (НО: если модель обучена на достаточно большом объеме связного текста).

В моем понимании к этой модели нельзя приписать понимание текста. Может ли эта модель пересказывать кратко суть большого текста? Пересказывать с юридического стиля человеческим языком? Это генератор вполне связного текста. С генерацией есть одна проблема - нельзя поставить специфичную задачу этому генератору написать текст по заданному плану (собственно обратная задача к извлечению смысла в пересказывании). А вот генерировать стихи - вполне под силу этой модели. https://www.gwern.net/GPT-2#

Так как модель всего лишь предсказывает следующее слово (хорошо используя большой предыдущий контекст если имеется - если предыдущего контекста недостаточно, то иногда модель уводит в странные предсказания).

Как можно заметить из примеров, которые генерирует данный алгоритм, он натренирован в основном на новостях, потому что структура новостей четко прослеживается: небольшие абзацы по 3-4 предложения, включение прямой речи. Делаем вывод, что вероятности хорошо впитывают структуру предложения. Насчет связности текста сказать сложно, т.к. у сгенерированного материала нет начала и конца, но внутри предложения все элементы хорошо согласуются.


## Команды для запуска

```
docker build --no-cache -t gpt-2 -f Dockerfile .
docker run -it --rm --name gpt-playground --publish 8888:8888 --mount type=bind,source=D:\\ml\\gpt-2,target=/gpt-2 gpt-2
```

```
python src/generate_unconditional_samples.py --model_name=1558M --nsamples=10 --batch-size=1 --length=200 --top_k=40
python src/interactive_conditional_samples.py --model_name=1558M --nsamples=10 --batch-size=1 --length=200 --top_k=40
```

Или серьезный подход

Спец драйвер https://developer.nvidia.com/cuda/wsl

Спец образ для докера https://ngc.nvidia.com/catalog/containers/nvidia:tensorflow

Спец способ запуска

```
docker pull nvcr.io/nvidia/tensorflow:20.07-tf1-py3
docker run --gpus all -it --rm --mount type=bind,source=D:\\ml\\gpt-2,target=/gpt-2 nvcr.io/nvidia/tensorflow:20.07-tf1-py3
```


## Тесты

### Тест 1

Попробуем сгенерировать текст на заданную тематику как предлагается в [тикете](https://github.com/openai/gpt-2/issues/239)

```
Sam. Went. India. Wedding. Sam
```

#### SAMPLE 1

iz married Sam . She did not get her husband. A man who is married, who has a son, and in whose house it is the custom to have the women wait for them, will have no doubt that it may be the custom with the king's son's daughter to wait for him. For in such a man's house it is not the custom for the wives to marry the others, or to sleep among his own. But of his own, the woman who has not had her husband will not be allowed to come in till she has had a child. 1 See "Arundhati Roy's The Making of Indian Women" (Calcutta, 1857), pp. 28, 60. 2 Compare this passage in "Arundhati Roy's The Making of Indian Women." The "housewife" is the equivalent here of the "bachelor," in India as the term is now generally used. The reference is to the custom of waiting, when all the

#### SAMPLE 2

ia. G. V. He. D. Sam oa. D. V. He. D. Sam o. D. V. He. D. Went. G. V. He. Went. D. V. Went. D. V. O. W. D. V. O. W. D. V. D. V. Wei. D. D. O. W. T. W. W. Wei. D. O. W. O. D. D. D. D. Wei. Wei. D. D. O. D. He. O. W. O. D. D. D. O. D. O. D. He. O. D. O. D. D. D. O. D. O. W. D. D. D. O. D. O. D. O. W. D. D. D. D. D. D. D. D

#### SAMPLE 3

`~~~*>»'||~*^'^|>| '*'^> '^'*` Sam. Went. India. Wedding. Sam I* Went. India. Wedding. Sam. Went. India. Wedding. Sam. Went. India. Wedding. Sam. `*'^'^>'|>|>|>|>|>|>|>|>|>|>|>|>|>|>|>|` Sam. Went. India. Wedding. Sam IW Went. India. Wedding. Sam. Went. India. Wedding. Sam. Went. India. Wedding. Sam. Went. India. Wedding. Sam. Went. India. Wedding. Sam. Went. India. Wedding. Sam. Went. India. Wedding. Sam. Went. India. Wedding. Sam. Went. India. Wedding. Sam. Went. India. Wedding. Sam. Went. India. Wedding. Sam. Went. India

#### SAMPLE 4

ills. Sam in. Sams-up for. SAM. DAME. The term lady. SAMAREL. A name given to a member in the Society of Friends, deriving from the following passage : — " A man who walks at this time of night by the side of a good samar EL," or lady of God, is liable to be thrown into a convulsive fit of weeping, which he may be said to throw himself into." See Holinshed, Chron. England ; Brit. Bibl. iv. 16. SAMBRIDGE. Merebridge. SAME. To be equal; also, to be so situated. See the Exmoor Dial. iv. 12. I samed this hote of men, To make hem that were in the vale of the heene one ; The vayles and lales a fote of men did come, The vayne and the lale, as myght be so. Gower

#### SAMPLE 5

ia. Indian. Indian. Went. India. Grown. I n. Indian. Indian. Went. I n. Grown. I n. Went. Indian. Indian. Went. Indian. n. Indian. Went. Grown. Went. Grown. Went. iva. Grown. n. Went. n. Went. n. n. Grown. Grew. Went. g. n. n. Went. iva Grew. I n. . . . . I n. . . . . I n. . . . . I n. . . . . I n. . . . . I n. . . . . I n. . .. . I n. . . . . I n. . . . . I n. . . . I n. n. ________

THE PAST AND FUTURE OF ANCIENT SCIENCE

LITERATURE:

"The History Of

#### SAMPLE 6

ix. Samuels, Samuel. Samuel, Sam. Sonnet. Samuel, Sam. Sonnet. Samuilius, Samual. Sonnet. Samson, Samuel, of Ponteferro, Italy Samuels, Samuel. Sonnet. Sara, Sara. Sara, Sara. Sara, Susan. Sara. Sarah. Sarah. Sarah, Sarah. Sarah. Sarah, Sarah. Sarah. Samuel, Samuel. Sabine, Samuel. Sabine, Samuel. Sabine, Samuel. Sabine, Samuel. Sabine, Samuel. Sabine. Samuel. Sarah. Samuel. Sarah. Sabine, Samuel. Sabine. Samuel. Samuel, Samuel. Sabine. Sabine. Samuel. Sabine. Samuel. Sabine. Samuel. Sabine. Samuel. Sabine. Samuel. Samuels, Samuel. Samuels, Samuel. Samuel, Samuel. Samuel, Samuel. Samuel. Samuel. Sarah, Sarah. Samuel, Samuel. Samuel,

#### SAMPLE 7

ia. India. Wedding. Sam ia tatam. India. WED. Bride. SAM. Shee. SAM. Shee. SAM. Shee. SAM. He. SAM. Shee. SAM. Bride. SAM. Wedding. SANK. So. SANK. So. SANK. So. SANK. So. SANK. So. SANK. So. SANK. So. SANK. So. SANK. So. SANK. So. SANK. So. SANK. So. SANK. So. SANK. So. SANK. So. SANK. So. SANK. So. SANK. so. SANK. SO. SANK. so. SANK. So. SANK. so. SANK. So. SANK. So. SANK. So. SANK. So. SANK. So. SANK. So. SANK. So. SANK.

#### SAMPLE 8

ix. (2) A kind of fish, so called from a name given to it in the New World. Mr. John Gayer, in his 'Dictionary of North America,' speaking of an Indian name, says, 'it is common to write in the Indians of the American continent, " Sam, I see thee," and to some writers, "Sallam," for "Samar."* For more than 300 years a race of savages, the Salsus, inhabiting the banks of the R. K.'s of the river St. Lawrence, in Canada, has been called "Sam." They came there from the east to inhabit the woods, as they had formerly wandered from the east to thewest, until their former habitat was nearly exhausted ; or if so inclined, they went into the forest, and began to live in villages, which gave them a reputation for hospitality, and for mutual sympathy and friendship. * E. G."s Dictionary. Vol,


### Тест 2

Видно, что очень часто стиль входного предложения влияет на сгенерированный текст и мы заходим в темные закоулки обучающей выборки, которая явно не очищена от артефактов интернет страниц.

Трансформер пытается продолжить текст, поэтому предлагаю задать тематику с помощью предложения вводящего контекст и далее задать вопрос, который заставит алгоритм дать нам ответ.

```
I have heard about wedding in India. Is Sam going to go?
```

#### SAMPLE 1

The girl in the photo is from the same country. This marriage will be held in Mumbai."

Krishnaji's father is also a business figure. He is a director in the company Kishore Foods. His daughter said, "I was married from a distant city, it's very exciting that the couple is going here." She had told her husband that she would have to marry at least for two years.

She said that after some time, "maybe in four to five years, when it has time to recover", she would consider marrying a groom from the other side of the world.

Krishnaji was speaking a few minutes before her parents arrived. He is also an advocate and has taken up the issue of divorce in the Supreme Court. He has also been the president of the Bombay Dabangoli Association, helping poor women. In his spare time, he organizes charity work for the needy.

The couple had already announced their wedding

#### SAMPLE 2

Why? Because of me." And that became a question: "Who is Sam? Who's this girl?" I had just moved from England. I had no idea. So I just did a bunch of improv with [my friend] Kaitlyn, and I was like, "We have to know who this girl is." She's from New York, and I'm from the UK — it's kind of a weird dynamic coming together. She and I were always texting, like, "Let's go to this wedding, we're going to have this thing."

I was so excited for it. I was like, "I have to be there — this has to fucking be amazing."

At first, Sam and I weren't very successful. So I was really stressed. It was not a big surprise to me that it wasn't great. But I was in a great place mentally. I was in a position where I'm really going to show up, and I want

#### SAMPLE 3

Sam, come here for love. You are going to marry. This is a big wedding."

Sam nodded.

Lola said to Sam, "I want you to tell me everything about Sam and me. What kind of man is he? What does a happy man look like? What about us? We want your picture, please."

Sam said, "I will write a letter to you."

Lola said, "Write your letter and bring it to me."

Sam said.

Lola said again, "I will write a letter to you. What time should be the meeting? I am counting the hours of my life. Will you be at the meeting time?"

Sam said, "I will be there on time."

Lola said, "If you don't go, I will marry you yourself. This is your first step. My husband wants to marry you."

Sam said, "Please tell me

#### SAMPLE 4

Why is he in such a hurry? Is it just because the groom's name is Raghubir?" said the witness.

Khalaf Ansari of Mumbai confirmed the presence of police personnel and vehicles along with the guests. He says the whole event is a "great success" and that he is happy with the turnout.

"These things don't happen very often in Mumbai. All the guests were very well behaved, very respectful. The guest list was full of the famous names in Dubai. Many people came to congratulate the groom who is a very active businessman," he said.

A bride is presented to her husband by a police officer during the wedding ceremony. (Photo courtesy: ANI)

(With PTI inputs)

Correction: An earlier version incorrectly stated the location of the wedding ceremony. The wedding was held at the Marlboro Club. This story has been updated accordingly.<|endoftext|>Picking a place to be in a new city often

#### SAMPLE 5

"Yes, he is. Sam is working at the moment in Dubai as an accountant."

So did he get married in the UK?

"No, yes," he said, "and he's got a job in Dubai now."

Is he going to stay back after that?

"I'll be happy doing my work. I don't know how long. I'll be happy with the job which pays me."

Image caption The two exchanged rings and danced the dance of love in front of guests at Sam and Sam's wedding reception

Sam is a single dad to three-month-old Lily, a son he named after the pop star Rihanna.

How long will Sam stay here?

"I hope to be staying for a while but I don't know what is going to happen. I will see what happens.

"I work and I live in Dubai. When I get my passport, I'll go

#### SAMPLE 6

Sam wants me not go" she said. I told them I would come if she would call Sam. So in the evening, after making our usual plans, I began to think about the matter. I took an evening nap at my hotel room and returned to my office. At 3 o'clock the next morning I sat down by my desk and began to compose what I had to write. The call came at about 4 o'clock. "Marilyn, we are going to do things that are not right. We are going to give gifts in the house and pay for things. We are going to buy things we are not going to give back. I want you to be my witness." "Well, I was going to get the maid service for $30,000; I'm going to go down and get our furniture
," said Sam. She was giving away all the furniture and all the furniture was gone. "Well, you have got to go for $40,000 for

#### SAMPLE 7

Please help!

I would not ask for money if I were you, but if you are in a pinch, would you please pass it on to the organization that helps people who are blind get married?"

"Would you please make some posters of the wedding. I am making posters today for the wedding for my son who will be getting married soon. It seems that he really wants one. Can you pass him one for your wedding as well? Thank you in advance! (If you are going to the wedding, please just post one of the photos of the marriage on this page.)"

"I have been following this site for a long time, and I cannot say enough good things about you all. Thank you for your kind words and I know if you had a choice you would be a part of it!"

"I am an experienced blind person, and I have been waiting ages for this kind of information. I was just wondering if the blind community does not

#### SAMPLE 8

What's a wedding like here? How should my parents be dressed? And what's the significance of a wedding and the people attending one? What's the best way to get in touch with them, and how do weddings end? I'm not too sure. Is this a regular event in India, or is it a special event that's only happening two weeks later? What kind of dress should I wear? Who should perform and who should I invite?

The next day, the bride and groom walk through the city, stopping at each house and asking for a small ceremony—not many people would agree to a wedding at the end of a day of grocery shopping, but they are more than happy to oblige the couple's every request, as well as show them around the neighborhood, including the best places in the neighborhood to buy a good cup of tea or the best place to have a quick, family-style meal, while Sam spends her time enjoying every kind of food and drink.

#### SAMPLE 9

," said a tweet from the Facebook group:

The Samajwadi Party-led Uttar Pradesh government is planning to issue directions to the district magistrate that couples marrying in a "sanctuary" in the state should be allowed to have a religious ceremony, the Hindustan Times quoted senior BJP leader Hukum Singh as saying.

"A notice has been issued to the magistrate to hold the marriages outside the marriage hall in the presence of a priest of the local temple or another authorised person," the paper quoted him as saying.

"It means, the marriage is valid only if the bride-to-be can prove that she has not been divorced already," he said.

"We will not allow a 'sanctuary' marriage where there is no priest present to witness the marriage," Singh added.

Read more here

4 people, including women, beaten up for "asking for wrong"

Four people have been arrested for thrashing and even

#### SAMPLE 10

"I don't plan on it. Sam has gone to America. And if you are considering this place, I will not permit him tostay.''

"And I will not force him."

"Then come back or don't come."

"Thank you, ma'am.''

He drove out of sight of the motel.

We drove back east, and the motel was gone. A large sign was posted and a new one was going up in the window of their apartment.

"This is a lovely home," a large blue house said.

The new sign read 'Prayers For You,' the same sign had been posted at the hotel the day before.

They asked me if I was praying for them, and I said yes and they said, ''We believe you too. This is what has happened to us.''

They said there had been a shooting down the road that morning, when they were


## Тонкости

Кодирование. Создание словаря.


https://github.com/huggingface/transformers/issues/3867 
- -> https://github.com/pytorch/fairseq/issues/1716 (Объяснение одной картинкой)
- -> https://github.com/openai/gpt-2/issues/80

Регулярные выражения используются не из стандартного питона, а из модуля `regex` (https://pypi.org/project/regex/)

Доки по тензорной текучке в помощь https://www.tensorflow.org/versions/r1.15/api_docs (версия 1, да-да, на 2-ой оно даже не заведется https://github.com/openai/gpt-2/issues/231)

Генерирует максимум 1024 слов. В чем заключается это ограничение? https://github.com/openai/gpt-2/issues/260

In GPT-2 context size is increased from 512 to 1024 tokens ([paper](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf), page 4).



- Хакнуть предсказание https://github.com/minimaxir/gpt-2-keyword-generation



## Запускаем GPT-2 на видеокарте

На винде стоит питон 3.8 и я поставил Куда 10.2, потому что видел, что Керас поддерживает. Но Тензорная Текучка дошла только до версии 10.1. Я попробовал собрать из исходников

```
https://developer.nvidia.com/rdp/cudnn-download
cuDNN v8.0.2 (July 24th, 2020), for CUDA 10.2
GPU 	Compute Capability
GeForce GTX 1060 	6.1
Version	Python version	Compiler	Build tools	cuDNN	CUDA
tensorflow_gpu-2.3.0	3.5-3.8	MSVC 2019	Bazel 3.1.0	7.4	10.1

bazel build --config=opt --config=cuda --config=v2 --copt=-nvcc_options=disable-warnings --define=no_tensorflow_py_deps=true  --local_ram_resources=9216 //tensorflow/tools/pip_package:build_pip_package

--config=noaws --config=nogcp --config=nohdfs
```

Пробовал на ярлычке 2.3.0 и не главной ветке - что-то не так с установленными библиотеками на моей ЭВМ. 

```
C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v10.1\bin>"C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Tools\MSVC\14.27.29110\bin\Hostx64\x64\link.exe" /dump /exports cudart64_101.dll
```

## Прокачиваем до TensorFlow 2

https://pgaleone.eu/tensorflow/gan/2018/11/04/tensorflow-2-models-migration-and-new-design/

Run on TensorFlow 2.3 (pip install tensorflow-gpu)
https://github.com/openai/gpt-2/issues/231 - заменить HParams
https://github.com/tensorflow/community/issues/148

https://huggingface.co/transformers/v2.0.0/model_doc/gpt2.html

```
Traceback (most recent call last):
  File "train.py", line 299, in <module>
    main()
  File "train.py", line 95, in main
    output = model(hparams=hparams, X=context_in)
  File "D:\ml\gpt-2\shepperd\model.py", line 164, in model
    h, present = block(h, 'h%d' % layer, past=past, hparams=hparams)
  File "D:\ml\gpt-2\shepperd\model.py", line 125, in block
    nx = x.shape[-1].value
AttributeError: 'int' object has no attribute 'value'
```

``

```
pip install tensorflow-gpu
tf_upgrade_v2 --intree src --outtree src2 --reportfile report.txt
python src/interactive_conditional_samples.py --model_name=1558M --nsamples=1 --batch-size=1 --length=200 --top_k=40
```

Out of memory on NVIDIA with 6Gb 
https://github.com/openai/gpt-2/issues/213

Поэтому ограничимся пока маленькой моделью
```
python src/interactive_conditional_samples.py --model_name=345M --nsamples=10 --batch-size=1 --length=200 --top_k=40
```

- использовать tf.Variable, чтобы удалить tf.Session, tf.while_loop, tf.get_variable (не так просто найти руководство по TensorFlow 2, где не используется Keras https://becominghuman.ai/image-classification-with-tensorflow-2-0-without-keras-e6534adddab2)
- использовать tf.train.Checkpoint вместо tf.train.Saver

https://www.tensorflow.org/guide/checkpoint#loading_mechanics
https://www.tensorflow.org/api_docs/python/tf/train/Checkpoint
https://www.tensorflow.org/api_docs/python/tf/compat/v1/train/Saver
https://www.tensorflow.org/guide/variable?hl=en#lifecycles_naming_and_watching


## Обучаем новому

А теперь обучим нашу собственную 

https://medium.com/@ngwaifoong92/beginners-guide-to-retrain-gpt-2-117m-to-generate-custom-text-content-8bb5363d8b7f

Используя существующий словарь и не влезая в BPE кодировку.

```
D:\ml\gpt-2>python encode.py --model_name 1558M data\stories.txt data\stories.npz
```

Чё за формат?
Как изменить словарь?


```
D:\ml\gpt-2>python train.py --dataset data\stories.npz --sample_every 50 --sample_num 3 --model_name 345M
```

Не влазиет на видео карту. Переключаюсь на CPU:

```
set CUDA_VISIBLE_DEVICES=-1
```

python gpt2\generate_unconditional_samples.py --model_name=sstories --nsamples=10 --batch-size=1 --length=200 --top_k=40


I found more info in an old and already closed issue - https://github.com/openai/gpt-2/issues/19. I believe this link here will be helpful for newcomers (like myself). Ideally this repository needs a wiki.


Another training implementation, based on
https://github.com/nshepperd/gpt-2/tree/finetuning is here: https://github.com/lopuhin/transformer-lm - main difference is that is uses sentencepiece tokenizer, so it's possible to train it on your own language, not only on English.

So I noticed that nshepperd's fork doesn't preserve the optimizer state in the checkpoints it generates. Be aware that it affects Adam optimizer because it assigns individual learning rates for the model parameters. If you restart training from a checkpoint that information is lost and your learning rate will be set back to the provided value (1e-4 by default). This results in (slight) loss increase after the checkpoint is loaded and I think it might break the learning process at the late stages (the model stops converging or starts diverging).

To store everything you need to remove this line (or replace it with var_list=None) or, if you use an existing checkpoint and want to update it with optimizer vars, you might want to create a new saver object with var_list=None at around this line after restoring. Then the full checkpoint will be saved later. Note that it's much bigger, about 1.9 Gb instead of 400-500 Mb.


## Далее

- https://huggingface.co/gpt2 - открытая реализация теми, кто только и занимается, что обработкой естественного языка
- их гитхаб https://github.com/huggingface/transformers#Quick-tour-TF-20-training-and-PyTorch-interoperability
- статья о том как они запилили GPT-2 у себя и как с ним работать https://medium.com/huggingface/how-to-build-a-state-of-the-art-conversational-ai-with-transfer-learning-2d818ac26313
- о трансформерах в целом https://jalammar.github.io/illustrated-transformer/ (не забудьте заглянуть на огонек в еще один научный бложек за заметкой о кросс энтропии https://colah.github.io/posts/2015-09-Visual-Information/ и https://www.countbayesie.com/blog/2017/5/9/kullback-leibler-divergence-explained)
- о Роберте https://arxiv.org/pdf/1907.11692.pdf
- отображать зависимость между текущим словом и следующим (визуализация "внимания") https://github.com/tensorflow/tensor2tensor/blob/master/tensor2tensor/visualization/attention.js