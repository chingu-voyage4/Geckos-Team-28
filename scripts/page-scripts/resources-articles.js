var chinguResourcesArticles = [];
function RunChinguResources() {

    // Only run if array is empty (iteration 0)
    if(chinguResourcesArticles.length == 0) {

        // Get data from JSON
        $.getJSON("https://www.jasonbase.com/things/x7zZ.json", function(data) {

            // calculation variables
            var totalFeatured = data.chinguResourcesArticles.length;
            var totalArticlesTransfered = 0;
    
            // Transfer articles from json to local array
            $.each(data.chinguResourcesArticles, function(i, articleObject) {
                chinguResourcesArticles.push(articleObject);
                totalArticlesTransfered++;
            });
    
            // When all articles are in local array, run function to convert to HTML
            if(totalArticlesTransfered == totalFeatured) {
                BuildHtmlArticles(chinguResourcesArticles, 'chingu-resource', 'article article-resource', '.chingu-resources-page .container');
            }
            
        });
    }
}