#!/bin/bash

INDEX_FILE="index.html"
declare -A letter_map
declare -A recipe_tags

# Collect recipe data and map letters
for file in $(ls content/_*/*.md | sort -t/ -k3); do
  name="$(basename "$file" .md)"
  letter="${name:0:1}"
  letter_map["$letter"]=1
  
  # Extract tags from YAML front matter
  tags_line="$(sed -n 's/^tags: \(.*\)$/\1/p' $file)"
  if [ -n "$tags_line" ]; then
    recipe_tags["$name"]="$tags_line"
  fi
done

# Start Jekyll-compatible HTML
cat <<EOF > "$INDEX_FILE"
---
layout: home
title: Recipe Index
nav_exclude: true
search_exclude: true
---

<h1>Recipe Index</h1>

<div class="tag-legend" style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center;">
  <span>🧪 Testing</span>
  <span>🚧 Needs work</span>
  <span>⭐ Tried & true</span>
</div>

<div class="filter-group" id="letterButtons" style="text-wrap: balance; text-align: center;">
EOF

# Alphabet buttons with data-letter
for letter in $(printf "%s\n" "${!letter_map[@]}" | sort); do
  echo "  <button class=\"letter-button\" data-letter=\"$letter\" onclick=\"filterByLetter('$letter')\" style=\"display: inline-block;\">$letter</button>" >> "$INDEX_FILE"
done

# Recipe list
echo "</div><ul id=\"recipeList\">" >> "$INDEX_FILE"
for file in $(ls content/_*/*.md | sort -t/ -k3); do
  name="$(basename "$file" .md)"
  short_path="${file#content/_}"
  short_path="${short_path%.md}.html"
  display_name="$(sed -n 's/title: "\(.*\)"/\1/p' $file)"
  if [ -z "$display_name" ]; then
    display_name="$(echo "$name" | sed 's/-/ /g; s/.*/\L&/; s/[a-z]*/\u&/g')"
  fi
  
  # Get tags for this recipe
  recipe_tag="${recipe_tags[$name]:-}"
  if [ -n "$recipe_tag" ]; then
    echo " <li data-name="$name" style=\"list-style-type: none;\"><a href="$short_path">$recipe_tag  $display_name</a></li>" >> "$INDEX_FILE"
  else
    echo " <li data-name="$name"><a href="$short_path">$display_name</a></li>" >> "$INDEX_FILE"
  fi
done

# JavaScript
cat <<'EOF' >> "$INDEX_FILE"
</ul>
<script>
  let activeLetter = null;

  function filterRecipes() {
    document.querySelectorAll("#recipeList li").forEach(item => {
      const name = item.getAttribute("data-name").toLowerCase();
      const matchesLetter = !activeLetter || name.startsWith(activeLetter);
      item.style.display = matchesLetter ? "" : "none";
    });

    document.querySelectorAll(".letter-button").forEach(button => {
      const letter = button.getAttribute("data-letter").toUpperCase();
      button.classList.toggle("active", activeLetter === letter);
    });
  }

  function filterByLetter(letter) {
    activeLetter = (activeLetter === letter) ? null : letter;
    filterRecipes();
  }
</script>

<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    const swUrl = '{{ "/sw.js" | relative_url }}';
    navigator.serviceWorker.register(swUrl).then(reg => {
      console.log('Service worker registered.', reg);
    }).catch(err => console.error('Service worker registration failed:', err));
  });
}
</script>

EOF

echo "✅ index.html has been generated with active filter highlighting."
