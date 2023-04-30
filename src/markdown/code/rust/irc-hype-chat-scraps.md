---
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