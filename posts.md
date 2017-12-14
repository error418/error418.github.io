---
layout: full-width
---

<div class="posts">
    {% for post in site.posts %}
    <div class="post">
        <h1><a href="{{ post.url }}">{{ post.title }}</a></h1>
        <p class="excerpt">{{ post.excerpt }}</p>
        <p class="more"><a href="{{ post.url }}">read more...</a></p>
    </div>
    {% endfor %}
</div>