var featuredArticles = [];
function RunFeaturedArticles() {


    // Only run if array is empty (iteration 0)
    if(featuredArticles.length == 0) {

        // Get data from JSON
        $.getJSON("usersList.json", function(data) {

            // calculation variables
            var totalFeatured = data.featuredArticles.length;
            var totalArticlesTransfered = 0;
    
            // Transfer articles from json to local array
            $.each(data.featuredArticles, function(i, articleObject) {
                featuredArticles.push(articleObject);
                totalArticlesTransfered++;
            });
    
            // When all articles are in local array, run function to convert to HTML
            if(totalArticlesTransfered == totalFeatured) {
                BuildHtmlArticles(featuredArticles, 'featured', 'article article-featured', '.featured-articles-page .container');
            }
            
        });
    }

}