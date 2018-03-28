function BuildHtmlArticles(inputArray, idName, className, appendTo) {
        
    // Generate HTML for every element in array
    $.each(inputArray, function(i, articleObject) {


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
                <img src="' + articleObject.articleImageLink + '" alt="Featured Article Image">\
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