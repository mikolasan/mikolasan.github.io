---
title: Create new user in Linux
date: 2025-03-08
published: 2025-03-08
lastModified: 2025-03-08
---

The commands supposed to be simple but there is always confusion if it supposed to be `useradd` or `adduser`.

```sh
# iirc it can skip home folder creation if no flag specified
sudo useradd --create-home --user-group mikolasan --shell /bin/bash
# make our home a little bit more secure
sudo chmod 700 /home/mikolasan
# time to set the password
sudo -u root passwd mikolasan
# and add our new user to sudoers (there is probably another way)
sudo adduser mikolasan sudo
# and if we want to change our default shell
chsh --shell /bin/zsh $USER
```

Actually if we on this path let's just setup this user with all goodies of the world

```sh
git clone https://github.com/mikolasan/dotfiles.git ~/dotfiles
cd ~/dotfiles
git submodule update --init

# bonclay is not available for arm 
# but it's very simple Go, so it can be quickly compiled 
# (if you were able to quickly install Go 
# (just use Go version manager - https://github.com/moovweb/gvm))
sudo ~/dotfiles/get-bonclay.sh
bonclay sync bonclay.conf.yaml

# why do I assume it's going to be Arch (or Manjaro)?
# I don't know, but why use anything else?
sudo pacman -S --noconfirm \
  python-pip \
  powerline \
  powerline-fonts \
  tmux \
  vim \
  zsh \
  ranger \
  yay \
  alacritty \
  tk \
  meld \
  nmap

# install vim plugins (including themes)
vim +PluginInstall +qall

# super addictive reverse shell command search, Ctrl+R
./fzf/install

# start your terminal session
# - you can logout and login and still have all programs running in your terminal
# - you can remotely login and see exactly the same output
# - multiple tabs - one window
# - split screen
# - another type of scroll experience but now you have search!
tmux
```
