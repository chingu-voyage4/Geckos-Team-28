function GetLatestUsersArray() { // LATEST ARTICLES USERS TOGGLE

    // get JSON data
    $.getJSON("usersList.json", function(data) {
        var tempUserArray = [];

        // Calc variables
        var totalLatest = 0;
        var totalLatestTotal = data.usersLatestArticles.length;
            
        // Transfer articles from json to local array
        $.each(data.usersLatestArticles, function(i, user) {
            userObject = { 'enabled': true, 'user': user }
            tempUserArray.push(userObject);
            totalLatest++;
        });

        // if not equal, add missing users
        if(tempUserArray.length !== usersForLatestArticles.length) {
            console.log("Not equal");
            

            // Security check to check for duplicate users
            RemoveDuplicatedUsers()

            // Extend the array - will add 2nd array to 1st array, except duplicates
            $.extend(true, usersForLatestArticles, tempUserArray)

            // Save new array in chrome storage
            chrome.storage.sync.set({latestUsersArray: usersForLatestArticles});

        };

        // function to remove duplicated users
        function RemoveDuplicatedUsers() {
            // remove duplicates first
            $.each(usersForLatestArticles, function(i, user) {
                if(usersForLatestArticles.length-1 > i) {
                    if(user.user === usersForLatestArticles[i+1].user) {

                        // If duplicated user, remove..
                        usersForLatestArticles.splice(i, 1);
                    }
                }
            })
        };

        // When all articles are in local array, run function to convert to HTML
        if(totalLatestTotal == totalLatest) {
            addHtmlOptions(usersForLatestArticles);
        }
        
    });

    // Add settings for toggling users
    function addHtmlOptions(data) {
        
        $.each(data, function(i, userObject) {
            // -- Start of build
            console.log(userObject);
            
            
            // build user toggle container
            $('<li />', {
                id: 'toggle-latest-user-' + (i),
                class: 'toggle-user enabled',
            }).appendTo('.settings-page .container .disable-latest-articles-users ul');

            // build user toggle child elements
            $("#toggle-latest-user-" + i).html('\
            <p class="toggle-user-name" data-user-toggle="' + i + '">' + userObject.user + '</p>\
            ');
            
            // --End of build
        });
    };

    // enable / disable user
    // format required for appended elements
    $(document).on('click', '.toggle-user-name', function() {

        var  dataAttr = $(this).attr("data-user-toggle");

        // Switch between enabled / disabled
        var userObject = usersForLatestArticles[dataAttr];
        userObject.enabled == true ? userObject.enabled = false : userObject.enabled = true;

        // Save array with new toggle
        chrome.storage.sync.set({latestUsersArray: usersForLatestArticles});


    });


};

// END OF LATEST ARTICLES USERS TOGGLE