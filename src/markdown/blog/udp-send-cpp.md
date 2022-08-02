---
title: C++ send UDP example
date: 2021-10-04
---


Copied code from [Sending string over UDP in C++](https://stackoverflow.com/a/24560310/1104612).
C-style code in C++ question.

Let's make this solution to be a real C++ answer!

- order of includes
- char -> std string
- int error code -> exceptions
- cerr for errors
- use reinterpret cast
- print error message
- add root namespace (just to highlight network functions)
- another method to create destination address
- don't bind on client side
- close file descriptor
- separate function for sending data (pass data as string_view)

gist link: https://gist.github.com/mikolasan/adfa10849aae8d940a6caea018422f17

## Code

```cpp
#include <iostream>
#include <string>
#include <string_view>

#include <arpa/inet.h> // htons, inet_addr
#include <netinet/in.h> // sockaddr_in
#include <sys/types.h> // uint16_t
#include <sys/socket.h> // socket, sendto
#include <unistd.h> // close

void send_data(const std::string& hostname, uint16_t port, const std::string_view& data) {
    int sock = ::socket(AF_INET, SOCK_DGRAM, 0);

    sockaddr_in destination;
    destination.sin_family = AF_INET;
    destination.sin_port = htons(port);
    destination.sin_addr.s_addr = inet_addr(hostname.c_str());

    int n_bytes = ::sendto(sock, data.data(), data.length(), 0, reinterpret_cast<sockaddr*>(&destination), sizeof(destination));
    std::cout << n_bytes << " bytes sent" << std::endl;
    ::close(sock);
}

int main(int argc, char const *argv[])
{
    std::string hostname{"192.168.0.4"};
    uint16_t port = 9000;

    const char data[] = "Jane Doe";
    size_t length = 8;
    std::string_view msg{&data[0], length};

    send_data(hostname, port, msg);

    return 0;
}
```