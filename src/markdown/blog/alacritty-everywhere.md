---
title: Alacritty everywhere
date: 2024-08-25
published: 2024-08-25
lastModified: 2024-08-25
subtitle: Terminal emulator for Windows
---
Some time ago I played with setting up [Anaconda in VS Code](/code/anaconda-in-vscode-terminal), but this time I want to upgrade [Git for Windows](/code/customize-git-bash-for-windows) and run it from Alacritty.

## Shells

### Git

```
D:\Programs\Alacritty-v0.13.2-portable.exe --command "C:\Program Files\Git\bin\bash.exe"
```

### MinGW

```
D:\Programs\Alacritty-v0.13.2-portable.exe --command C:\msys64\msys2_shell.cmd -defterm -here -no-start -mingw64
```

### MSVC

This will not work because of the spaces (arrgh)

```
D:\Programs\Alacritty-v0.13.2-portable.exe --command cmd.exe /k "C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat"

D:\Programs\Alacritty-v0.13.2-portable.exe  --option shell="{program='cmd.exe',args=['/k C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat']}"
```

But it works if you put it in the config `%appdata%\alacritty\alacritty.toml`

```toml
[shell]
args = ['/k "C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat"']
program = "cmd.exe"

```

A side note. If you get an error about changing only `shell.args` while `shell.program` is undefined, then this means that one need to set both arguments and use the proper types (I noticed that TOML's parser is very gentle and spaces are not allowed in the array syntax (I'm testing this on the latest Alacritty (0.13.2) that migrated to TOML format)). [ref](https://github.com/alacritty/alacritty/issues/6707)

But maybe one shouldn't touch the `shell` option because there's a special `command` option.
### Conda

And here is an example when it works okay when the path has no spaces

```
D:\Programs\Alacritty-v0.13.2-portable.exe --command "cmd.exe /k C:\Users\neupo\miniconda3\Scripts\activate.bat"
```


## Paths

- where I added SSH agent autostart: `C:\Program Files\Git\etc\profile.d\git-prompt.sh`
- where I added **.vim** folder: `C:\msys64\home\neupo`
- where I added local **bin** folder to the PATH: `C:\msys64\home\neupo\.bash_profile`

```bash
if [ -d "/c/Users/neupo/.cargo/bin" ] ; then
  PATH="/c/Users/neupo/.cargo/bin:${PATH}"
fi

if [ -d "/c/Users/neupo/.local/bin" ] ; then
    PATH="/c/Users/neupo/.local/bin:${PATH}"
fi
```


## Fonts and emoji

Fonts: https://www.nerdfonts.com/font-downloads

Or install all with a script https://gist.github.com/stramel/658d702f3af8a86a6fe8b588720e0e23

Configure your terminal for better experience (color emoji) https://github.com/alacritty/alacritty/issues/153#issuecomment-630636358

https://fonts.google.com/noto/specimen/Noto+Color+Emoji


`C:\msys64\mingw64\etc\fonts\conf.d`

```
<alias>
	<family>monoscpace</family>
	<prefer>
	<family>Cousine</family> <!-- Your preferred monospace font -->
	<family>Noto Color Emoji</family> <!-- Your preferred emoji font -->
	</prefer>
</alias>
```