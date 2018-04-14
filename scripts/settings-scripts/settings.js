function GetLatestUsersArray() { // LATEST ARTICLES USERS TOGGLE
    addHtmlOptions(usersForLatestArticles);

    // Add HTML elements (buttons) - one per user
    function addHtmlOptions(data) {
        $.each(data, function(i, userObject) {
            // -- Start of build

            var toggled = userObject.enabled === true ? 'enabled' : 'disabled';
            
            // build user toggle container
            $('<li />', {
                id: 'toggle-latest-user-' + (i),
                class: 'toggle-user ' + toggled
            }).appendTo('.settings-page .container .disable-latest-articles-users ul');

            // build user toggle child elements
            $("#toggle-latest-user-" + i).html('\
            <p class="toggle-user-name" data-user-toggle="' + i + '">' + userObject.user + '</p>\
            ');
            
            // --End of build
        });

        // enable / disable user on click
        $(document).on('click', '.toggle-user-name', function() {

            var  dataAttr = $(this).attr("data-user-toggle");
            var newToggle = "";

            // Switch between enabled / disabled
            var userObject = usersForLatestArticles[dataAttr];
            if(userObject.enabled) {
                userObject.enabled = false;
                newToggle = 'disabled';
            }
            else {
                userObject.enabled = true;
                newToggle = 'enabled';
            }

            $(this).closest("li").removeClass("enabled disabled");
            $(this).closest("li").addClass(newToggle);


            // Save array with new toggle
            chrome.storage.sync.set({latestUsersArray: usersForLatestArticles});
            storiesNeedUpdate = true;
        });
    };

};
// END OF LATEST ARTICLES USERS TOGGLE

// LIST COLOR THEMES
function ListColorThemes() {
    // List of color themes
    var colorThemes = [
        {
            'name': 'Dark Night (default)',
            'class': 'c-theme-1',
            'primary-color': '#394C5F',
            'secondary-color': '#CFD8DC'
        },
        {
            'name': 'Dark Blossom',
            'class': 'c-theme-2',
            'primary-color': '#355c7d',
            'secondary-color': '#e0b8c3'
        },
        {
            'name': "80's Vibe",
            'class': 'c-theme-3',
            'primary-color': '#43C6AC',
            'secondary-color': '#F8FFAE'
        }
    ];

    // Build HTML (color themes)
    $.each(colorThemes, function(i, colorTheme) {

        // build color theme HTML container
        $('<li />', {
            id: 'color-theme-selector-' + (i),
            class: 'color-theme-selector'
        }).appendTo('.settings-page .container .color-themes-selector ul');

        // build user toggle child elements
        $("#color-theme-selector-" + i).html('\
        <div class="toggle-color-theme" data-class="' + i + '">\
            <p>' + colorTheme.name + '</p>\
        </div>\
        ');
    });

    // Load saved color theme (chrome storage)
    chrome.storage.sync.get(['colorTheme'], function(result) {
        if(result != undefined) {
            ChangeColorTheme(result.colorTheme);
        }
    });

    // Change css variable on click
    $('.toggle-color-theme').click(function() {
        var e = $(this);
        var i = e.attr('data-class');
        var colorTheme = colorThemes[i];

        // Save color theme
        chrome.storage.sync.set({colorTheme: colorTheme});

        // change color theme (css)
        ChangeColorTheme(colorTheme);
    });

    function ChangeColorTheme(colorTheme) {
        // Change CSS variables
        const body = document.querySelector('body');
        body.style.setProperty('--c_theme_primary', colorTheme["primary-color"]);
        body.style.setProperty('--c_theme_secondary', colorTheme["secondary-color"]);
    }
    
}


// SINGLE-RUN FUNCTION - Runs once per page load
// Check if there's new users
function CheckForUpdatesUsers() {
    /**
     * This script check for  updated users, for the latest-users toggle in the settings-page.
     * The script will compare a new array of users with the existing array.
     * If the arrays are different, the old array will be updated
     * 
     * Function description:
     * 1: Make a new user array from RSS Feed
     * 2: Compare length of arrays to see if new users are added / removed
     *  3: Compare individual array items to see if users have been replaced
     * 4: Run script to add HTML
     */
     
    // get JSON data
    $.getJSON("usersList.json", function(data) {
        var tempUserArray = [];

        // Calculation variables
        var currentUsersCount = 0;
        var totalUsersCount = data.usersLatestArticles.length;
            
        // 1: Transfer articles from json to local array
        $.each(data.usersLatestArticles, function(i, user) {
            userObject = { 'enabled': true, 'user': user }
            tempUserArray.push(userObject);
            currentUsersCount++;
        });

        // 2: if not equal, add missing users
        if(tempUserArray.length !== usersForLatestArticles.length) {

            // Extend the array - will add 2nd array to 1st array, except duplicates
            usersForLatestArticles = tempUserArray;

            // Save new array in chrome storage
            chrome.storage.sync.set({latestUsersArray: usersForLatestArticles});
        } else {
            // 3: Compare individual user objects
            $.each(usersForLatestArticles, function(i, user) {
                if(user.user !== tempUserArray[i].user) {
                    
                    usersForLatestArticles[i] = tempUserArray[i];
                }
            });

            // Save new array in chrome storage
            chrome.storage.sync.set({latestUsersArray: usersForLatestArticles});
        }

        // 4: When update function is done, run main function..
        if(totalUsersCount == currentUsersCount) {
            GetLatestUsersArray();
        }
        
    });
    // End of JSON call
}