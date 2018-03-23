function RunFeaturedArticles() {
    // run code here
    console.log("Featured Articles JS running.");

    // Get story from username + id
    var storiesToGet = [
        {
            user: "tropicalchancer",
            storyId: "chingu-weekly-vol-53-661b522ba6e7"
        },
        {
            user: "tropicalchancer",
            storyId: "chingu-weekly-vol-52-c953e42c3468"
        },
        {
            user: "francesco.agnoletto",
            storyId: "one-year-as-a-remote-developer-28e9dfca2e24"
        }
    ];

    var totalRssCalls = storiesToGet.length;
    var rssCalls = 0;

    var featuredStories = [];

    function GetFeaturedStory(user, storyId) {
        var data = {
            rss_url: 'https://medium.com/feed/@' + user // Feed URL
        };
        $.get('https://api.rss2json.com/v1/api.json', data, function (response) { // Get feed
            if (response.status == 'ok') {

                var user = response.feed;
                var stories = response.items;

                // Find specific story
                $.each(stories, function(i, story) {
                    // if found
                    if(story.link.indexOf(storyId) >= 0) {
                        var storyObj = {user: user, story: story}
                        featuredStories.push(storyObj);
                    }

                });
                
                rssCalls++;

            } else {
                console.log(response.message);
                rssCalls++;
            }

            if(rssCalls == totalRssCalls) {
                Process();
            }

        });
    };

    function Process() {
        $.each(featuredStories, function(i, story) {
            console.log(story.story);
            
        })
    }

    $.each(storiesToGet, function(i, storiesInfo) {
        GetFeaturedStory(storiesInfo.user, storiesInfo.storyId);
    });
}