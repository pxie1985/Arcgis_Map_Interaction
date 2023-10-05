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

window.selectedUrls = [];
// Function to update selectedUrls with the selected checkboxes
function updateSelectedUrls() {
    window.selectedUrls = []; // Clear the array first
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(function (checkbox) {
        selectedUrls.push(checkbox.value);
    });
    console.log("Selected URLs:", selectedUrls);
    if (window.updateMapLayers) {
        window.updateMapLayers();
    }
}



function populateInterfaceWithUrls() {
    console.log("populateInterfaceWithUrls is running");
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
        var form = document.createElement('form');

        groupedUrls[group].forEach(function (url) {
            var containerDiv = document.createElement('div');
            containerDiv.className = 'd-block';

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = url;
            checkbox.setAttribute('onchange', 'handleCheckboxChange(event)');
            containerDiv.appendChild(checkbox);
            console.log("Event listener added");

            // Create a clickable link for the URL
            var link = document.createElement('a');
            link.href = url;
            link.target = "_blank";  // Open link in new tab/window
            link.textContent = url.split('/').slice(-2, -1)[0];  // Display the second-to-last component of the URL
            containerDiv.appendChild(link);// Add link to the containerDiv
            form.appendChild(containerDiv);
            //

            checkbox.onchange = function () {

                updateSelectedUrls();
               // Update the selectedUrls array
            };
        });

        contentDiv.appendChild(form);
        accordionDiv.appendChild(contentDiv);
    }

    interfaceColumn.appendChild(accordionDiv);

    // Activate accordion
    $("#accordion").accordion({collapsible: true});
}

function handleCheckboxChange(event) {
    console.log("Checkbox changed:", event.target.value, event.target.checked);
    const url = event.target.value; // Get the URL from the checkbox
    if (event.target.checked) {
        // If the checkbox was checked, add the URL to the selectedUrls array
        selectedUrls.push(url);
    } else {
        // If unchecked, remove the URL from the selectedUrls array
        const index = selectedUrls.indexOf(url); // Get the index of the URL in the array
        if (index > -1) {
            selectedUrls.splice(index, 1);// Remove the URL from the array
        }
    }
    console.log(selectedUrls);
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

$(document).ready(function () {
    $("#accordion").accordion();
});

