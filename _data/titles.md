---
layout: page
title: "National Championships"
permalink: /titles/
---

<header class="blog-hero">
  <div class="overlay"></div>
  <div class="blog-hero-content">
    <h1>National Championships</h1>
    <p>Every red banner in Patriots history</p>
  </div>
</header>

<main class="titles-page container">
  {% assign titles = site.data.national_titles | sort: "year" | reverse %}
  {% if titles and titles.size > 0 %}
  <p class="titles-count">{{ titles.size }} national titles</p>
  <div class="titles-grid">
    {% for t in titles %}
      {% include title-card.html t=t %}
    {% endfor %}
  </div>
  {% else %}
  <p class="empty">No national titles listed yet.</p>
  {% endif %}
</main>
