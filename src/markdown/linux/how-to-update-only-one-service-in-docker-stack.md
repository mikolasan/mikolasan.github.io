---
date: 2022-05-09
title: How to update only one service
subtitle: in docker stack
published: 2022-05-09
lastModified: 2022-05-09
---

If you have two applications and one database in a stack then the `docker-compose.yml` file looks like this

```yaml
version: "3.3"

services:
  app1:
    image: custom-image-app1
    ports:
      - "8000:8000"
  app2:
    image: custom-image-app2
    ports:
      - "8080:8080"
  db:
    image: postgres:14
    environment:
      POSTGRES_DB: mydatabase
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
    ports:
      - "5432:5432"

```

Let's say you have an update only in one application. How do you update the stack? If you run

```bash
docker stack down my_stack
docker build . -t my-app
docker stack up -c docker-compose.yml my_stack
```

then you are doing everything wrong!

After building a new image (or pulling it from the registry) you can update only the specific service with this command

```bash
docker service update --force --update-parallelism 1 --update-delay 5s my_stack_app1
```

## About logs

Check logs like this

```bash
docker service logs -f my_stack_app1
```

Set log rotation by editing **/etc/docker/daemon.json**

```json
{
  "log-driver": "local",
  "log-opts": {
    "max-size": "10m"
  }
}
```

Reference: https://docs.docker.com/config/containers/logging/local/