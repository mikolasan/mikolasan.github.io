---
title: Matplotlib on linux
date: 2023-01-27
---

Sometimes using `matplotlib` on Linux you can get a long traceback message instead of a plot that you expected.
Strangely it says something about key modifiers. Just give me the plot!

So here's the possible output:

```
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/home/nikolay/.local/lib/python3.10/site-packages/networkx/drawing/nx_pylab.py", line 108, in draw
    cf = plt.gcf()
  File "/home/nikolay/.local/lib/python3.10/site-packages/matplotlib/pyplot.py", line 867, in gcf
    return figure()
  File "/home/nikolay/.local/lib/python3.10/site-packages/matplotlib/pyplot.py", line 808, in figure
    manager = new_figure_manager(
  File "/home/nikolay/.local/lib/python3.10/site-packages/matplotlib/pyplot.py", line 326, in new_figure_manager
    _warn_if_gui_out_of_main_thread()
  File "/home/nikolay/.local/lib/python3.10/site-packages/matplotlib/pyplot.py", line 316, in _warn_if_gui_out_of_main_thread
    if (_get_required_interactive_framework(_get_backend_mod())
  File "/home/nikolay/.local/lib/python3.10/site-packages/matplotlib/pyplot.py", line 217, in _get_backend_mod
    switch_backend(dict.__getitem__(rcParams, "backend"))
  File "/home/nikolay/.local/lib/python3.10/site-packages/matplotlib/pyplot.py", line 268, in switch_backend
    switch_backend(candidate)
  File "/home/nikolay/.local/lib/python3.10/site-packages/matplotlib/pyplot.py", line 288, in switch_backend
    class backend_mod(matplotlib.backend_bases._Backend):
  File "/home/nikolay/.local/lib/python3.10/site-packages/matplotlib/pyplot.py", line 289, in backend_mod
    locals().update(vars(importlib.import_module(backend_name)))
  File "/usr/lib/python3.10/importlib/__init__.py", line 126, in import_module
    return _bootstrap._gcd_import(name[level:], package, level)
  File "<frozen importlib._bootstrap>", line 1050, in _gcd_import
  File "<frozen importlib._bootstrap>", line 1027, in _find_and_load
  File "<frozen importlib._bootstrap>", line 1006, in _find_and_load_unlocked
  File "<frozen importlib._bootstrap>", line 688, in _load_unlocked
  File "<frozen importlib._bootstrap_external>", line 883, in exec_module
  File "<frozen importlib._bootstrap>", line 241, in _call_with_frames_removed
  File "/home/nikolay/.local/lib/python3.10/site-packages/matplotlib/backends/backend_qtagg.py", line 12, in <module>
    from .backend_qt import (
  File "/home/nikolay/.local/lib/python3.10/site-packages/matplotlib/backends/backend_qt.py", line 73, in <module>
    _MODIFIER_KEYS = [
  File "/home/nikolay/.local/lib/python3.10/site-packages/matplotlib/backends/backend_qt.py", line 74, in <listcomp>
    (_to_int(getattr(_enum("QtCore.Qt.KeyboardModifier"), mod)),
TypeError: int() argument must be a string, a bytes-like object or a real number, not 'KeyboardModifier'
```

Let's say we trying to run this example:

```py
import networkx as nx
import matplotlib
import matplotlib.pyplot as plt
import numpy as np

A = np.array([[0,1,1,0],
              [1,0,1,1],
              [1,1,0,0],
              [0,1,0,0]])

G = nx.from_numpy_array(A)
nx.draw(G, with_labels=True)
```

Make sure you use the correct [backend](https://matplotlib.org/stable/users/explain/backends.html). You can switch it in the following way:

```py
matplotlib.use('wxAgg')
```