console.log("script ready. over.");

// Initial click handlers


// $("#latest-articles-navpoint").click(function() {
//     $(".page").removeClass("selected");
//     RunLatestArticles();
// })

// $("#featured-articles-navpoint").click(function() {
//     $(".page").removeClass("selected");
//     RunFeaturedArticles();
// })

// $("#chingu-resources-navpoint").click(function() {
//     RunChinguResources();
// })

$(".navpoint").click(function() {
    var clickedElement = $(this);
    var page = clickedElement.attr("data-page-navpoint");
    $(".page").removeClass("selected");

    if(page == "latest-articles-page") {
        $(".latest-articles-page").addClass("selected");
        RunLatestArticles();

    } else if(page == "featured-article-page") {
        $(".featured-articles-page").addClass("selected");
        RunFeaturedArticles();

    } else if(page == "chingu-resources-page") {
        $(".chingu-resources-page").addClass("selected");
        RunChinguResources();

    } else if(page == "settings-page") {
        $(".settings-page").addClass("selected");
        RunChinguResources();

    }
})