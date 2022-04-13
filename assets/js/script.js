var formEl= document.querySelector('#search-form');
var prevSearchContainer= document.querySelector('#previousSearches');
var queryString;
var searchArray;
var searchTermEl;
var prevCities=[];
var currentWeatherEl= document.querySelector('#current-container');
var forecastEl= document.querySelector('#forecast-container');
var searchUrl;
var getCoordUrl;
var newCity = new cityEl ("","","");
var APIkey= '06578d7a5b3d200e800ad787b4871526';

function searchSubmit (evt){
    evt.preventDefault();
    searchTermEl= document.querySelector('#city').value;
    if (!searchTermEl){ //Checks if the input field is empty
        window.alert('You need to introduce a City, State (if US) and country');
    } else{
        getLocationDetails();
    }
}

function getLocationDetails (){
    var searchCity= new search("","");
    searchArray=searchTermEl.split(','); // Separates the search term using the commas (the user must follow the example shown in the place holder)
    console.log(searchArray);
    if(searchArray.length == 3){ //If the array is length 3 the user entered city, state and country
        for (let i=0; i<searchArray.length;i++){
            searchArray[i]=searchArray[i].trim();   //deletes spaces from the beggining and end of the values of the array              
        }
        console.log(searchArray);
        var country= searchArray.pop();
        var state= searchArray.pop();
        var city= searchArray.pop();
        queryString = `./index.html?q=${city},${state},${country}`;
        queryString= queryString.replace(/\s+/g, '%20'); //replaces the space, in two word cities, by '%20'
        console.log(queryString);
        searchCity.name=city;
        searchCity.query= queryString;
        prevCities.push(searchCity);
        console.log(prevCities);
        console.log(queryString);
        storeLocalMemory(prevCities);
        generateButton(2,prevCities);
        getParam(queryString);
        // location.assign(queryString); //switch the location of the site to the weather.html (the location takes all the information needed on the next html to fetch the API)
    
    } else if(searchArray.length == 2){ // otherwise, if the array is length 2, the user enter City and Country
        for (let i=0; i<searchArray.length;i++){
            searchArray[i]=searchArray[i].trim();                
        }
        console.log(searchArray);
        var country= searchArray.pop();
        var city= searchArray.pop();        
        queryString = `./index.html?q=${city},${country}`;
        queryString= queryString.replace(/\s+/g, '%20'); //replaces the space, in two word cities, by '%20'
        console.log(queryString);
        searchCity.name=city;
        searchCity.query= queryString;
        prevCities.push(searchCity);
        console.log(prevCities);
        console.log(queryString);
        storeLocalMemory(prevCities);
        generateButton(2,prevCities);
        getParam(queryString);
        // location.assign(queryString); //switch the location of the site to the weather.html (the location takes all the information needed on the next html to fetch the API)
    
    } else{ //if it's more than 3 or less than 2, asks to reenter the info
        window.alert('You need to introduce a City, State (if US) and country');
        return;
    }  
}
//Generate the buttons from previous searches
function generateButton(event,array){
    var divEl;
    switch(event){
        case 1: //occurs when the method is called from the historic searches stored in local memory
            for(let i=0;i<array.length;i++){
                divEl= document.createElement('div');
                divEl.classList.add('btn-group', 'me-2');  
                divEl.innerHTML=
                `
                <button type="button" class="btn btn-secondary" data-query=${array[i].query}>${array[i].name}</button>
                `
                prevSearchContainer.append(divEl);
            }
            break;
        case 2: //occurs when the method is called from a new search
            divEl= document.createElement('div');
            divEl.classList.add('btn-group', 'me-2');
            divEl.innerHTML=
                `
                <button type="button" class="btn btn-secondary" data-query=${array[(array.length-1)].query}>${array[(array.length-1)].name}</button>
                `
                prevSearchContainer.append(divEl);
            break;
    }
}
// stores data in local memory
function storeLocalMemory(array) {
    localStorage.setItem('searchHistory',JSON.stringify(array));
}
// get the stored data from local memory if it exists
function getStoredSearches(){
    prevCities=JSON.parse(localStorage.getItem('searchHistory'));
    console.log(prevCities);
    if (prevCities){
        generateButton(1,prevCities);
    } else{
        prevCities=[];
    }
}
// gets the element that was clicked and set the site location to the value stored in data-query property
function clickButton(evt){
    var target=evt.target;
    var elementQuery;
    console.log(target);
    elementQuery=target.getAttribute ('data-query');
    console.log(elementQuery);
    getParam(elementQuery);
}

function search(name, query){
    this.name = name;
    this.query = query;
}
//set event listeners
function setEventListeners(){
formEl.addEventListener('submit',searchSubmit);
prevSearchContainer.addEventListener('click',clickButton)
}

 function init(){
     setEventListeners();
     getStoredSearches();
 }

 init();

 function getParam(string){
    var searchParam= (string.split('=').pop()).split(',');
    console.log(searchParam);
    if(searchParam.length === 3){
        var country= searchParam.pop();
        var state= searchParam.pop();
        var city= searchParam.pop();
        getCoordUrl= `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=${APIkey}`;
        console.log(getCoordUrl);                 
    } else {
        var country= searchParam.pop();
        var city= searchParam.pop();
        getCoordUrl= `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${APIkey}`;
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
        newCity.name = data[0].name;
        newCity.lat = data[0].lat;
        newCity.lon = data[0].lon;
        searchUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${newCity.lat}&lon=${newCity.lon}&exclude=hourly,minutely&units=imperial&appid=${APIkey}`;
        console.log(searchUrl);
        searchApi(searchUrl);
    })
    .catch(function (error){
        console.log(error)
        window.alert('Error');
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
    forecastEl.innerHTML='';
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


function cityEl (name, lat, lon) {
    this.name = name;
    this.lat = lat;
    this.lon = lon;
}