---
layout: post
title:  "Using SonarQube branch analysis with GitHub PRs"
date:   2018-06-30 22:04:00 +0100
categories: code
author: error418
cover:  "/assets/header-code.jpg"
---

On my job I have a lot to do with [SonarQube][sonar]. Like many other companies we use this tool to perform static code analysis for our projects.

I was excited when Sonarqube announced the [Branch Analysis Feature][sonar-branch] for its [SonarQube Developer Edition][sonar-dev-edition], which enabled us to increase the transparency of quality issues for our development branches in relation to our `master`-branch.

We were using (and still use) the [Sonar GitHub Plugin][sonar-gh] to help developers when approving pull requests. This solution is based on so called Sonar `preview`-scans, which can cover only a subset of the full Sonar scan and can therefore not compute a useful [leak period][sonar-leak].

The idea for [Swingletree][swingletree] was born. A pretty non-invasive integration using [Sonar webhooks][sonar-webhook] and [GitHub Apps][github-apps]. More details about the internals of Swingletree can be found in the project's readme.

Keep in mind you will need a license for the [SonarQube Developer Edition][sonar-dev-edition] (or a higher license edition) to be able to use the [Branch Analysis Feature][sonar-branch].

[sonar]: https://www.sonarqube.org/
[sonar-dev-edition]: https://www.sonarsource.com/plans-and-pricing/developer/
[sonar-branch]: https://docs.sonarqube.org/display/SONAR/Branch+Analysis
[sonar-gh]: https://docs.sonarqube.org/display/PLUG/GitHub+Plugin
[sonar-leak]: https://docs.sonarqube.org/display/SONAR/Fixing+the+Water+Leak
[sonar-webhook]: https://docs.sonarqube.org/display/SONAR/Webhooks

[github-apps]: https://developer.github.com/apps/differences-between-apps/

[swingletree]: https://github.com/error-418/swingletree
