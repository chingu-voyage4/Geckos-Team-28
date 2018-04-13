/**
 * Builds HTML for all arrays (latest articles, featured articles, chingu resources)
 * 
 * The function is shared so all arrays has the same layout.
 * 
 * Function description:
 * 1: Clear the target HTML (prepare for new articles)
 * 2: Run a foreach to create HTML per article
 *  3: Decide whether the imagelink exists (if not, add placeholder)
 *  4: Create article container
 *  5: Append article-child elements to article container
 * 
 */
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
        <a href="' + articleObject.articleLink + '" target="_blank" class="article-container">\
            <div class="image-container">\
                <img src="' + imageLink + '" alt="Featured Article Image">\
            </div>\
            <div class="text-container">\
                <h3 class="article-heading">' + articleObject.articleHeading + '</h3>\
                <p class="article-summary">' + articleObject.articleSummary + '</p>\
                    <div class="article-footer">\
                        <p class="article-author">' + articleObject.articleAuthorName + '</p>\
                    </div>\
            </div>\
        </a>\
        ');
        
        // --End of build

    });
}

/**
 * Only runs once, when the extension (new tab) is opened
 * 
 * The function checks for updates where needed.
 * 
 * Function order:
 * 1: CheckForUpdatesUsers - Checks if there is any updated users (deprecated, changed..). This effects the latest-articles function
 * 
 */
function CheckForUpdates() {
    CheckForUpdatesUsers();
}