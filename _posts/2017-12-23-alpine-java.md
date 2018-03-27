---
layout: post
title:  "Alpine and Oracle Java"
date:   2017-12-23 22:04:00 +0100
categories: docker
author: error418
---

So, finally we got an Alpine Repository running. *"Let's build a Java image on top of that, like, right now!"*, I greenly said to my colleague, not knowing, that it will not be that easy.

Let's start with some basic details about [Alpine Linux][alpine]. It is a Linux distribution built on top of [musl][musl] and [BusyBox][busybox]. Alpine enables us to build very small images, since it is stripped of almost everything.

> Alpine Linux is a security-oriented, lightweight Linux distribution based on musl libc and busybox. 

Wait a moment.. `musl` instead of `glibc`? A quick Google search confirmed the bad feeling I've had after receiving the first weird error messages from the freshly built container. Oracle JRE, as well as Oracle JDK are not compatible with `musl`. Unfortunately, `glibc` is a hard dependency of these packages. [OpenJDK][openjdk], on the other side, runs (thanks to [Project Portola][portola]) on `musl`-based environments.

You will find some [instructions][instructions] on how to run Oracle Java on Alpine, but I sense a "workaroundy" aftertaste in such solutions.


[alpine]: https://alpinelinux.org/
[musl]: https://www.musl-libc.org/
[busybox]: http://www.busybox.net/
[openjdk]: http://openjdk.java.net/
[portola]: http://openjdk.java.net/projects/portola/
[instructions]: https://developer.atlassian.com/blog/2015/08/minimal-java-docker-containers/
