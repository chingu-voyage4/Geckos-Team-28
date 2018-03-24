function GetLatestUsersArray() {



    // get JSON data
    $.getJSON("usersList.json", function(data) {

        // Calc variables
        var totalLatest = 0;
        var totalLatestTotal = data.usersLatestArticles.length;

        if(usersLatestArticles.length == 0) {

            // Transfer articles from json to local array
            $.each(data.usersLatestArticles, function(i, user) {
                userObject = { 'user': user, 'enabled': true }
                usersLatestArticles.push(userObject);
                totalLatest++;
            });

        }
        

        // // When all articles are in local array, run function to convert to HTML
        if(totalLatestTotal == totalLatest) {
            addHtmlOptions(usersLatestArticles);
        }
        
    });

    // Add settings for toggling users
    function addHtmlOptions(data) {
        
        $.each(data, function(i, userObject) {
            // -- Start of build
            
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
    }

    // enable / disable user
    // format required for appended elements
    $(document).on('click', '.toggle-user-name', function() {
        var  dataAttr = $(this).attr("data-user-toggle");

        // Switch between enabled / disabled
        var userObject = usersLatestArticles[dataAttr];
        userObject.enabled == true ? userObject.enabled = false : userObject.enabled = true;

    });


}