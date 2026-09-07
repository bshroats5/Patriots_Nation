---
layout: page
title: "NAIA National Rankings"
permalink: /rankings/
---

<header class="blog-hero">
  <div class="overlay"></div>
  <div class="blog-hero-content">
    <h1>NAIA National Rankings</h1>
    <p>Where every ranked Patriots team stands this week</p>
  </div>
</header>

<main class="rankings-page container">
  {% assign ranked = site.data.rankings %}
  {% if ranked and ranked.size > 0 %}
  <div class="rankings-grid">
    {% for r in ranked %}
      {% include ranking-card.html r=r %}
    {% endfor %}
  </div>
  {% else %}
  <p class="empty">No teams are currently ranked. Check back once polls are released.</p>
  {% endif %}
</main>
