var currentWeatherEl= document.querySelector('#current-container');
var forecastEl= document.querySelector('#forecast-container');
var APIkey= '06578d7a5b3d200e800ad787b4871526';
var searchUrl;
var getCoordUrl;
var newCity = new city ("","","");

function getParam (){
    var searchParam= (window.location.search.split('=').pop()).split(',');
    console.log(searchParam);
    if(searchParam.length === 3){
        var country= searchParam.pop();
        var state= searchParam.pop();
        var city= searchParam.pop();
        getCoordUrl= `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=${APIkey}`;
        console.log(getCoordUrl);                 
    } else {
        var country= searchParam.pop();
        var city= searchParam.pop();
        getCoordUrl= `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${APIkey}`;
        console.log(getCoordUrl); 
    }
    searchCoord(getCoordUrl)
}

function searchCoord(param){
    fetch(param)
    .then(function(response){
        if (!response.ok){
            throw response.json();
        }
        return response.json();
    })
    .then(function (data){
        console.log(data);
        newCity = new city(data[0].name,data[0].lat,data[0].lon);
        searchUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${newCity.lat}&lon=${newCity.lon}&exclude=hourly,minutely&units=imperial&appid=${APIkey}`;
        console.log(searchUrl);
        searchApi(searchUrl);
    })
    .catch(function (error){
        console.log(error)
        window.alert('Error');// change alerts for modals
    });
}

function searchApi(url){
    fetch(url)
    .then(function(response){
        if(!response.ok){
            throw response.json();
        }
        return response.json();
    })
    .then(function(data){
        console.log(data);
        renderWeather(data);
    })
    .catch(function(error){
        console.log(error);
        window.alert('Error');
    })
}

function renderWeather(element){
    var cardEl;
    currentWeatherEl.innerHTML=`
    <div class="col">
        <div class="card">
            <h2 class="card-title">${newCity.name} ${moment.unix(element.current.dt).format('L')} <span><img src=https://openweathermap.org/img/w/${element.current.weather[0].icon}.png alt='Weather icon'></img></span></h2>
            <h4>Temperature: ${element.current.temp.toFixed()} °F</h4>
            <h4>Wind Speed: ${element.current.wind_speed.toFixed()} MPH</h4>
            <h4>Humidity: ${element.current.humidity}%</h4>
            <h4>UV Index: <span id='uvi'> ${element.current.uvi}</span></h4>
        </div>
    </div>`
    var uviEl= document.querySelector('#uvi');
    console.log(uviEl.textContent);
    uviBackground(uviEl);

    for(let i=1; i<6; i++){
        cardEl= document.createElement('div');
        cardEl.classList.add('card','bg-dark','text-light');
        cardEl.innerHTML=
        `
        <div class="card-body">
        <h2>${moment.unix(element.daily[i].dt).format('L')}</h2>
        <img src=https://openweathermap.org/img/w/${element.daily[i].weather[0].icon}.png alt='Weather icon'></img>
        <h4>Low: ${element.daily[i].temp.min.toFixed()} °F</h4>
        <h4>High: ${element.daily[i].temp.max.toFixed()} °F</h4>
        <h4> Wind Speed: ${element.daily[i].wind_speed.toFixed()} MPH</h4>
        <h4>Humidity: ${element.daily[i].humidity}%</h4>
        </div>
        `
        forecastEl.append(cardEl);
    }
}

function uviBackground(uvIndex){
    if (uvIndex.textContent <=2){
        uvIndex.style.background='green';
    } else if (uvIndex.textContent > 2 && uvIndex.textContent <=5){
        uvIndex.style.background='yellow';
    } else if (uvIndex.textContent > 5 && uvIndex.textContent <=7){
        uvIndex.style.background='orange';
    } else if (uvIndex.textContent > 7 && uvIndex.textContent <=10){
        uvIndex.style.background='red';
    } else{
        uvIndex.style.background='purple';
    }
}


function city(name, lat, lon) {
    this.name = name;
    this.lat = lat;
    this.lon = lon;
}

getParam ();