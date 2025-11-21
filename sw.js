// repository name
var GHPATH = '/recipes';
 
// app prefix name
var APP_PREFIX = 'ghpr_';
 
// cache version, needs to be updated any time any of the local files change
var VERSION = 'version_00019';
 
// The files to make available for offline use
var URLS = [    
  "/recipes/",
  "/recipes/index.html",
  "/recipes/breakfast/pannekoeken.html",
  "/recipes/breakfast/smoked-salmon-dutch-baby.html",
  "/recipes/breakfast/sourdough-waffles.html",
  "/recipes/breakfast/banoffee-breakfast.html",
  "/recipes/breads/overnight-sourdough.html",
  "/recipes/breads/high-hydration-bread.html",
  "/recipes/breads/buns.html",
  "/recipes/breads/baguettes.html",
  "/recipes/breads/sheetpan-pizza.html",
  "/recipes/breads/flatbread.html",
  "/recipes/breads/raisin-bread.html",
  "/recipes/breads/naan.html",
  "/recipes/breads/sourdough-focaccia.html",
  "/recipes/breads/roti.html",
  "/recipes/breads/flour-tortillas.html",
  "/recipes/breads/rustic-bread.html",
  "/recipes/breads/pizza-dough.html",
  "/recipes/breads/quick-sourdough.html",
  "/recipes/breads/biga-bread.html",
  "/recipes/breads/prosciutto-bread.html",
  "/recipes/dinners/chicken-with-rosemary-sauce.html",
  "/recipes/dinners/vegetarain-pasta-e-fagioli.html",
  "/recipes/dinners/wonton.html",
  "/recipes/dinners/sloppy-joes.html",
  "/recipes/dinners/egg-rolls.html",
  "/recipes/dinners/avocado-tuna-salad.html",
  "/recipes/dinners/white-bean-bolognese.html",
  "/recipes/dinners/med-style-eggplant-pasta.html",
  "/recipes/dinners/crispy-feta-with-lemon-pepper-chicken-and-rice.html",
  "/recipes/dinners/ricotta.html",
  "/recipes/dinners/arugula-and-lemon-chicken-risotto.html",
  "/recipes/dinners/tortilla-soup-slow-cooker.html",
  "/recipes/dinners/one-pot-broccoli-mac-n-cheese.html",
  "/recipes/dinners/baked-chicken.html",
  "/recipes/dinners/spaghetti-bolognese.html",
  "/recipes/dinners/onigiri.html",
  "/recipes/dinners/avocado-egg-salad.html",
  "/recipes/dinners/one-pot-veggie-orzo.html",
  "/recipes/dinners/braised-short-ribs.html",
  "/recipes/dinners/one-pot-lemon-ricotta-pasta.html",
  "/recipes/dinners/aloo-gobi.html",
  "/recipes/dinners/pickles.html",
  "/recipes/dinners/cóctel-de-camarón.html",
  "/recipes/dinners/salmon-sheet-pan-with-broccolini-and-potatoes.html",
  "/recipes/dinners/balsamic-chicken-slow-cooker.html",
  "/recipes/dinners/slow-cooked-ribs.html",
  "/recipes/dinners/baked-feta-pasta.html",
  "/recipes/dinners/sheet-pan-steak-fajitas.html",
  "/recipes/dinners/tuna-confit.html",
  "/recipes/dinners/pulled-pork-slow-cooker.html",
  "/recipes/dinners/ginger-dill-salmon-salad.html",
  "/recipes/dinners/chicken-wings.html",
  "/recipes/dinners/wilted-romaine.html",
  "/recipes/dinners/spicy-shrimp-tacos.html",
  "/recipes/dinners/sambal-noodles.html",
  "/recipes/dinners/hot-and-sour-soup.html",
  "/recipes/dinners/fall-harvest-salad.html",
  "/recipes/dinners/black-bean-soup-gf.html",
  "/recipes/dinners/anyday-salmon-bowl.html",
  "/recipes/dinners/carnitas.html",
  "/recipes/dinners/doro-wat.html",
  "/recipes/dinners/cheesy-green-chile-and-avocado-rice-quesadillas.html",
  "/recipes/dinners/cold-noodles.html",
  "/recipes/dinners/microwave-mapotofu.html",
  "/recipes/dinners/hearty-tortellini-soup.html",
  "/recipes/dinners/grilled-corn-salad.html",
  "/recipes/dinners/mushroom-bourguignon.html",
  "/recipes/dinners/black-bean-burgers.html",
  "/recipes/dinners/easy-scalloped-potatoes.html",
  "/recipes/dinners/garlic-lemon-mahi-mahi.html",
  "/recipes/dinners/chicken-with-sundried-tomato-sauce.html",
  "/recipes/dinners/loaded-potato-soup-slow-cooker.html",
  "/recipes/dinners/falafel.html",
  "/recipes/dinners/healthier-pasta-carbonara.html",
  "/recipes/dinners/garlic-confit-pasta.html",
  "/recipes/dinners/miso-black-beans.html",
  "/recipes/sauces/tomato-sauce.html",
  "/recipes/sauces/simple-noodle-sauce.html",
  "/recipes/sauces/ginger-miso-dressing.html",
  "/recipes/sauces/roasted-corn-salsa-verde.html",
  "/recipes/sauces/pesto.html",
  "/recipes/sauces/hummus.html",
  "/recipes/sauces/garlic-cream-sauce.html",
  "/recipes/sauces/tomatillo-salsa.html",
  "/recipes/sauces/balsamic-vinaigrette.html",
  "/recipes/desserts/chocolate-chip-cookies.html",
  "/recipes/desserts/lemon-bars-with-pistachio-crust.html",
  "/recipes/desserts/cinnamon-sugar-bread.html",
  "/recipes/desserts/carrot-cake.html",
  "/recipes/desserts/avocado-pudding.html",
  "/recipes/desserts/brown-butter-cookies.html",
  "/recipes/desserts/pumpkin-cheesecake-roll.html",
  "/recipes/desserts/frozen-banana-whip.html",
  "/recipes/desserts/blueberry-cobbler.html",
  "/recipes/desserts/cinnamon-sugar-roasted-almonds.html",
  "/recipes/desserts/lemon-posset.html",
  "/recipes/desserts/advokaat.html",
  "/recipes/desserts/horchata.html",
  "/recipes/desserts/sweet-potato-brownies.html",
  "/recipes/cocktails/olive-oil-basil-limoncello-sour.html",
  "/recipes/cocktails/pomegranate-margarita.html",
  "/recipes/cocktails/skinny-jalapeño-margarita.html",
  "/recipes/cocktails/spicy-pineapple-topo-margarita.html",
  "/recipes/cocktails/frozen-mango-margarita.html",
  "/recipes/cocktails/carine-s-margaritas.html",
  "/recipes/cocktails/campari-old-fashioned.html"
]

var CACHE_NAME = APP_PREFIX + VERSION
self.addEventListener('fetch', function (e) {
  console.log('Fetch request : ' + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { 
        console.log('Responding with cache : ' + e.request.url);
        return request
      } else {       
        console.log('File is not cached, fetching : ' + e.request.url);
        return fetch(e.request)
      }
    })
  )
})

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Installing cache : ' + CACHE_NAME);
      return cache.addAll(URLS)
    })
  )
})

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      cacheWhitelist.push(CACHE_NAME);
      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('Deleting cache : ' + keyList[i] );
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})
