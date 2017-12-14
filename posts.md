---
layout: full-width
---

<div class="posts">
    {% if site.posts.size == 0 %}
        <h4>Uhm.. Remind me to write something in the near future <i class="fa fa-smile-o"></i></h4>
    {% else %}
        {% for post in site.posts %}
        <div class="post">
            <h1><a href="{{ post.url }}">{{ post.title }}</a></h1>
            <p class="excerpt">{{ post.excerpt }}</p>
            <p class="more"><a href="{{ post.url }}">read more...</a></p>
        </div>
        {% endfor %}
    {% endif %}
</div>