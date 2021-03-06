---
layout: post
title:  "Inversion of control in Typescript"
date:   2018-04-23 22:04:00 +0100
categories: typescript code
author: Michael Gerbig
cover:  "/assets/header-code.jpg"
---

When writing [Swingletree][swingletree] I came across [InversifyJS][inversify], which enables us
to use Dependency Injection in our TypeScript applications. The refactor-hammer was more than ready to be swung, as soon as I discovered that constructor injection is supported and almost everything is managed via annotations.

So.. how does it look like? Let's take a look at an injectable class supporting constructor injection:

```typescript
// omitted other imports for clarity
import { injectable } from "inversify";
import { inject } from "inversify";

@injectable()
class GithubWebhook {
	constructor(
		@inject(EventBus) eventBus: EventBus,
		@inject(ConfigurationService) configService: ConfigurationService
	) {
		this.eventBus = eventBus;
		this.configService = configService;
	}
  
  // ...
}
```

Everything needs to be strapped together using an inversify container, which takes care of the dependency injections and class instantiation:

```typescript
import "reflect-metadata";

import { Container } from "inversify";

import { ConfigurationService } from "../configuration";
import EventBus from "../event-bus";
import GithubWebhook from "../github/github-webhook";


const container = new Container();

container.bind<EventBus>(EventBus).toSelf().inSingletonScope();
container.bind<ConfigurationService>(ConfigurationService).toSelf().inSingletonScope();
container.bind<GithubWebhook>(GithubWebhook).toSelf().inSingletonScope();

export default container;
```

Keep in mind that classes only get instantiated when they are a dependency of an other class. You can manually require them by using this:

```typescript
container.get<CommitStatusSender>(CommitStatusSender);
```

Inversify has some very good examples, if you want to get into the details.

[inversify]: http://inversify.io/
[swingletree]: https://github.com/error418/swingletree
