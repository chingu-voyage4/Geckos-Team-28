var storiesToSort = [];
var storiesNeedUpdate = false;

function RunLatestArticles() {

var totalRssCalls = usersForLatestArticles.length;
var rssCalls = 0;

    // Only run method once per program, or if it needs update
    if(storiesToSort.length == 0 ||	storiesNeedUpdate) {
        // Clear HTML, then build...
        ClearLatestArticles();

        $.each(usersForLatestArticles, function(i, userObject) {
            storiesNeedUpdate = false;
            GetRssFeeds(userObject);
        });
    }

    // Get single RSS feed based on username
    function GetRssFeeds(userObject) {
        if(userObject.enabled) {
            var data = {
                rss_url: 'https://medium.com/feed/@' + userObject.user // Feed URL
            };
            $.get('https://api.rss2json.com/v1/api.json', data, function (response) { // Get feed
            if (response.status == 'ok') {

                var user = response.feed;
                var stories = response.items;

                var userObject = { 'userData':user, 'userStories':stories };

                storiesToSort.push(userObject);

                rssCalls++;

            } else {
                console.log(response.message);
                rssCalls++;
            }

            if(rssCalls == totalRssCalls) { // Only call this function once all RSS Feeds are done
                SortUserStories();
            }

        });
        } else {
            rssCalls++;
        }
    }; // End of RSS feeds function


    // Sort users function
    function SortUserStories() {
        var sortedArray = [];

        $.each(storiesToSort, function(i, userObject) { // Loop through user objects - Userinfo + 10 latest stories

            $.each(userObject.userStories, function(j, userStory) {

                // Build object
                var articleImageLink = userStory.thumbnail;
                var articleHeading = userStory.title;
                var articleLink = userStory.link;
                var articleAuthorName = userStory.author;
                var articleAuthorLink = userObject.userData.link;
                var articleSummary = userStory.description;
                var articleDate = userStory.pubDate;

                // Check if the story has an image
                var storyHasImage = articleImageLink.match(/\.(jpeg|jpg|gif|png)$/) != null ? true : false;

                // Strip and truncate summary
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

                // If the story has an image, accept is as an article
                if(storyHasImage) {
                    // if sorted array is empty, insert object - first object always inserted
                    if(sortedArray.length == 0) {
                        sortedArray.push(storyObj);
                    }

                    else {
                        $.each(sortedArray, function(k, sortedStoryObject) {

                            // If date is bigger than current date, insert before..
                            if (new Date(storyObj.articleDate) > new Date(sortedStoryObject.articleDate)) { // no touchstory.pubDate: ', sortedStoryObject.story.pubDate);

                                sortedArray.splice(k, 0, storyObj);
                                return false; // break label - foreach

                                // if end of array, insert last
                            } else if(k == sortedArray.length-1) {
                                sortedArray.push(storyObj);
                                return false; // break label - foreach
                            }
                            
                        }); // end of for

                    } // end of else (sortedArray is not empty)

                } // end of if (article has image)
                
            }); // end of userStory
            
        }); // end of userObject
        
        // Run function to convert array to HTML
        BuildHtmlArticles(sortedArray, 'latest', 'article article-latest', '.latest-articles-page .container');
        // Clear stories array again
        storiesToSort = [];        
    }

    // Function to clear latest articles HTML (Used when re-populating latest articles)
    function ClearLatestArticles() {
        $(".latest-articles-page .container").html("");
    }

}