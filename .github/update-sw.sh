#!/bin/bash

set -e

GHPATH="/recipes"
APP_PREFIX="ghpr_"

# Extract and increment VERSION
LAST_VERSION=$(grep "var VERSION" sw.js | sed -E "s/.*'version_([0-9]+)'.*/\1/")
NEW_VERSION=$(printf "%05d" $((10#$LAST_VERSION + 1)))
VERSION="version_${NEW_VERSION}"

# Generate new URL list
URLS=()
while IFS= read -r file; do
    html_path="${file%.md}.html"
    URLS+=("  \"${GHPATH}/${html_path#content/_}\"")
done < <(find content/_*/*.md')

# Format URLS block
URLS_BLOCK=$(printf "%s,\n" "${URLS[@]}")
URLS_BLOCK="  \"${GHPATH}/\",\n  \"${GHPATH}/index.html\",\n${URLS_BLOCK%?}"

# Replace VERSION
sed -i -E "s/(var VERSION = ')[^']+(';)/\1${VERSION}\2/" sw.js

# Replace URLS block (between var URLS = [ and ])
awk -v urls="$URLS_BLOCK" '
    BEGIN { print_urls = 0 }
    /var URLS = \[/ { print; print_urls = 1; next }
    print_urls && /\]/ { print urls; print; print_urls = 0; next }
    !print_urls { print }
' sw.js > sw.tmp && mv sw.tmp sw.js


echo "✅ sw.js updated to ${VERSION}"
