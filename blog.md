---
layout: page
title: "Patriots Nation Blog"
permalink: /blog/
pagination:
  enabled: true
---

<main class="blog-list container">
  {% for post in paginator.posts %}
    <article class="blog-post">
      {% if post.image %}
      <img src="{{ post.image | relative_url }}" alt="{{ post.title }}">
      {% endif %}
      <div class="blog-content">
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <p class="post-meta">
          Published on {{ post.date | date: "%B %-d, %Y" }}
          {% if post.author %} by {{ post.author }}{% endif %}
        </p>
        <p>{{ post.excerpt }}</p>
        <a href="{{ post.url | relative_url }}" class="read-more">Read More</a>
      </div>
    </article>
  {% endfor %}
</main>

<!-- Pagination Links -->
<div class="pagination">
  {% if paginator.previous_page %}
    <a href="{{ paginator.previous_page_path | relative_url }}">← Newer Posts</a>
  {% endif %}
  {% if paginator.next_page %}
    <a href="{{ paginator.next_page_path | relative_url }}">Older Posts →</a>
  {% endif %}
</div>