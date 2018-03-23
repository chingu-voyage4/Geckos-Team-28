var featuredArticles = [];
function RunFeaturedArticles() {


    
    // Get data from JSON
    if(featuredArticles.length == 0) {
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
                HandleFeaturedArticles();
            }
            
            
        });
    }

    // Converts data to HTML
    function HandleFeaturedArticles() {
        $.each(featuredArticles, function(i, articleObject) {
            console.log(articleObject);
            
            // build featured article container
            $('<div />', {
                id: 'featured-' + (i),
                class: 'article article-featured'
            }).appendTo('.featured-articles-page .container');

            // build featured article child elements
            $("#featured-" + i).html('\
            <div class="article-container">\
                <div class="image-container">\
                    <img src="' + articleObject.articleImageLink + '" alt="Featured Article Image">\
                </div>\
                <div class="text-container">\
                    <h3 class="article-heading">' + articleObject.articleHeading + '</h3>\
                    <p class="article-summary">' + articleObject.articleSummary + '</p>\
                    <div class="article-footer">\
                        <a href="' + articleObject.articleAuthorLink + '" target="_blank">' + articleObject.articleAuthorName + '</a>\
                    </div>\
                </div>\
                <div class="article-button">\
                    <a href="' + articleObject.articleLink + '" target="_blank">Go to article</a>\
                </div>\
            </div>\
            ');

        });
    }

}