const key = '174be33436b5ac8a0340d573ab8f6d96';
const check_btn = document.getElementById('check_btn');

check_btn.addEventListener('click', function (e) {
    let chosenCity = document.querySelector('.city__name__input').value ? document.querySelector('.city__name__input')
        .value : 'Poznań';
    let degrees = document.getElementById('temperature').value;
    let url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + chosenCity + '&lang=pl&cnt=40&units=' + degrees
        + '&appid=' + key;
    console.log(url);
    fetchForecast(url, degrees);
});

function showResults(data, degrees) {
    if (data.cod === "200") {
        console.log('Works fine!');
        const currentWeather = document.getElementById('current__weather');

        while (currentWeather.firstChild) {
            currentWeather.removeChild(currentWeather.firstChild);
        }

            let degreeUnits = degreeUnit(degrees);
            let cityName = data.city.name;
            
            // Creating HTML elements and setting their attributes for styling //

            let chosenCityElement = document.createElement('h2');
            chosenCityElement.setAttribute('class', 'chosen__city');
            console.log(chosenCityElement);
            let cityNameWrapperElement = document.createElement('div');
            cityNameWrapperElement.setAttribute('class', 'city__name__wrapper');
            let tempAndIconWrapperElement = document.createElement('div');
            tempAndIconWrapperElement.setAttribute('class', 'temp_and_icon_wrapper');
            let tempElement = document.createElement('p');
            tempElement.setAttribute('class', 'temp');
            let iconImgElement = document.createElement('img');
            iconImgElement.setAttribute('class', 'icon');
            iconImgElement.setAttribute('src', 'assets/img/' + data.list[0].weather[0].icon + '.png');
            
            currentWeather.append(cityNameWrapperElement);
            cityNameWrapperElement.append(chosenCityElement);
            chosenCityElement.append(iconImgElement);

    }

}

function degreeUnit(degrees) {
    switch (degrees) {
        case 'metric':
            return '°C';
            break;
        case 'imperial':
            return '°F';
            break;
    }
}


function fetchForecast(url, degrees) {
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(function (fetchdata) {
            showResults(fetchdata, degrees)
        })
        .catch(error => {
            alert('Something went wrong :( Try again!');
            console.log(error);
        });
}