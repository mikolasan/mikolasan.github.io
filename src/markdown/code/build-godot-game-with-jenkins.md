---
date: 2022-02-01
title: Build Godot game with Jenkins
published: 2022-02-22
lastModified: 2022-05-22
---

I choose Pipeline project in Jenkins, this allows me to create one Groovy script instead of doing it in GUI that may not support all features (for example, git LFS). With the script there is a catch though, it differs in syntax depending on what block you are using `pipeline` or `node`. And speaking in terms that Jenkins developers use: [Declarative pipeline](https://www.jenkins.io/doc/book/pipeline/#declarative-pipeline-fundamentals) or [Scripted pipeline](https://www.jenkins.io/doc/book/pipeline/#scripted-pipeline-fundamentals). I will go through both of them and show what advantages they have.


## Prerequisites

### Jenkins

I installed Jenkins from official Manjaro repository

```
sudo pacman -s jenkins
```

and updated the config **/etc/conf.d/jenkins** to use Java 11

```
JAVA=/usr/lib/jvm/java-11-openjdk/bin/java
```

### Docker

To use `docker push` and `docker pull` locally you need to spin a [local registry](https://docs.docker.com/registry/deploying/#run-a-local-registry)

```
docker run -d -p 5000:5000 --restart=always --name registry registry:2
```

And fix access rights

```
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### Local repositories



## Using a Node block

Let's start with a Scripted pipeline, because it's more elegant and compact, but not flexible at all.

For start, this is how I build Godot engine in Jenkins

```groovy
node {
    stage 'Checkout'
    git 'https://github.com/godotengine/godot.git'
    
    stage 'Build'
    docker.image('mylittledocker/godot').inside {
        ansiColor('xterm') {
            sh 'cp /build.sh .'
            sh 'chmod +x build.sh'
            sh 'rm -rf bin/'
            def build = "${env.GD_BUILD_TYPE}"
            if (build == 'ALL') {
                sh 'GD_BUILD_TYPE=editor ./build.sh'
                sh 'GD_BUILD_TYPE=templates ./build.sh'
                sh 'GD_BUILD_TYPE=server ./build.sh'
            } else {
                sh './build.sh'
            }
        }
    }

    stage 'Archive'
    archiveArtifacts artifacts: 'bin/godot*', fingerprint: true, onlyIfSuccessful: true
}
```

Here a build script used in the pipeline, its intend is to build very small engine for 2D games by disabling all 3D features. And also it requires the `strip` command to strip out debug symbols.

```bash
#!/bin/bash

set +x

export BUILD_NAME="saturdayscode"

if [ -z $GD_BUILD_TYPE ]; then
    echo "[WARNING] GD_BUILD_TYPE not set"
fi
platform_target_tools="platform=x11"
export_settings=""

modules="module_csg_enabled=no \
    module_dds_enabled=no \
    module_enet_enabled=no \
    module_etc_enabled=no \
    module_gdnative_enabled=no \
    module_gridmap_enabled=no \
    module_hdr_enabled=no \
    module_mobile_vr_enabled=no \
    module_pvr_enabled=no \
    module_recast_enabled=no \
    module_squish_enabled=no \
    module_tga_enabled=no \
    module_thekla_unwrap_enabled=no \
    module_tinyexr_enabled=no \
    module_visual_script_enabled=no \
    module_websocket_enabled=no"

if [ "$GD_BUILD_TYPE" = "editor" ]; then
    platform_target_tools="platform=x11 target=debug tools=yes"
elif [ "$GD_BUILD_TYPE" = "windows-templates" ]; then
    platform_target_tools="platform=windows target=release_debug tools=no"
    export_settings="disable_3d=yes use_lto=yes"
elif [ "$GD_BUILD_TYPE" = "templates" ]; then
    platform_target_tools="platform=x11 target=release_debug tools=no"
    export_settings="use_lto=yes"
elif [ "$GD_BUILD_TYPE" = "server" ]; then
    platform_target_tools="platform=server target=release_debug tools=yes"
fi

scons $platform_target_tools \
    arch=x64 \
    bits=64 \
    use_static_cpp=yes \
    minizip=no \
    $export_settings \
    $modules
```

I'm using packages recommended in [the docs](https://docs.godotengine.org/en/latest/development/compiling/compiling_for_linuxbsd.html). 

```dockerfile
FROM ubuntu:18.04

RUN apt-get update && \
    apt-get install --assume-yes --quiet \
        build-essential \
        python3 \
        scons \
        pkg-config \
        libx11-dev \
        libxcursor-dev \
        libxinerama-dev \
        libgl1-mesa-dev \
        libglu-dev \
        libasound2-dev \
        libpulse-dev \
        libfreetype6-dev \
        libssl-dev \
        libudev-dev \
        libxi-dev \
        libxrandr-dev \
        mingw-w64

COPY build.sh /
```

It worked on Ubuntu 18 for version 3.1 and 3.2, but somewhere later they have updated Python to version 3. So install it and update how the `python` command works

```dockerfile
# Add 3 to the available alternatives
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 1
# Set python3 as the default python
RUN update-alternatives --set python /usr/bin/python3

```

This image must be in my local registry. So before running a build in Jenkins, run the following command in an empty folder. This folder must include only **Dockerfile** and **build.sh**, otherwise it will copy other files into the image just making that image taking extra space for no use.

```
sudo docker build --tag mylittledocker/godot --file Dockerfile .
```

LFS example

```groovy
def packageName = 'class-2-backend.tar.gz'

node {
    stage 'Checkout'
    checkout([$class: 'GitSCM',
        branches: [[name: '*/stable']],
        extensions: [[$class: 'GitLFSPull']],
        userRemoteConfigs: [[
            credentialsId: 'EthoGames',
            url: 'git@bitbucket.org:EthoGames/class-2-backend.git'
        ]]
    ])
    stage 'Build'
    docker.image('ethogaming:5000/backend:slon-1.4.12').inside {
        sh 'make clean'
        sh 'make pack-debug'
        sh 'make pack-release'
    }
    stage 'Archive'
    archiveArtifacts artifacts: 'class-2-backend-debug.tar.gz,class-2-backend.tar.gz', fingerprint: true, onlyIfSuccessful: true
}
```


## Using a Pipeline block

What features we have here:

- multiline string in Groovy
- creating image and container right in build script

```groovy
def archiveName = 'class-2-frontend.tar.gz'
def dockerFile = '''FROM ubuntu:18.04

RUN apt-get update && apt-get install -y python3
COPY godot_server.x11.opt.tools.x64 /usr/bin
RUN ln -sr /usr/bin/godot_server.x11.opt.tools.x64 /usr/bin/godot

ENV UID 1000
ENV GD_VERSION 3.1.2.devel
RUN groupadd --system --gid $UID etho \
    && useradd --create-home \
        --shell /bin/bash \
        --no-log-init \
        --system \
        --gid etho \
        --uid $UID etho

USER etho
RUN mkdir -p \
    $HOME/.cache \
    $HOME/.local/share/godot/templates/$GD_VERSION \
    $HOME/.config
COPY linux_x11_64_debug /home/etho/.local/share/godot/templates/$GD_VERSION/'''

def frontendImage

pipeline {
    agent { label 'godot' }
    environment {
        PYTHONUNBUFFERED = 1
    }
    stages {
        stage('Checkout') {
            steps {
                dir('lobby') {
                    checkout([
                        $class: 'GitSCM', 
                        branches: [[name: '*/stable']],
                        extensions: [
                            [$class: 'GitLFSPull'],
                            [$class: 'CheckoutOption', timeout: 20],
                            [$class: 'CloneOption', timeout: 120]
                        ],
                        doGenerateSubmoduleConfigurations: false, 
                        extensions: [[
                            $class: 'SubmoduleOption', 
                            disableSubmodules: false, 
                            parentCredentials: true, 
                            recursiveSubmodules: false, 
                            trackingSubmodules: false
                        ]], 
                        submoduleCfg: [], 
                        userRemoteConfigs: [[
                            credentialsId: 'EthoGames',
                            url: 'git@bitbucket.org:EthoGames/class2lobby.git'
                        ]]
                    ])
                }
            }
        }
        stage('Prepare container') {
            steps {
                dir('docker') {
                    copyArtifacts filter: 'bin/godot.x11.debug.x64',
                        fingerprintArtifacts: true,
                        projectName: 'godot3.1-templates',
                        selector: lastSuccessful()
                    sh 'cp -v bin/godot.x11.debug.x64 linux_x11_64_debug'
                    copyArtifacts filter: 'bin/godot_server.x11.opt.tools.x64',
                        fingerprintArtifacts: true,
                        projectName: 'godot3.1-server',
                        selector: lastSuccessful()
                    sh 'cp -v bin/godot_server.x11.opt.tools.x64 .'
                    script {
                        writeFile file: 'Dockerfile', text: dockerFile
                        frontendImage = docker.build('ethogaming/frontend:3.1.2.devel')
                    }
                }
            }
        }
        stage('Clean') {
            when {
                expression { "$env.ETHO_CLEAN_IMPORT" == 'true' }
            }
            steps {
                sh 'find lobby -name "*.import" | xargs -i rm -rf "{}"'
            }
        }
        stage('Build') {
            steps {
                script {
                    frontendImage.inside {
                        ansiColor('xterm') {
                            sh 'rm -rf lobby/Build'
                            sh 'mkdir lobby/Build'
                            sh "cd lobby && ./build.py ${env.ETHO_BUILD}" 
                        }
                    }
                }
            }
        }
        stage('Archive') {
            steps {
                sh "cd lobby/Build && tar -czf ../../${archiveName} *"
                archiveArtifacts artifacts: "${archiveName}",
                    fingerprint: true,
                    onlyIfSuccessful: true
            }
        }
    }
}
```

## Reference

Also you might be interested in reading these useful resources

- https://hub.docker.com/r/barichello/godot-ci
- Jenkins Docker Workflow plugin - A look at inside() https://echorand.me/posts/jenkins-docker-workflow-inside/
- Docker Workflow plugin sources https://github.com/jenkinsci/docker-workflow-plugin/blob/74a2370901f41e8b5b541d768b440e2ab1cd1b18/src/main/java/org/jenkinsci/plugins/docker/workflow/client/DockerClient.java#L109