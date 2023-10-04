function setButtonColor(clickedButtonId) {
    const buttons = ["addRemoveLayerBtn", "mappWidgetBtn"];

    // Loop through the buttons
    buttons.forEach(buttonId => {
        const button = document.getElementById(buttonId);

        if (buttonId === clickedButtonId) {
            // If the current button in the loop is the clicked button, set it to teal
            button.classList.remove('btn-white');
            button.classList.add('btn-teal');
        } else {
            // Otherwise, set it to white
            button.classList.remove('btn-teal');
            button.classList.add('btn-white');
        }
    });
}

function populateInterfaceWithUrls() {
    var interfaceColumn = document.getElementById('interfaceColumn');
    interfaceColumn.innerHTML = '';

    var accordionDiv = document.createElement('div');
    accordionDiv.id = 'accordion';

    var groupedUrls = groupUrlsByThirdToLast(urlsFromDjango);

    for (var group in groupedUrls) {
        // Add group header
        var groupHeader = document.createElement('h3');
        groupHeader.textContent = group;
        accordionDiv.appendChild(groupHeader);

        // Content div for this group
        var contentDiv = document.createElement('div');
        var urlList = document.createElement('ul');

        groupedUrls[group].forEach(function (url) {
            var listItem = document.createElement('li');
            listItem.innerHTML = '<a href="' + url + '" target="_blank">' + url.split('/').slice(-2, -1)[0] + '</a>';
            urlList.appendChild(listItem);
        });

        contentDiv.appendChild(urlList);
        accordionDiv.appendChild(contentDiv);
    }

    interfaceColumn.appendChild(accordionDiv);

    // Activate accordion
    $("#accordion").accordion( {collapsible: true});
}


function groupUrlsByThirdToLast(urls) {
    var groups = {};
    urls.forEach(function (url) {
        var thirdToLastPart = url.split('/').slice(-3, -2)[0];
        if (!groups[thirdToLastPart]) {
            groups[thirdToLastPart] = [];
        }
        groups[thirdToLastPart].push(url);
    });
    return groups;
}

$(document).ready(function() {
    $("#accordion").accordion();
});
