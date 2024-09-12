---
title: Git tips for old dogs
date: 2022-09-18
published: 2022-09-18
lastModified: 2022-09-18
---
If you have started using git years ago, then you already have habits and your preferred ways of doing things. But new versions introduce new commands. How to use them and why do we need it? Do we deserve them?

```bash
# push to the remote server
git push origin branch:
git push --delete origin branch

# create new branch and switch to it
git checkout -b new_branch
git switch -c new_branch

# revert unstaged changes
git checkout -- file
git restore file

# remove changes from the stage
git reset HEAD file
git restore --staged file
```