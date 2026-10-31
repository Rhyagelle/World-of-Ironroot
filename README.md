# Ironroot

A Jekyll theme for a Vintage Story server website. It has pages for lore, mods, the map, rules, news and a join guide. It builds on GitHub Pages with no custom plugins and no build step beyond Jekyll itself.

## Put it online

1. Create a GitHub repository and copy everything in this folder into it.
2. In the repository go to **Settings, Pages**, choose **Deploy from a branch**, then pick `main` and `/ (root)`.
3. Edit `_config.yml`. If your site address is `https://USER.github.io/REPO`, set `baseurl: "/REPO"`. For a user site or a custom domain, leave `baseurl` empty.

## Preview on your computer

```bash
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.

## What to edit

| To change | Edit |
| --- | --- |
| Server name, tagline, address, version, Discord, map link | `_config.yml` |
| Header navigation | `_data/navigation.yml` |
| Mod list | `_data/mods.yml` |
| Places on the Map page | `_data/locations.yml` |
| Lore chapters | files in `_lore/` |
| News posts | files in `_posts/` (named `YYYY-MM-DD-title.md`) |
| Rules and Join pages | `rules.md`, `join.md` |
| Home page text and "Where to start" links | the top of `index.html` |
| Colours and fonts | the two `:root` blocks at the top of `assets/css/main.css` |

## Adding a lore chapter

Create a file in `_lore/` with this at the top:

```yaml
---
title: The title of the chapter
order: 5
summary: One sentence shown on the Lore page.
---
```

`order` sets the chapter sequence and the previous/next links. Use `##` headings inside the chapter and an "On this page" list appears beside it.

## Writing helpers

Callout boxes: put `{: .callout}` (or `{: .callout .warn}`) on the line after a quote.

```markdown
> A note players should not miss.
{: .callout}
```

Numbered steps and numbered rules: put `{: .steps}` or `{: .rules}` on the line after an ordered list.

## Notes

- The default web map link is empty. Host your map somewhere (for example with a Vintage Story map mod), then set `server.map_url`.
- Fonts load from Google Fonts. Set `google_fonts: false` in `_config.yml` to use system serif fonts instead.
- The footer says the site isn't affiliated with the game's developer. Keep that or reword it, but don't imply an official connection.
