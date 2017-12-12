---
layout: default
---

<div class="posts">
    {% for post in site.posts %}
    <div class="post">
        <h1><a href="{{ post.url }}">{{ post.title }}</a></h1>
        {{ post.excerpt }}
    <div>
    {% endfor %}
</div>