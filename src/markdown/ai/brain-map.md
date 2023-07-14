---
section: brain
title: Brain map
topic: true
description: ""
published: 2022-12-20
lastModified: 2023-07-10
---

[Phenotypic variation of transcriptomic cell types in mouse motor cortex](https://github.com/berenslab/mini-atlas/tree/master) ([paper](https://www.nature.com/articles/s41586-021-03950-0)). Scientist got neurons from different layers and regions and compared their DNA. That added to the classification by neuron's form because generation of enzymes and transmitters is coded in DNA, thus we probably can tell more about neuron's functions now.



- [Data](https://portal.brain-map.org/explore/connectivity/synaptic-physiology/interact) provided by Allen Institute
- [API](https://aisynphys.readthedocs.io/en/latest/introduction.html)
- [tools](https://neuron-morphology.readthedocs.io/en/latest/)


## Get data

- install SQLAlchemy, neuroanalysis `pip install SQLAlchemy neuroanalysis`
- download [API](https://aisynphys.readthedocs.io/en/latest/introduction.html) `git clone https://github.com/AllenInstitute/aisynphys.git`
- `cd aisynphys && `
- install `python setup.py install`
- start Python (I use 3.8.1) `python`
- import `from aisynphys.database import SynphysDatabase`
- get a list of versions (sort by [size](https://portal.brain-map.org/explore/connectivity/synaptic-physiology/interact))


```py
l = SynphysDatabase.list_versions()
l.sort(reverse=True, key=lambda x: x['db_size'])
for f in l:
  print(f['db_file'], f['db_size'])
```

Output:

```
synphys_r1.0_2019-08-29_small.sqlite small
synphys_r1.0_small.sqlite small
synphys_r2.0-pre1_small.sqlite small
synphys_r2.0-pre2_small.sqlite small
synphys_r2.0-pre3_small.sqlite small
synphys_r2.0-pre4_small.sqlite small
synphys_r2.0-pre5_small.sqlite small
synphys_r2.0_small.sqlite small
synphys_r1.0_2019-08-29_medium.sqlite medium
synphys_r1.0_medium.sqlite medium
synphys_r2.0-pre1_medium.sqlite medium
synphys_r2.0-pre2_medium.sqlite medium
synphys_r2.0-pre3_medium.sqlite medium
synphys_r2.0-pre4_medium.sqlite medium
synphys_r2.0-pre5_medium.sqlite medium
synphys_r2.0_medium.sqlite medium
synphys_r1.0_2019-08-29_full.sqlite full
synphys_r1.0_full.sqlite full
synphys_r2.0-pre1_full.sqlite full
synphys_r2.0_full.sqlite full
```

- download

```py
import aisynphys
aisynphys.config.cache_path = r"C:\Users\neupo\ai\brain_map"
db = SynphysDatabase.load_version('synphys_r2.0_small.sqlite')
```

Display it? 

https://portal.brain-map.org/explore/toolkit/morpho-reconstruction/vaa3d-mozak
