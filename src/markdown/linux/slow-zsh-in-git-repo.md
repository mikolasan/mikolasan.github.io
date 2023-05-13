---
date: 2022-06-03
title: Slow zsh in Git repo
published: 2022-06-03
lastModified: 2022-06-03
---

If you experience lagging in some repositories when using the oh-my-zsh shell, then try to hide certain information in the prompt:

```
git config --add oh-my-zsh.hide-status 1
git config --add oh-my-zsh.hide-dirty 1
```

The _status_ provides information about the current state of the Git repository, such as whether there are any modified files or untracked files.

The _dirty_ information refers to whether there are any changes in the working directory that have not been committed to the Git repository. 