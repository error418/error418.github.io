---
layout: partial-width
---

Hello and welcome to a (yet) pretty empty personal GitHub page.

Besides some <a class="nav-link" href="{{ 'posts.html' | relative_url }}">articles</a> you'll
find the real content inside the repositores and the contributions on <a href="https://github.com/error418">GitHub</a>

<github-repos user="error418"></github-repos>

---

Please consider donating, if you like/use some of my work. Cheers! <i class="fa fa-smile-o"></i>

<div class="input-group">
    <span class="input-group-addon" title="IOTA"><img src="media/IOTA.svg" width="20" height="20" /></span>
    <input id="iota-address" type="text" class="form-control" value="IJQUHNFIQMFRZZKTDYULVXPMBDJHNQZCMTZRGLHJNMJJKYIIPSLJKBGUGQ9ZVW9QZTWOPSW9SKBPMODSXOFRFKNKQW" readonly>
    <script>
        $("#iota-address").click(function () {
            $(this).select();
        });
    </script>
</div>