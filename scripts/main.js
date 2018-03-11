console.log("script ready. over.");

// Initial click handlers
$("#latest-articles-navpoint").click(function() {
    RunLatestArticles();
})

$("#featured-articles-navpoint").click(function() {
    RunFeaturedArticles();
})

$("#chingu-resources-navpoint").click(function() {
    RunChinguResources();
})