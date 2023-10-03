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