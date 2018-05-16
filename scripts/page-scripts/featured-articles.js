var featuredArticles = [];
function RunFeaturedArticles() {


    // Only run if array is empty (iteration 0)
    if(featuredArticles.length == 0) {

        // Get data from JSON
        $.getJSON("https://www.jasonbase.com/things/x7zZ.json", function(data) {

            var userObjects = data.featuredArticles.articlesBasedOnTitle;

            // calculation variables
            var totalFeatured = userObjects.length;
            var totalFeaturedCount = 0;

            // Get stories from user
            function GetStoriesFromUsers(user, title, amount) {
                var data = {
                    rss_url: 'https://medium.com/feed/@' + user // Feed URL
                };
                $.get('https://api.rss2json.com/v1/api.json', data, function (response) { // Get feed
                if (response.status == 'ok') {

                    // Generate the initial user object
                    var userObject = response.feed;
                    var stories = response.items;

                    // Counter for amount of stories found
                    var i = 0;
                    // Find stories based on title
                    $.each(stories, function(j, story) {
                        if (story.title.indexOf(title) >= 0) {

                            // Build article object
                            var articleImageLink = story.thumbnail;
                            var articleHeading = story.title;
                            var articleLink = story.link;
                            var articleAuthorName = story.author;
                            var articleAuthorLink = userObject.link;
                            var articleSummary = story.description;
                            var articleDate = story.pubDate;

                            // Strip and truncate summary on article object
                            var articleSummaryStripped = articleSummary.replace(/<(?:.|\n)*?>/gm, '');
                            var articleSummaryTruncated = jQuery.trim(articleSummaryStripped)
                            .substring(0, 700) + "...";

                            // Create storyobject (similar to usersList.json)
                            var storyObj = {
                                'articleImageLink' : articleImageLink,
                                'articleHeading' : articleHeading,
                                'articleLink' : articleLink,
                                'articleAuthorName' : articleAuthorName,
                                'articleAuthorLink' : articleAuthorLink,
                                'articleSummary' : articleSummaryTruncated,
                                'articleDate' : articleDate,
                            };

                            featuredArticles.push(storyObj);
                            i++;

                            // If amount is reached, jump out..
                            if(i === amount) {
                                return false;
                            }
                        }
                    });
    
                    totalFeaturedCount++;

                    // If RSS feed fails..
                    } else {
                        console.log(response.message);
                        totalFeaturedCount++;
                    }

                    // Only call this function once all RSS Feeds are done
                    if(totalFeaturedCount == totalFeatured) {
                        BuildHtmlArticles(featuredArticles, 'featured', 'article article-featured', '.featured-articles-page .container');
                    }
    
                });
            }; // End of RSS feeds function
    
            // Get RSS feed from users
            $.each(userObjects, function(i, userObject) {
                var user = userObject.user;
                var title = userObject.title;
                var amount = userObject.amount;

                GetStoriesFromUsers(user, title, amount);
            });
            
        });
    }

}