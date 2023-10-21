---
path: "/ru/neural-networks/modifying-stanford-parser"
date: "2020-08-02"
title: Модифицируя Стэнфордовский разбор
language: "ru"
draft: true
published: 2021-10-13
lastModified: 2022-07-31
---

Давайте повторим результат из статьи **Recursive Deep Models for Semantic Compositionality Over a Sentiment Treebank** под авторством Richard Socher, Alex Perelygin, Jean Y. Wu, Jason Chuang,Christopher D. Manning, Andrew Y. Ng and Christopher Potts. Они в свою очередь ссылаются на парсер описанный в **Accurate Unlexicalized Parsing** Клейном и Маннингом (Dan Klein, Christopher D. Manning).

[Ссылка в их статье](https://nlp.stanford.edu/software/lex-parser.shtml) устарела. 

Я стал искать какие-либо упоминания парсера описанного Клейном и Маннингом.

Google Search: klein manning parser

[Краткое описание](http://ed.loper.org/notes/papers/Klein_&_Manning_2003a.html) особенностей искомого парсера.

В [статье](https://homes.cs.washington.edu/~nasmith/papers/kong+rush+smith.naacl15.pdf) **Transforming Dependencies into Phrase Structures** (Lingpeng Kong, Alexander M. Rush, Noah A. Smith)

упоминались разные источники:

- https://github.com/ikekonglp/PAD
- https://github.com/syllog1sm/redshift

Redshift привел меня к spaCy. А [оттуда](https://spacy.io/usage/spacy-101) я вышел на [CoreNLP](https://stanfordnlp.github.io/CoreNLP/).

Значит [вот](https://nlp.stanford.edu/software/lex-parser.html) актуальная ссылка (на 2020 год). 

Скачиваем https://nlp.stanford.edu/software/stanford-parser-4.0.0.zip (исходники https://github.com/stanfordnlp/CoreNLP/tree/master/src/edu/stanford/nlp/parser/lexparser, вопросы/ответы https://nlp.stanford.edu/software/parser-faq.html)

В текущее непростое время когда Оракл отвернулась от обычных разработчиков вот список поставищиков годной джава [1](https://stackoverflow.com/a/54737381/1104612) [2](https://stackoverflow.com/a/52431765/1104612). 
Есть информация о том, какую сборку нужно выбирать в каком случае. Самый простой и достойный вариант, который не сразу можно нагуглить (например по запросу "java jdk download") - это https://adoptopenjdk.net/


И визуальные программы для него:

http://grammarscope.sourceforge.net/

https://sourceforge.net/projects/grammarscope/

- Если скачать репозиторий в Линукс и попробовать скрипт для линукса, то ругается на отсутствие класса Твик. (там несколько подпроектов имеют одинаковое имя)
- Если скачать репозиторий в Виндоус с изменением переноса строки, то скрипты в МинГВ перестанут работать. (это для любого репозитория верно)
- Если скачать репозиторий в Линукс и открыть проект в Интелиджи, то обнаружатся неудовлетворенные зависимости, которых не сыскать в Мавен репозитории.
- Если скачать установщик в формате джар, то на шаге установки в Линукс вылезет непойманное исключение связанное с ссылками.
- Установщик в формате джар - единственное что легко рабтает в Виндоус.

**Заметка**. Если у вас уже установлен Android Studio, то у вас есть 3 вещи, которые не нужно устанавливать отдельно

- java - `C:\Program Files\Android\Android Studio\jre\bin`
- gradle - `C:\Users\<user name>\.gradle\wrapper\dists\gradle-6.3-bin\8tpu6egwsccjzp10c1jckl0rx\gradle-6.3\bin`
- adb - `C:\Users\<user name>\AppData\Local\Android\Sdk\platform-tools`

```
C:\Program Files\Android\Android Studio\jre\bin>C:\Users\neupo\develop\ai\memes\grammarscope\bin\grammarscope.bat -corenlp
```

### RNTN в действии

Круто, парсер создает дерево, но нам нужно оценивать листья и давать оценку предложению. Как в статье. Это находится в другом джаре

https://stanfordnlp.github.io/CoreNLP/download.html

```
cd C:\Users\neupo\develop\ai\memes\stanford-corenlp-4.0.0
"C:\Program Files\Android\Android Studio\jre\bin\java.exe" -cp "*" -mx5g edu.stanford.nlp.sentiment.SentimentPipeline -file ..\test_text.txt
```

### В питон!

Скомпилированный парсер засунуть в Джипайп у меня не получилось, поэтому я собрал всю CoreNLP сам с помощью [Мавен](https://maven.apache.org/download.cgi) (один тест провалился у меня, поэтому я выключил тесты, чтобы собрать джар файл)

```
git clone https://github.com/stanfordnlp/CoreNLP.git
cd CoreNLP
mvn -Dmaven.test.skip=true package
```

Ожидаем получить файл `target/stanford-corenlp-4.0.0.jar`.

Далее скачиваем [Джипайп](https://github.com/jpype-project/jpype) и [устанавливаем](https://jpype.readthedocs.io/en/latest/install.html)

```
git clone https://github.com/jpype-project/jpype.git
cd jpype
python setup.py build
```

Я поставил **JPype1==1.0.2.dev0**. Я думаю, что есть еще вариант поставить Джипайп через "колесо" https://github.com/jpype-project/jpype/releases/tag/v1.0.1 , но я это пока не рассматривал.

Скачиваем [пример для парсера](http://projects.csail.mit.edu/spatial/Stanford_Parser): https://projects.csail.mit.edu/spatial/images/f/f8/Stanford-parser-python-r22186.tar.gz

Извлекаем из джара модельки:

```
cd ~/develop/ai/memes/stanford-parser-4.0.0
jar -tf stanford-corenlp-4.0.0-models-english.jar
jar -xf stanford-corenlp-4.0.0-models-english.jar edu/stanford/nlp/models/lexparser/englishPCFG.caseless.ser.gz
jar -xf stanford-corenlp-4.0.0-models-english.jar edu/stanford/nlp/models/sentiment/sentiment.binary.ser.gz
```

Если запускается из командной строки следующая конструкция
```
java \
  -ea \
  -Djava.class.path=C:\Users\neupo\develop\ai\memes\stanford-parser-4.0.0\stanford-parser.jar \
  edu.stanford.nlp.parser.lexparser.LexicalizedParser \
  C:\Users\neupo\develop\ai\memes\stanford-parser-4.0.0\edu\stanford\nlp\models\lexparser\englishPCFG.caseless.ser.gz
```

значит и из Джипайпа должно работать.

Тонкости Джипайпа
- https://stackoverflow.com/questions/55717482/jpype-simple-jar-import-and-run-main Класс или пакет
- https://stackoverflow.com/questions/23521273/class-not-found-error-on-jpype Звездочка не работает
- https://stackoverflow.com/questions/23430466/jpype-class-not-found Внимательно с разрядностью твоих инструментов


### Деревья

В синтаксических деревьях используются аббривеатуры, которые описаны в 
https://catalog.ldc.upenn.edu/docs/LDC99T42/tagguid1.pdf

копипаста с https://www.sketchengine.eu/tagsets/penn-treebank-tagset/

```
POS Tag 	Description 	Example
CC 	coordinating conjunction 	and
CD 	cardinal number 	1, third
DT 	determiner 	the
EX 	existential there 	there is
FW 	foreign word 	les
IN 	preposition, subordinating conjunction 	in, of, like
IN/that 	that as subordinator 	that
JJ 	adjective 	green
JJR 	adjective, comparative 	greener
JJS 	adjective, superlative 	greenest
LS 	list marker 	1)
MD 	modal 	could, will
NN 	noun, singular or mass 	table
NNS 	noun plural 	tables
NP 	proper noun, singular 	John
NPS 	proper noun, plural 	Vikings
PDT 	predeterminer 	both the boys
POS 	possessive ending 	friend’s
PP 	personal pronoun 	I, he, it
PPZ 	possessive pronoun 	my, his
RB 	adverb 	however, usually, naturally, here, good
RBR 	adverb, comparative 	better
RBS 	adverb, superlative 	best
RP 	particle 	give up
SENT 	Sentence-break punctuation 	. ! ?
SYM 	Symbol 	/ [ = *
TO 	infinitive ‘to’ 	togo
UH 	interjection 	uhhuhhuhh
VB 	verb be, base form 	be
VBD 	verb be, past tense 	was, were
VBG 	verb be, gerund/present participle 	being
VBN 	verb be, past participle 	been
VBP 	verb be, sing. present, non-3d 	am, are
VBZ 	verb be, 3rd person sing. present 	is
VH 	verb have, base form 	have
VHD 	verb have, past tense 	had
VHG 	verb have, gerund/present participle 	having
VHN 	verb have, past participle 	had
VHP 	verb have, sing. present, non-3d 	have
VHZ 	verb have, 3rd person sing. present 	has
VV 	verb, base form 	take
VVD 	verb, past tense 	took
VVG 	verb, gerund/present participle 	taking
VVN 	verb, past participle 	taken
VVP 	verb, sing. present, non-3d 	take
VVZ 	verb, 3rd person sing. present 	takes
WDT 	wh-determiner 	which
WP 	wh-pronoun 	who, what
WP$ 	possessive wh-pronoun 	whose
WRB 	wh-abverb 	where, when
# 	# 	#
$ 	$ 	$
“ 	Quotation marks 	‘ “
`` 	Opening quotation marks 	‘ “
( 	Opening brackets 	( {
) 	Closing brackets 	) }
, 	Comma 	,
: 	Punctuation 	– ; : — …
```

Делать лисповые деревья родными для питона можно с помощью простого скрипта https://gist.github.com/roberthoenig/30f08b64b6ba6186a2cdee19502040b4


### Другие программы

DependenSee: A Dependency Parse Visualisation/Visualization Tool
https://chaoticity.com/dependensee-a-dependency-parse-visualisation-tool/

Tree Bank Viewer https://dingo.sbs.arizona.edu/~sandiway/treebankviewer/index.html#download

> This is freely-available software for displaying and browsing treebanks. It renders bracketed expressions as nicely-formatted trees. 

Semantic Role Miner https://github.com/chocolateHszd/SemanticRoleMiner

From a tree to ontology.



освоиться с доступными функциями https://github.com/vpekar/stanford-parser-in-jython
посмотреть на результат http://grammarscope.sourceforge.net/




## Пытаюсь собрать grammarscope

Зависимости устарели?

https://github.com/jrtom/jung
https://search.maven.org/search?q=g:net.sf.jung%20AND%20v:2.0.1 куда подевалась версия 2.0.2?