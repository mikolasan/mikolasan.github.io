---
title: IRC server and client
subtitle: Second time when I try Rust
date: 2023-04-26
published: 2023-05-05
lastModified: 2023-05-05
---

So what will it be, if I want to enhance IRC with Matrix states, Tox discoverability via UDP multicast and DHT, and Double Ratchet encryption ideas?

Tox = "open-world" version of Vypress
Matrix state = chat history stored as directed acyclic graph

## About

I just started the development (May 2023). It's not my main side project, quite the opposite, this very random idea for practicing crazy stuff in between really important projects when it becomes boring even there.

Essentially this should become a normal IRC client and IRC server. But not that many people use IRC these days (at least me), so I'll focus on enhancing functionality of this simple, as it might seem, chat application.

Many hype features will be implemented first, even before core functionalities – this is the approach in this project.

Apparently Hype Chat is already coined by Twitch.  [So I'm thinking](https://github.com/mikolasan/rabbit-ramble/issues/2) **Rabbit Ramble**
## Functions

I found it missing in whatsapp (of course it was a mistake to use it for business communications).
Search/filter messages in a group chat **by specific user**. Like if a person said one important message 3 months ago, so it could be the first in the search. But whatsapp limits how far you can manually scroll (at least on desktop/web), though you can search, but that was a link. **search by links/media** is another way to get what I need.

## Roadmap

- End-to-end encryption with [Off-the-record messaging](https://en.wikipedia.org/wiki/Off-the-record_messaging).
- WebID authentication. DM communication stored in a Solid Pod
- Personalization: color schemes, user profile, content recommendation and filtering
- Video and audio calls ([direct client to client connection](https://modern.ircdocs.horse/dcc.html) ?)
- Integration with third-party services: sharing files via google drive or dropbox, adding gifs to messages, displaying what is currently playing in your playlist
- The highest encryption level. User can manually select who can read their messages by sending decryption key, but then can revoke keys and change encryption and thus making all data hidden again.
- Runs on desktop and mobile
- Easy to develop new plugins: another integrations, another protocols, UI extensions
- Blogging platform
- Podcast platform
- Other features from [Friendica](https://friendi.ca/): integration with RSS, email, expiring content
- ...


## IRC protocol

- [Modern IRC Client Protocol](https://modern.ircdocs.horse/index.html)
- [(RFC 2812) Internet Relay Chat: Client Protocol](https://www.rfc-editor.org/rfc/rfc2812)

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

create an IRC client that is integrated with [Solid Pods](/blog/solid-pods). This client could store IRC data, such as channels and private messages, in the user's Solid Pod. The client could also use decentralized authentication, such as WebID, to authenticate users without relying on a centralized server.

Another approach would be to create a Solid Pod server that can act as an IRC server. This would allow users to connect to the IRC network using a decentralized, peer-to-peer architecture, rather than relying on a centralized server. The Solid Pod server could use existing IRC clients, such as IRCCloud or HexChat, to communicate with users.

Both of these approaches would require some development work to implement, but they could provide a way to add decentralization features to IRC using Solid Pods.


## Other chats

- [bit](https://github.com/permissionlesstech/bitchat/tree/main/bitchat) - A decentralized peer-to-peer messaging app with dual transport architecture: local Bluetooth mesh networks for offline communication and internet-based Nostr protocol for global reach. No accounts, no phone numbers, no central servers.

## UI

- GTK4
- [slint](https://slint.dev/) (has some restrictions for commercial use)

## Tests

- [irctest](https://github.com/progval/irctest/blob/master/irctest/server_tests/channel.py)