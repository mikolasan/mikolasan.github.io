---
title: "Git survival cheat sheet"
date: 2021-05-21
published: 2023-05-21
lastModified: 2023-05-21
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/eI-nOb1K5gE/upload/0da5eb21a691b6e0ea6ce634aceacb23.jpeg
tags: github, git, bitbucket, gitcommands
---

## First, introduce yourself

```bash
git config --global user.name "Nikolay Neupokoev"
git config --global user.email "mikolasan@twitter.com"
```

```bash
git config --global core.editor vim # or nano
git config --global init.defaultBranch master
```

## Create your local repo and publish

Find a gitignore file for your stack on https://gitignore.io

```bash
git init
git add .
git commit -m "Initial commit"
```

After you created a remote repo on GitHub, GitLab, Bitbucket etc

```bash
git remote add origin <url to git repo>
git push -u origin master
```

## Get someone's repo

```bash
git clone <url>
```

Some projects like [boost](https://github.com/boostorg/boost), [Qt](https://github.com/qt/qt5), and user dotfiles use submodules

```bash
cd <project name>
git submodule update --init
```

## Start coding

Create a separate branch

```bash
git checkout -b <branch name>
```

Branch name conventions

* [git flow](https://nvie.com/posts/a-successful-git-branching-model/) (feature/new-button fix/wrong-color release/1.0.2)
    
* [GitHub flow](https://guides.github.com/introduction/flow/) (some-meaningful-name)
    

Commit your work

```bash
git add -p
git commit
```

Have more changes to previous commit? `add` and

```bash
git commit --amend
```

Want to undo the last commit?

```bash
git reset HEAD^
```

In any unexplainable situation do not panic and use

```bash
git status
```

it always explains where you are and gives you options of what you can do.

# Finish your work

Now you are ready to publish your changes and make a Pull Request

```bash
git push origin branch-name-with-your-work
```

If you use Pull Requests on GitHub or BitBuclet then branches will be merged automatically when the Pull Request is accepted. But if you are just messing with branches then merge your branch into master

```bash
git checkout master
git merge branch-name-with-your-work
```

and delete your branch

```bash
git branch -d branch-name-with-your-work
```

And then push only the master branch.

```bash
git push origin master
```

It makes sense to push your branch to the remote if someone else in your team needs these changes before they are approved, or for backup purposes if the task takes longer than a day and you think that your work can blow up your computer.

In any case, do not forget to clean up after yourself on the remote. When the branch was merged to master, delete that thing that was pushed before.

```bash
git push --delete origin branch-name-with-your-work
```

When someone else does this in your team, this is when you need

```bash
git fetch -p origin
```

But more context about this later.

# Sync work with colleagues

Get new updates from a remote repo. In simple cases, one pull is enough

```bash
git pull
```

but sometimes you need

```bash
git checkout master
git fetch -p origin # download remote changes only (+ update info about removed branches on the remote). if there is nothing new then stop here, no need to pull
git stash # in case there are local staged/unstaged changes, we hide them
git pull
git stash pop # return hidden changes
```

In case you already did some local commits, and there are remote changes, and you prefer straight-forward git history then rebase your changes on top of remote commits

```bash
git pull --rebase
```

The situation is simpler if you work in your branch. Then you pull easily and then rebase. To move your changes on top of the latest repo state

```bash
git rebase master # when current branch is branch-name-with-your-work
git rebase master branch-name-with-your-work # when current branch is something else, master, for example
```

# Bonus trick

Restore a file once deleted

```bash
git rev-list -n 1 HEAD -- <file>
git checkout <hash from the previous command>^ -- <file>
```