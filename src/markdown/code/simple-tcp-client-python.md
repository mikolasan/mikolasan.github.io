---
title: Simple Python TCP client
date: 2022-01-01
published: 2022-08-02
lastModified: 2022-08-02
---

## Features

- nonblocking socket
- server messages divided by a newline, broken packages concatenated before parsing
- sending messages to server from standard input
- reconnect timer
- logger


gist link: https://gist.github.com/mikolasan/7652bcd3ee5498c21541f53bce1c72ce

## Code

```python
#!/usr/bin/env python3

import errno
import json
import logging
import select
import socket
import sys
import time

from threading import Thread, Timer

# create logger
logger = logging.getLogger('test_client')
logger.setLevel(logging.DEBUG)
# create console handler and set level to debug
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)
# create formatter
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

TCP_HOST = 'localhost'
TCP_PORT = 32155
client_socket = None
server_address = (TCP_HOST, TCP_PORT)
connect_timeout = 3
reconnect_delay = 6
BUF_SIZE = 4096


def connect_to_server():
    global client_socket
    try:
        logger.info(f'Connecting to {server_address}...')
        client_socket = socket.create_connection(server_address, connect_timeout)
        client_socket.setblocking(False)
        client_thread = Thread(target=client_communication, args=(client_socket, ))
        client_thread.start()
    except (ConnectionError, socket.timeout) as e:
        logger.debug(f'Connection error: {e}') 
        logger.debug(f'Reconnect in {reconnect_delay} seconds')
        client_socket = None
        reconnect_timer = Timer(reconnect_delay, connect_to_server)
        reconnect_timer.daemon = True
        reconnect_timer.start()


def client_communication(s):
    keep_connection = True
    buffer = bytearray(b'')
    while keep_connection:
        read_ready, _, _ = select.select([s, sys.stdin], [], [])
        if s in read_ready:
            # The socket has data ready to be received
            continue_recv = True
            while continue_recv:
                try:
                    # Try to receive some data
                    buffer += s.recv(BUF_SIZE)
                except socket.error as e:
                    # no more data in the socket
                    continue_recv = False
                    if e.errno == errno.EWOULDBLOCK:
                        buffer = process_buffer(s, buffer)
                    else:
                        # Error! Print it and tell main loop to stop
                        logger.error(f'Read error: {e}')
                        keep_connection = False
        elif sys.stdin in read_ready:
            text = sys.stdin.readline().strip()
            message = text + "\n"
            s.send(message.encode())
    s.close()


def process_buffer(s, buffer):
    if len(buffer) > 0:
        messages = buffer.split(b'\n')
        if buffer[-1] == b'\n':
            buffer = bytearray(b'')
        else:
            buffer = messages[-1]
        for m in messages[:-1]:
            if len(m) == 0: continue
            process_incoming_message(s, m)
    return buffer


def process_incoming_message(sock, msg):
    print(msg)


if __name__ == '__main__':
    try:
        connect_to_server()
        while True:
            time.sleep(1)
    except KeyboardInterrupt as e:
        logger.info("Program closed by the user")
```