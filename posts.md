---
layout: full-width
---

<div class="posts">
    {% for post in site.posts %}
    <div class="post">
        <h1><a href="{{ post.url }}">{{ post.title }}</a></h1>
        {{ post.excerpt }}
        <p>
            <a href="{{ post.url }}">read more...</a>
        </p>
    <div>
    {% endfor %}
</div>