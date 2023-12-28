// JS file to handle the logic

const mouseEvent = e => {
    const shouldShowExitIntent =
        !e.toElement &&
        !e.relatedTarget &&
        e.clientY < 10;

    if (shouldShowExitIntent) {
        document.removeEventListener('mouseout', mouseEvent);

        document.querySelector('.exit-intent-popup').classList.add('visible');
    }
};


setTimeout(() => {
    document.addEventListener('mouseout', mouseEvent);
}, 500)

const exit = e => {
    if (e.target.className == "close") {
        document.querySelector('.exit-intent-popup').classList.remove('visible');
    }
};

document.addEventListener("click", exit);


// Clearing the output division
function clearout() {
    document.getElementById('outdiv').innerText = "";
}

document.addEventListener('DOMContentLoaded', function () {


    // Retrieve the stored value from localStorage
    var storedValue = localStorage.getItem('textareaValue');

    // Set the value of the textarea if a stored value exists, otherwise set it to an empty string
    document.getElementById('myTextarea').value = storedValue ? storedValue : '';

    // Store the textarea value in localStorage whenever it changes
    document.getElementById('myTextarea').addEventListener('input', function () {
        localStorage.setItem('textareaValue', this.value);
    });


    var fetchadd = "http://gallery-slave.at.ply.gg:3059/c";

    // Retrieve the stored language selection from local storage
    var storedLang = localStorage.getItem('selectedLang');

    // Set the select box's value based on the stored language selection
    if (storedLang) {
        document.getElementById('lang').value = storedLang;
        if (storedLang == "Python") {
            fetchadd = 'http://gallery-slave.at.ply.gg:3059/python';
            document.getElementById('filename').innerText = "main.py";
        } else if (storedLang == "C") {
            fetchadd = 'http://gallery-slave.at.ply.gg:3059/c';
            document.getElementById('filename').innerText = "main.c";
        }
    }

    document.getElementById('lang').addEventListener('change', function () {
        var langselect = document.getElementById('lang').value;
        if (langselect == "Python") {
            fetchadd = 'http://gallery-slave.at.ply.gg:3059/python';
            document.getElementById('filename').innerText = "main.py";
        } else if (langselect == "C") {
            fetchadd = 'http://gallery-slave.at.ply.gg:3059/c';
            document.getElementById('filename').innerText = "main.c";
        }
        // Store the selected language in local storage
        localStorage.setItem('selectedLang', langselect);

        console.log("User selected the language - " + langselect);
    });


    document.getElementById('runbtn').addEventListener('click', function () {
        var code = document.getElementById('myTextarea').value;

        var payload = JSON.stringify({ 'code': code });


        // Send the JSON payload to your Flask application
        fetch(fetchadd, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the Flask application
                console.log(data);
                // Display the output in the outputDiv
                document.getElementById('outdiv').innerText = data.answer;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    document.getElementById('exit').addEventListener('click', function () {
        document.querySelector('.exit-intent-popup').classList.add('visible');
    });
});
