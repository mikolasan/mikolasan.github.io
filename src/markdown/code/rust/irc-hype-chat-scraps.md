---
date: 2023-04-26
title: IRC "hype" chat
subtitle: Interesting Rust code scraps
published: 2023-05-05
lastModified: 2023-05-05
---

## Countdown

To create a range loop that iterates from 5 down to 1 in Rust, you can use the rev method on a range. Here's an example:

```rust
for i in (1..=5).rev() {
    println!("Wait to reconnect ({})...", i);
    std::thread::sleep(std::time::Duration::from_secs(1));
}
```

we use a range from 1 to 5 inclusive (1..=5) and then call the rev method to iterate over the range in reverse order.

## Command pattern

You can use the command design pattern by defining a trait that represents an IRC command, and then defining structs that implement that trait for each command.

```rust
pub trait IrcCommand {
    fn execute(&self, args: Vec<&str>);
}

pub struct NickCommand {
    // Fields for the NickCommand struct
}

impl IrcCommand for NickCommand {
    fn execute(&self, args: Vec<&str>) {
        // Implementation for the NickCommand
    }
}
```

Using an abstract factory to create command objects based on a command string can be a good way to decouple the command parsing and execution logic. The `create_command` method uses a `match` statement to create a new instance of the appropriate command struct based on the command name, or returns `None` if the command name is unknown.

```rust
trait CommandFactory {
    fn create_command(&self, command_name: &str) -> Option<Box<dyn IrcCommand>>;
}

struct DefaultCommandFactory;

impl CommandFactory for DefaultCommandFactory {
    fn create_command(&self, command_name: &str) -> Option<Box<dyn IrcCommand>> {
        match command_name.to_uppercase().as_str() {
            "NICK" => Some(Box::new(NickCommand { /* Initialize NickCommand fields */ })),
            "JOIN" => Some(Box::new(JoinCommand { /* Initialize JoinCommand fields */ })),
            // Add other commands here...
            _ => None,
        }
    }
}
```

And instead of 

```rust
"NICK" => {
    let cmd = NickCommand { /* Initialize NickCommand fields */ };
    cmd.execute(args);
},
"JOIN" => {
    let cmd = JoinCommand { /* Initialize JoinCommand fields */ };
    cmd.execute(args);
},
_ => {
    write!(stream, "Unknown command: {}\r\n", command)?;
}
```

We will have

```rust
if let Some(command_object) = factory.create_command(command) {
    command_object.execute(args);
```

Using this approach, you can easily swap out the `CommandFactory` implementation to use a different set of commands, or to allow plugins to define new commands without modifying the server code.


## Non blocking TCP client

In client's implementation messages should be sent and received asynchronously. While a user can trigger special messages and send them non blocking, the client can receive responses to old and new messages in the background

```rust
async fn handle_server(stream: TcpStream) -> io::Result<()> {
    let (read, write) = tokio::io::split(stream);
    
    let token = CancellationToken::new();
    let cloned_token = token.clone();
    
    let reader = BufReader::new(read);
    let read_handle = tokio::spawn(async move {
        process_server_responses(reader, &token).await;
    });
    let write_handle = tokio::spawn(async move {
        process_user_input(write, &cloned_token).await;
    });

    read_handle.await?;
    write_handle.await?;

    Ok(())  
}
```


## Solid Pods

Exactly said - alongside. IRC protocol defines the basics of communication design: channels, private messages, moderators. It's implemented in many popular platforms like Slack and Discord. But they are all centralized. I want to add decentralization feature to IRC by using Pods if it's possible.

create an IRC client that is integrated with Solid Pods. This client could store IRC data, such as channels and private messages, in the user's Solid Pod. The client could also use decentralized authentication, such as WebID, to authenticate users without relying on a centralized server.

Another approach would be to create a Solid Pod server that can act as an IRC server. This would allow users to connect to the IRC network using a decentralized, peer-to-peer architecture, rather than relying on a centralized server. The Solid Pod server could use existing IRC clients, such as IRCCloud or HexChat, to communicate with users.

Both of these approaches would require some development work to implement, but they could provide a way to add decentralization features to IRC using Solid Pods.


## Fractal (Matrix client)

[Fractal](https://gitlab.gnome.org/GNOME/fractal) - Matrix group messaging app

### How to build on Windows

To test that you have all native libraries installed, run build through meson

```
meson setup build
```

GTK4 bindings for Rust done through [this crate](https://gtk-rs.org/). So they assume that one already have GTK4 installed natively.
And [this](https://gtk-rs.org/gtk4-rs/stable/latest/book/installation_windows.html) is how we install GTK4 using MSVC toolchain.
I'm going to follow the [gvsbuild docs](https://github.com/wingtk/gvsbuild#development-environment) to build GTK 4.

Updated **chocolatey** just in case (the last time I used this tool in 2018 when I built [Open Morrowind](/projects/my-morrowind)).

```sh
mkdir gtk-build
cd gtk-build
mkdir github
cd github
git clone https://github.com/wingtk/gvsbuild.git
cd gvsbuild
```

Open Anaconda PowerShell prompt (I installed **miniconda** [here](/blog/starcode))

```powershell
python -m venv .venv
.\.venv\Scripts\activate.ps1
pip install .
gvsbuild build gtk4 libadwaita gtksourceview5 gettext
```

Then make sip of tea 🍵

Add `C:\gtk-build\gtk\x64\release\bin` to user's `PATH`.


GStrreamer. Make sure to run ninja from **x64 Native Tools Command Prompt for VS 2022**

```
git clone https://gitlab.freedesktop.org/gstreamer/gstreamer.git
cd gstreamer
pip install --user meson
meson configure
meson setup -Dbuildtype=release -Dprefix="c:/gtk-build/gstreamer/x64/debug/" -Dtests=disabled -Dexamples=disabled -Dintrospection=disabled c:\Users\neupo\develop\gtk-build\github\gstreamer-build
ninja -C c:\Users\neupo\develop\gtk-build\github\gstreamer-build
cd ..\gstreamer-build
meson install
```

Or fix config later with `meson configure -Dtests=disabled -Dexamples=disabled -Dintrospection=disabled c:\Users\neupo\develop\gtk-build\github\gstreamer-build`. If you forgot to specify `prefix`, don't worry, it can be fixed on the install step by specifying `--destdir` ([ref](https://mesonbuild.com/Installing.html#destdir-support))

```
git clone https://gitlab.gnome.org/GNOME/libshumate.git
cd libshumate
```