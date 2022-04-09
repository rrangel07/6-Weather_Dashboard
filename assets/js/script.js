var formEl= document.querySelector('#search-form');
var searchUrl= 'http://api.openweathermap.org/geo/1.0/direct?q=';
var queryString;
var APIkey= '06578d7a5b3d200e800ad787b4871526';
var searchArray;
var searchTermEl;


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
        searchUrl= `${searchUrl}${city},${state},${country}&appid=${APIkey}`;
        console.log(searchUrl);
      
        } else if(searchArray.length == 2){
            for (let i=0; i<searchArray.length;i++){
                searchArray[i]=searchArray[i].trim();                
            }
            console.log(searchArray);
            var country= searchArray.pop();
            var city= searchArray.pop();
            searchUrl= `${searchUrl}${city},${country}&appid=${APIkey}`;
            console.log(searchUrl);
        
        } else{
            window.alert('You need to introduce a City, State (if US) and country');// change alerts for modals
            return;
        }
    searchCoord();
}

function searchCoord(){
    var coord;
    fetch(searchUrl)
        .then(function(response){
            if (response.ok){
                response.json()
                    .then(function (data){
                        console.log(data)
                    })
            }
        })
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