#!/bin/bash

INDEX_FILE="index.html"
declare -A letter_map

# Collect recipe data
for file in docs/*.md; do
  name="$(basename "$file" .md)"
  letter="${name:0:1}"
  letter_map["$letter"]=1
done

# Start Jekyll-compatible HTML
cat <<EOF > "$INDEX_FILE"
---
layout: home
title: Recipe Index
---

<h1>Recipe Index</h1>
<div class="filter-group" id="letterButtons">
EOF

# Alphabet buttons with data-letter
for letter in $(printf "%s\n" "${!letter_map[@]}" | sort); do
  echo "  <button class=\"letter-button\" data-letter=\"$letter\" onclick=\"filterByLetter('$letter')\">$letter</button>" >> "$INDEX_FILE"
done


# Recipe list
echo "</div><ul id=\"recipeList\">" >> "$INDEX_FILE"
for file in $(ls docs/*.md | sort); do
  name="$(basename "$file" .md)"
  display_name="$(echo "$name" | sed 's/-/ /g; s/.*/\L&/; s/[a-z]*/\u&/g')"
  echo " <li data-name="$name"><a href="docs/$name.html">$display_name</a></li>" >> "$INDEX_FILE"
done

# JavaScript
cat <<'EOF' >> "$INDEX_FILE"
</ul>
<script>
  let activeLetter = null;

  function filterRecipes() {
    const visibleLetters = new Set();

    document.querySelectorAll("#recipeList li").forEach(item => {
      const name = item.getAttribute("data-name").toLowerCase();
      const matchesLetter = !activeLetter || name.startsWith(activeLetter);
      const isVisible = matchesLetter;

      item.style.display = isVisible ? "" : "none";
    });

    document.querySelectorAll(".letter-button").forEach(button => {
      const letter = button.getAttribute("data-letter").toUpperCase();
      button.style.display = visibleLetters.has(letter) ? "" : "none";
      button.classList.toggle("active", activeLetter === letter);
    });

  }

  function filterByLetter(letter) {
    activeLetter = (activeLetter === letter) ? null : letter;
    filterRecipes();
  }
</script>
EOF

echo "✅ index.html has been generated with active filter highlighting."
