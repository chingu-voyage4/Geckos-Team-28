function RunLatestArticles() {

var users = usersForLatestArticles

var totalRssCalls = users.length;
var rssCalls = 0;

var storiesToSort = [];

    // Get RSS feeds functions
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
    };

    var test = 0;

    // Sort users
    function SortUserStories() {
        var sortedArray = [];

        storiesToSort.forEach(function(userObject) { // Loop through user objects - Userinfo + up to 10 stories
            
            userObject.userStories.forEach(function(userStory, i) { // Loop through stories - Individual story
                // var storyObj = { userData: userObject.userData, story: userStory };

                // Build object
                var articleImageLink = userStory.thumbnail;
                var articleHeading = userStory.title;
                var articleLink = userStory.link;
                var articleAuthorName = userStory.author;
                var articleAuthorLink = userObject.userData.link;
                var articleSummary = userStory.description;
                var articleDate = userStory.pubDate;

                var storyHasImage = articleImageLink.match(/\.(jpeg|jpg|gif|png)$/) != null ? true : false;

                // Strip and truncate summary
                var articleSummaryStripped = articleSummary.replace(/<(?:.|\n)*?>/gm, '');
                var articleSummaryTruncated = jQuery.trim(articleSummaryStripped)
                .substring(0, 700) + "...";

                var storyObj = {
                    'articleImageLink' : articleImageLink,
                    'articleHeading' : articleHeading,
                    'articleLink' : articleLink,
                    'articleAuthorName' : articleAuthorName,
                    'articleAuthorLink' : articleAuthorLink,
                    'articleSummary' : articleSummaryTruncated,
                    'articleDate' : articleDate,
                };

                if(storyHasImage) {
                    // if sorted array is empty, insert object - first object always inserted
                    if(sortedArray.length == 0) {
                        sortedArray.push(storyObj);
                    }

                    else {
                        sortStories: // Label for foreach
                        for(var j = 0; j < sortedArray.length; j++) {
                            var sortedStoryObject = sortedArray[j];

                            // If date is bigger than current date, insert before..
                            if (new Date(storyObj.articleDate) > new Date(sortedStoryObject.articleDate)) { // no touchstory.pubDate: ', sortedStoryObject.story.pubDate);

                                sortedArray.splice(j, 0, storyObj);
                                break sortStories; // break label - foreach

                                // if end of array, insert
                            } else if(j == sortedArray.length-1) {
                                sortedArray.push(storyObj);
                                break sortStories; // break label - foreach
                            }
                            
                        } // end of for

                    } // end of else (sortedArray is not empty)

                // end of if (article has image)
                }
                
            }); // end of userStory
            
        }); // end of userObject
        
        // Run function to convert array to HTML
        BuildHtmlArticles(sortedArray, 'latest', 'article article-latest', '.latest-articles-page .container');
        
    }

    users.forEach(function(userObject) { // Get RSS Feeds from all users
        GetRssFeeds(userObject);
    });
    
    




}





// https://medium.com/feed/@tropicalchancer