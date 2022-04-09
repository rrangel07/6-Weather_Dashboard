var formEl= document.querySelector('#search-form');
var searchUrl;
var queryString;
var APIkey= '06578d7a5b3d200e800ad787b4871526';
var searchArray;
var searchTermEl;
var lat,lon;


function searchSubmit (evt){
    evt.preventDefault();
    searchTermEl= document.querySelector('#city').value;
    if (!searchTermEl){
        window.alert('You need to introduce a City, State (if US) and country');// change alerts for modals
    } else{
        getParam();
    }
}

function getParam (){
    searchArray=searchTermEl.split(',');
    console.log(searchArray);
    if(searchArray.length == 3){
        for (let i=0; i<searchArray.length;i++){
            searchArray[i]=searchArray[i].trim();                
        }
        console.log(searchArray);
        var country= searchArray.pop();
        var state= searchArray.pop();
        var city= searchArray.pop();
        searchUrl= `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=${APIkey}`;
        console.log(searchUrl);
    
    } else if(searchArray.length == 2){
        for (let i=0; i<searchArray.length;i++){
            searchArray[i]=searchArray[i].trim();                
        }
        console.log(searchArray);
        var country= searchArray.pop();
        var city= searchArray.pop();
        searchUrl= `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${APIkey}`;
        console.log(searchUrl);
    
    } else{
        window.alert('You need to introduce a City, State (if US) and country');// change alerts for modals
        return;
    }
    searchCoord();    
}
    
function searchCoord(){
    fetch(searchUrl)
    .then(function(response){
        if (!response.ok){
            throw response.json();
        }
        return response.json();
    })
    .then(function (data){
        console.log(data);
        lat=data[0].lat;
        console.log(lat);
        lon=data[0].lon;
        console.log(lon);
        queryString = './weather.html?lat=' + lat + '&lon=' + lon + '&appid=' + APIkey;
        console.log(queryString);
        location.assign(queryString);
    })
    .catch(function (error){
        console.log(error)
        window.alert('Error');// change alerts for modals
    });
}

formEl.addEventListener('submit',searchSubmit);


// $(function() {
//     var availableCities = [];
//     $( "#tags" ).autocomplete({
//       source: availableCities
//     });
//   } );

//   searchTermEl.addEventListener('keyup', function(){

//   });