// repository name
var GHPATH = '/recipes';
 
// app prefix name
var APP_PREFIX = 'ghpr_';
 
// cache version, needs to be updated any time any of the local files change
var VERSION = 'version_00007';
 
// The files to make available for offline use
var URLS = [    
  "/recipes/",
  "/recipes/index.html",
  "/recipes/_breakfast/pannekoeken.html",
  "/recipes/_breakfast/smoked-salmon-dutch-baby.html",
  "/recipes/_breakfast/sourdough-waffles.html",
  "/recipes/_breakfast/banoffee-breakfast.html",
  "/recipes/_breads/overnight-sourdough.html",
  "/recipes/_breads/high-hydration-bread.html",
  "/recipes/_breads/buns.html",
  "/recipes/_breads/baguettes.html",
  "/recipes/_breads/sheetpan-pizza.html",
  "/recipes/_breads/flatbread.html",
  "/recipes/_breads/raisin-bread.html",
  "/recipes/_breads/naan.html",
  "/recipes/_breads/sourdough-focaccia.html",
  "/recipes/_breads/roti.html",
  "/recipes/_breads/flour-tortillas.html",
  "/recipes/_breads/rustic-bread.html",
  "/recipes/_breads/pizza-dough.html",
  "/recipes/_breads/quick-sourdough.html",
  "/recipes/_breads/biga-bread.html",
  "/recipes/_breads/prosciutto-bread.html",
  "/recipes/_dinners/chicken-with-rosemary-sauce.html",
  "/recipes/_dinners/vegetarain-pasta-e-fagioli.html",
  "/recipes/_dinners/wonton.html",
  "/recipes/_dinners/sloppy-joes.html",
  "/recipes/_dinners/egg-rolls.html",
  "/recipes/_dinners/avocado-tuna-salad.html",
  "/recipes/_dinners/white-bean-bolognese.html",
  "/recipes/_dinners/med-style-eggplant-pasta.html",
  "/recipes/_dinners/crispy-feta-with-lemon-pepper-chicken-and-rice.html",
  "/recipes/_dinners/ricotta.html",
  "/recipes/_dinners/arugula-and-lemon-chicken-risotto.html",
  "/recipes/_dinners/tortilla-soup-slow-cooker.html",
  "/recipes/_dinners/one-pot-broccoli-mac-n-cheese.html",
  "/recipes/_dinners/baked-chicken.html",
  "/recipes/_dinners/spaghetti-bolognese.html",
  "/recipes/_dinners/onigiri.html",
  "/recipes/_dinners/avocado-egg-salad.html",
  "/recipes/_dinners/one-pot-veggie-orzo.html",
  "/recipes/_dinners/braised-short-ribs.html",
  "/recipes/_dinners/one-pot-lemon-ricotta-pasta.html",
  "/recipes/_dinners/aloo-gobi.html",
  "/recipes/_dinners/pickles.html",
  "/recipes/_dinners/cóctel-de-camarón.html",
  "/recipes/_dinners/salmon-sheet-pan-with-broccolini-and-potatoes.html",
  "/recipes/_dinners/balsamic-chicken-slow-cooker.html",
  "/recipes/_dinners/slow-cooked-ribs.html",
  "/recipes/_dinners/baked-feta-pasta.html",
  "/recipes/_dinners/sheet-pan-steak-fajitas.html",
  "/recipes/_dinners/tuna-confit.html",
  "/recipes/_dinners/pulled-pork-slow-cooker.html",
  "/recipes/_dinners/ginger-dill-salmon-salad.html",
  "/recipes/_dinners/chicken-wings.html",
  "/recipes/_dinners/wilted-romaine.html",
  "/recipes/_dinners/spicy-shrimp-tacos.html",
  "/recipes/_dinners/sambal-noodles.html",
  "/recipes/_dinners/hot-and-sour-soup.html",
  "/recipes/_dinners/fall-harvest-salad.html",
  "/recipes/_dinners/black-bean-soup-gf.html",
  "/recipes/_dinners/anyday-salmon-bowl.html",
  "/recipes/_dinners/carnitas.html",
  "/recipes/_dinners/doro-wat.html",
  "/recipes/_dinners/cheesy-green-chile-and-avocado-rice-quesadillas.html",
  "/recipes/_dinners/cold-noodles.html",
  "/recipes/_dinners/microwave-mapotofu.html",
  "/recipes/_dinners/hearty-tortellini-soup.html",
  "/recipes/_dinners/grilled-corn-salad.html",
  "/recipes/_dinners/mushroom-bourguignon.html",
  "/recipes/_dinners/black-bean-burgers.html",
  "/recipes/_dinners/easy-scalloped-potatoes.html",
  "/recipes/_dinners/garlic-lemon-mahi-mahi.html",
  "/recipes/_dinners/chicken-with-sundried-tomato-sauce.html",
  "/recipes/_dinners/loaded-potato-soup-slow-cooker.html",
  "/recipes/_dinners/falafel.html",
  "/recipes/_dinners/healthier-pasta-carbonara.html",
  "/recipes/_dinners/garlic-confit-pasta.html",
  "/recipes/_dinners/miso-black-beans.html",
  "/recipes/_sauces/tomato-sauce.html",
  "/recipes/_sauces/simple-noodle-sauce.html",
  "/recipes/_sauces/ginger-miso-dressing.html",
  "/recipes/_sauces/roasted-corn-salsa-verde.html",
  "/recipes/_sauces/pesto.html",
  "/recipes/_sauces/hummus.html",
  "/recipes/_sauces/garlic-cream-sauce.html",
  "/recipes/_sauces/tomatillo-salsa.html",
  "/recipes/_sauces/balsamic-vinaigrette.html",
  "/recipes/_desserts/chocolate-chip-cookies.html",
  "/recipes/_desserts/lemon-bars-with-pistachio-crust.html",
  "/recipes/_desserts/cinnamon-sugar-bread.html",
  "/recipes/_desserts/carrot-cake.html",
  "/recipes/_desserts/avocado-pudding.html",
  "/recipes/_desserts/brown-butter-cookies.html",
  "/recipes/_desserts/pumpkin-cheesecake-roll.html",
  "/recipes/_desserts/frozen-banana-whip.html",
  "/recipes/_desserts/blueberry-cobbler.html",
  "/recipes/_desserts/cinnamon-sugar-roasted-almonds.html",
  "/recipes/_desserts/lemon-posset.html",
  "/recipes/_desserts/advokaat.html",
  "/recipes/_desserts/horchata.html",
  "/recipes/_desserts/sweet-potato-brownies.html",
  "/recipes/_cocktails/olive-oil-basil-limoncello-sour.html",
  "/recipes/_cocktails/pomegranate-margarita.html",
  "/recipes/_cocktails/skinny-jalapeño-margarita.html",
  "/recipes/_cocktails/spicy-pineapple-topo-margarita.html",
  "/recipes/_cocktails/frozen-mango-margarita.html",
  "/recipes/_cocktails/carine-s-margaritas.html",
  "/recipes/_cocktails/campari-old-fashioned.html"
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
