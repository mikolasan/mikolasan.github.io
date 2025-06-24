---
title: Titanic
date: 2025-03-25
published: 2025-03-25
lastModified: 2025-03-25
subtitle: Kaggle challenge
---
I always return back to [this challenge](https://www.kaggle.com/c/titanic/overview).

First I want to look at the correlation between columns

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt


def make_plot(df, corr):
	fig = plt.figure()
	ax = fig.add_subplot(111)
	cax = ax.matshow(corr,cmap='coolwarm', vmin=-1, vmax=1)
	fig.colorbar(cax)
	ticks = np.arange(0,len(df.columns),1)
	ax.set_xticks(ticks)
	plt.xticks(rotation=90)
	ax.set_yticks(ticks)
	ax.set_xticklabels(df.columns)
	ax.set_yticklabels(df.columns)
	plt.show()


df = pd.read_csv('train.csv', index_col=0)
df["Sex"] = df["Sex"].map({"male": 0, "female": 1})
df["Embarked"] = df["Embarked"].map({"S": 0, "C": 1, "Q": 2})
df["Cabin"] = df["Cabin"].str.extract(r'([A-Z])')

levels = {level: idx for idx, level in enumerate(sorted(df["Cabin"].dropna().unique()))}
df["Cabin"] = df["Cabin"].map(levels)

df = df.select_dtypes(include=[np.number])
print(df.dtypes.to_frame(name="Type"))

# tah-dah!
corr = df.corr()

make_plot(df, corr)

df.to_csv("titanic_data.csv", index=False)
```

Related: [Is it always valid to use correlation for feature selection?](https://stats.stackexchange.com/questions/664709/is-it-always-valid-to-use-correlation-for-feature-selection) (answer: no)