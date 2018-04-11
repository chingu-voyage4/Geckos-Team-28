function BuildHtmlArticles(inputArray, idName, className, appendTo) {

    $(appendTo).html("");
        
    // Generate HTML for every element in array
    $.each(inputArray, function(i, articleObject) {

        // If image doesn't exist, add placeholder
        var imageLink = articleObject.articleImageLink !== "" ? articleObject.articleImageLink : "../img/no-img-placeholder.png";

        // -- Start of build
        
        // build featured article container
        $('<div />', {
            id: idName + '-' + (i),
            class: className
        }).appendTo(appendTo);

        // build featured article child elements
        $('#' + idName + '-' + i).html('\
        <div class="article-container">\
            <div class="image-container">\
                <img src="' + imageLink + '" alt="Featured Article Image">\
            </div>\
            <div class="text-container">\
                <h3 class="article-heading">' + articleObject.articleHeading + '</h3>\
                <p class="article-summary">' + articleObject.articleSummary + '</p>\
                <div class="article-footer">\
                    <a class="article-author" href="' + articleObject.articleAuthorLink + '" target="_blank">' + articleObject.articleAuthorName + '</a>\
                </div>\
            </div>\
            <div class="article-button">\
                <a href="' + articleObject.articleLink + '" target="_blank">Go to article</a>\
            </div>\
        </div>\
        ');
        
        // --End of build

    });
}

function CheckForUpdates() {
    CheckForUpdatesUsers();
}