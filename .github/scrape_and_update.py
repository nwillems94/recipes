import re
from urllib.parse import urlparse
from urllib.request import urlopen
from recipe_scrapers import scrape_me, scrape_html, SCRAPERS
from filtered_links import LINKS_BY_FILE

def get_domain(url):
    return urlparse(url).netloc.replace("www.", "").lower()

def scrape_recipe(url):
    domain = get_domain(url)
    try:
        if domain in SCRAPERS.keys():
            scraper = scrape_me(url)
        else:
            html = urlopen(url).read().decode("utf-8")
            scraper = scrape_html(html, url, wild_mode=True)

        return {
            "title": scraper.title(),
            "servings": re.search(r"[\d.]+", str(scraper.yields())).group(0),
            "ingredients": scraper.ingredients(),
            "instructions": scraper.instructions()
        }
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return None

def format_ingredient_yaml(ingredients):
    def parse_ingredient(text):
        text = re.sub(r"\bpound(s?)\b", r"lb\1", text, flags=re.IGNORECASE)
        text = re.sub(r"\bounce(s?)\b", r"oz\1", text, flags=re.IGNORECASE)
        text = re.sub(r"\btablespoon(s?)\b", r"tbsp\1", text, flags=re.IGNORECASE)
        text = re.sub(r"\bteaspoon(s?)\b", r"tsp\1", text, flags=re.IGNORECASE)

        match = re.match(r"(?i)([\d\s/.]+)\s+(\w+)\s+(.*)", text)
        if match:
            quantity, unit, name = match.groups()
        else:
            quantity, unit, name = "", "", text

        return f"  - name: \"{name.strip()}\"\n    quantity: \"{quantity}\"\n    unit: \"{unit}\""

    return "\n".join(parse_ingredient(i) for i in ingredients)

def update_file(filepath, url, data):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    yaml_dict = {}
    yaml_match = re.match(r"(?s)^---\n(.*?)\n---\n(.*)", content)
    if yaml_match:
        yaml_text, _ = yaml_match.groups()
        yaml_lines = yaml_text.strip().splitlines()

        for line in yaml_lines:
            key, value = line.split(':', 1)
            yaml_dict[key.strip()] = value.strip()

    new_yaml = "---\n"
    new_yaml += f"title: {yaml_dict.get('title', data.get('title', 'Untitled'))}\n"
    new_yaml += f"layout: {yaml_dict.get('layout', 'recipe')}\n"
    new_yaml += f"servings: \"{data.get('servings', '2')}\"\n"
    new_yaml += "ingredients:\n" + format_ingredient_yaml(data["ingredients"]) + "\n"
    new_yaml += "---\n\n"

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_yaml)
        f.write(data["instructions"] + "\n\n")
        f.write(f"<{url}>\n")

for file, url in LINKS_BY_FILE.items():
    recipe = scrape_recipe(url)
    if recipe:
        update_file(file, url, recipe)