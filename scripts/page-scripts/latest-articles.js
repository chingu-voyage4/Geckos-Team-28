function RunLatestArticles() {

var users = [ "francesco.agnoletto", "P1xt", "tropicalchancer", "jdmedlock" ]; // pre-defined users

var totalRssCalls = users.length;
var rssCalls = 0;

var storiesToSort = [];

    // Get RSS feeds functions
    function GetRssFeeds(user) {
        var data = {
            rss_url: 'https://medium.com/feed/@' + user // Feed URL
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
    };

    var test = 0;

    // Sort users
    function SortUserStories() {
        var sortedArray = [];

        storiesToSort.forEach(function(userObject) { // Loop through user objects - Userinfo + up to 10 stories
            
            userObject.userStories.forEach(function(userStory, i) { // Loop through stories - Individual story
                var storyObj = { userData: userObject.userData, story: userStory };

                // if sorted array is empty, insert object - first object always inserted
                if(sortedArray.length == 0) {
                    sortedArray.push(storyObj);
                }

                else {
                    // -- CODE DOES NOT WORK, KEPT AS EXAMPLE

                    // sortedArray.forEach(function(sortedStoryObject, j) {                       
                    //     if (new Date(storyObj.story.pubDate) > new Date(sortedStoryObject.story.pubDate)) { // no touchstory.pubDate: ', sortedStoryObject.story.pubDate);

                    //         sortedArray.splice(j, 0, storyObj);
                    //         return false;

                    //     } else if(j == sortedArray.length-1) {
                    //         sortedArray.push(storyObj);
                    //         return false;;
                    //     }

                    // });

                    sortStories: // Label for foreach
                    for(var j = 0; j < sortedArray.length; j++) {
                        var sortedStoryObject = sortedArray[j];

                        // If date is bigger than current date, insert before..
                        if (new Date(storyObj.story.pubDate) > new Date(sortedStoryObject.story.pubDate)) { // no touchstory.pubDate: ', sortedStoryObject.story.pubDate);

                            sortedArray.splice(j, 0, storyObj);
                            break sortStories; // break label - foreach

                            // if end of array, insert
                        } else if(j == sortedArray.length-1) {
                            sortedArray.push(storyObj);
                            break sortStories; // break label - foreach
                        }
                        
                    } // end of for

                } // end of else
                
            }); // end of userStory
            
        }); // end of userObject
        
        RunAfterSort(sortedArray);
        
    }

    // gets an array of storyObjects - userData + story
    function RunAfterSort(array) {
        array.forEach(function(storyObject) {
            console.log(storyObject);
        });
    }


    users.forEach(function(user) { // Get RSS Feeds from all users
        GetRssFeeds(user);
    });
    
    




}





// https://medium.com/feed/@tropicalchancer