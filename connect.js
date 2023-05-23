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

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('runbtn').addEventListener('click', function () {
        var code = document.getElementById('myTextarea').value;

        // Create the JSON payload
        var payload = JSON.stringify({ 'code': code });

        // Send the JSON payload to your Flask application
        fetch('http://gallery-slave.at.ply.gg:3059/compile', {
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

});

