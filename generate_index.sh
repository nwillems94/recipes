#!/bin/bash

INDEX_FILE="index.html"
declare -A tags_map
declare -A letter_map

# Collect recipe data
for file in docs/*.md; do
  name="$(basename "$file" .md)"
  letter="${name:0:1}"
  letter_map["$letter"]=1

  # Extract tags from YAML front matter
  file_tags=$(awk '/^---/,/^---/' "$file" | grep '^- ' | sed 's/- //' | tr -d '\r')
  for tag in $file_tags; do
    tags_map["$tag"]=1
  done
done

# Start Jekyll-compatible HTML
cat <<EOF > "$INDEX_FILE"
---
layout: home
title: Recipe Index
---

<style>
  #searchBar { margin-bottom: 10px; padding: 5px; width: 300px; }
  .filter-group { margin-bottom: 10px; }
  button { margin: 2px; padding: 5px 10px; }
  .active { background-color: #007acc; color: white; border: none; }
</style>

<h1>Recipe Index</h1>
<input type="text" id="searchBar" onkeyup="filterRecipes()" placeholder="Search for recipes...">
<div class="filter-group" id="letterButtons">
EOF

# Alphabet buttons with data-letter
for letter in $(printf "%s\n" "${!letter_map[@]}" | sort); do
  echo "  <button class=\"letter-button\" data-letter=\"$letter\" onclick=\"filterByLetter('$letter')\">$letter</button>" >> "$INDEX_FILE"
done

# Tag buttons
echo "</div><div class=\"filter-group\" id=\"tagButtons\">" >> "$INDEX_FILE"
for tag in $(printf "%s\n" "${!tags_map[@]}" | sort); do
  echo "  <button class=\"tag-button\" data-tag=\"$tag\" onclick=\"filterByTag('$tag')\">$tag</button>" >> "$INDEX_FILE"
done

# Recipe list
echo "</div><ul id=\"recipeList\">" >> "$INDEX_FILE"
for file in $(ls docs/*.md | sort); do
  name="$(basename "$file" .md)"
  display_name="$(echo "$name" | sed 's/-/ /g; s/.*/\L&/; s/[a-z]*/\u&/g')"
  file_tags=$(awk '/^---/,/^---/' "$file" | grep '^- ' | sed 's/- //' | tr -d '\r' | paste -sd "," -)
  echo " <li data-name="$name" data-tags="$file_tags"><a href="docs/$name.html">$display_name</a></li>" >> "$INDEX_FILE"
done

# JavaScript
cat <<'EOF' >> "$INDEX_FILE"
</ul>
<script>
  let activeTag = null;
  let activeLetter = null;

  function filterRecipes() {
    const input = document.getElementById("searchBar").value.toLowerCase();
    const visibleLetters = new Set();

    document.querySelectorAll("#recipeList li").forEach(item => {
      const name = item.getAttribute("data-name").toLowerCase();
      const tags = item.getAttribute("data-tags");
      const matchesSearch = name.includes(input);
      const matchesTag = !activeTag || (tags && tags.includes(activeTag));
      const matchesLetter = !activeLetter || name.startsWith(activeLetter);
      const isVisible = matchesSearch && matchesTag && matchesLetter;

      item.style.display = isVisible ? "" : "none";

      if (matchesSearch && matchesTag) {
        visibleLetters.add(name.charAt(0).toUpperCase());
      }
    });

    document.querySelectorAll(".letter-button").forEach(button => {
      const letter = button.getAttribute("data-letter").toUpperCase();
      button.style.display = visibleLetters.has(letter) ? "" : "none";
      button.classList.toggle("active", activeLetter === letter);
    });

    document.querySelectorAll(".tag-button").forEach(button => {
      const tag = button.getAttribute("data-tag");
      button.classList.toggle("active", activeTag === tag);
    });
  }

  function filterByTag(tag) {
    activeTag = (activeTag === tag) ? null : tag;
    activeLetter = null;
    filterRecipes();
  }

  function filterByLetter(letter) {
    activeLetter = (activeLetter === letter) ? null : letter;
    filterRecipes();
  }
</script>
EOF

echo "✅ index.html has been generated with active filter highlighting."
