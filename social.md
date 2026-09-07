---
layout: page
title: "Follow Patriots Nation"
permalink: /social/
---

<header class="blog-hero">
  <div class="overlay"></div>
  <div class="blog-hero-content">
    <h1>Follow Patriots Nation</h1>
    <p>Everywhere we post, all in one place</p>
  </div>
</header>

<main class="social-page container">

  {%- comment -%}
    Depends on site.social.x and site.social.facebook_url in _config.yml.
    If either is renamed or removed there, the corresponding embed below
    will silently fail to load (no visible error) — check _config.yml
    first if one of these ever stops showing posts.
  {%- endcomment -%}
  <section class="social-embeds">
    {% if site.social.x and site.social.x != "" %}
    <div class="social-embed-col">
      <h2 class="social-embed-title">X — @{{ site.social.x | escape }}</h2>
      <a class="twitter-timeline" data-height="600" href="https://twitter.com/{{ site.social.x | escape }}?ref_src=twsrc%5Etfw">Tweets by {{ site.social.x | escape }}</a>
      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    </div>
    {% endif %}

    {% if site.social.facebook_url and site.social.facebook_url != "" %}
    <div class="social-embed-col">
      <h2 class="social-embed-title">Facebook — Patriots Nation</h2>
      <div id="fb-root"></div>
      <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0"></script>
      <div class="fb-page"
           data-href="{{ site.social.facebook_url | escape }}"
           data-tabs="timeline"
           data-width="500"
           data-height="600"
           data-small-header="false"
           data-adapt-container-width="true"
           data-hide-cover="false"
           data-show-facepile="false">
      </div>
    </div>
    {% endif %}
  </section>

  <section class="social-highlights">
    <h2 class="section-title">More from Instagram, Threads &amp; Reddit</h2>
    <p class="section-note">These three platforms don't offer a live feed, so these are updated by hand — follow the links below for everything else.</p>
    <div class="highlight-grid">
      {% for h in site.data.social_highlights %}
        {% include highlight-card.html h=h %}
      {% endfor %}
    </div>
  </section>

</main>
