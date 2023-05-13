---
title: How to close TCP socket in Node.js
date: 2023-02-02
published: 2023-02-02
lastModified: 2023-02-02
---

The reason behind "connect, disconnect and then connect again" behavior might be that the old socket was still listening because it was half closed. Read [this](https://stackoverflow.com/questions/9191587/how-to-disconnect-from-tcp-socket-in-nodejs).

So it depends on the protocol and if the server is a rude guy and in case of any error it immediately closes the connection, then it must use the `destroy` function.

```js
import { Transform } from 'stream';

class Protocol extends Transform {
  constructor(socket) {
    super();
    this._socket = socket;
  }

  disconnect() {
    if (this._socket) {
      this._socket.destroy();
      delete this._socket;
    }
  }

  // override from stream.Transform
  _transform(chunk, encoding, done) {
    // ...
  }
}
```
