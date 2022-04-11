var prevSearchEl= document.querySelector('#previous-searches-elements');
var currentWeatherEl= document.querySelector('#current-container');
var forecastEl= document.querySelector('#forecast-container');
var APIkey= '06578d7a5b3d200e800ad787b4871526';
var searchUrl;
var getCoordUrl;
var cityList=[];

// function getLocationDetails (){
//     searchArray=searchTermEl.split(',');
//     console.log(searchArray);
//     if(searchArray.length == 3){
//         for (let i=0; i<searchArray.length;i++){
//             searchArray[i]=searchArray[i].trim();                
//         }
//         console.log(searchArray);
//         var country= searchArray.pop();
//         var state= searchArray.pop();
//         var city= searchArray.pop();
//         queryString = `./weather.html?q=${city},${state},${country}`;
//         console.log(queryString);
//         location.assign(queryString);
//         searchUrl= `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=${APIkey}`;
//         console.log(searchUrl);
    
//     } else if(searchArray.length == 2){
//         for (let i=0; i<searchArray.length;i++){
//             searchArray[i]=searchArray[i].trim();                
//         }
//         console.log(searchArray);
//         var country= searchArray.pop();
//         var city= searchArray.pop();        
//         queryString = `./weather.html?q=${city},${country}`;
//         console.log(queryString);
//         location.assign(queryString);
//         getCoordUrl= `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${APIkey}`;
//         console.log(searchUrl);
    
//     } else{
//         window.alert('You need to introduce a City, State (if US) and country');// change alerts for modals
//         return;
//     }
//     // searchCoord();    
// }

function getParam (){
    var searchParam= (window.location.search.split('=').pop()).split(',');
    console.log(searchParam);
    if(searchParam.length == 3){
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
    currentWeatherEl.innerHTML=`
    <div class="col">
        <div class="card">

            <h2 class="card-title">${cityList[cityList.length-1].name} ${moment.unix(element.current.dt).format('L')}</h2>
            <h3>${element.current.temp} </h3>

        </div>
    </div>`
}

getParam ();


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
        var newCity = new city(data[0].name,data[0].lat,data[0].lon);
        cityList.push(newCity);
        console.log(cityList);
        var index= cityList.length-1
        searchUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${cityList[index].lat}&lon=${cityList[index].lon}&exclude=hourly,minutely&units=imperial&appid=${APIkey}`;
        console.log(searchUrl);
        searchApi(searchUrl);
    })
    .catch(function (error){
        console.log(error)
        window.alert('Error');// change alerts for modals
    });
}

function city(name, lat, lon) {
    this.name = name;
    this.lat = lat;
    this.lon = lon;
}