var usersForLatestArticles = [];

// Runs once on page load (load settings, get articles..)
chrome.storage.sync.get(['latestUsersArray'], function(result) {
    if(result.latestUsersArray != undefined) {
        usersForLatestArticles = result.latestUsersArray;
    }
    CheckForUpdates();
    ListColorThemes();
    // Run after timeout, so usersForLatestArticles has time to populate
    if(usersForLatestArticles.length == 0) {
        setTimeout(function() {
            RunLatestArticles();
        }, 1000);
    } else {
        RunLatestArticles();
    }
});

// Navigation events
$(".navpoint").click(function() {
    // If navbar is extended, close it..
    var toggleElement = $('.main-nav');

    if(toggleElement.hasClass('visible')) {
        
        toggleElement.removeClass('visible');
        toggleElement.addClass('collapsed');
    };
    
    // Change page
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
    }
});

// Hamburger menu
$('.menu').click(function() {
    var toggleElement = $('.main-nav');

    // Show navbar
    if(toggleElement.hasClass('collapsed')) {

        toggleElement.removeClass('collapsed');
        toggleElement.addClass('visible');

    } else { // Hide navbar

        toggleElement.removeClass('visible');
        toggleElement.addClass('collapsed');
    }
    
});