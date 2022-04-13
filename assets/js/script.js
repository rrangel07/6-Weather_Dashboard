var formEl= document.querySelector('#search-form');
var prevSearchContainer= document.querySelector('#previousSearches');
var queryString;
var searchArray;
var searchTermEl;
var prevCities=[];

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
        city= city;
        queryString = `./weather.html?q=${city},${state},${country}`;
        queryString= queryString.replace(/\s+/g, '%20'); //replaces the space, in two word cities, by '%20'
        console.log(queryString);
        searchCity.name=city;
        searchCity.query= queryString;
        prevCities.push(searchCity);
        console.log(prevCities);
        console.log(queryString);
        storeLocalMemory(prevCities);
        generateButton(2,prevCities);
        location.assign(queryString); //switch the location of the site to the weather.html (the location takes all the information needed on the next html to fetch the API)
    
    } else if(searchArray.length == 2){ // otherwise, if the array is length 2, the user enter City and Country
        for (let i=0; i<searchArray.length;i++){
            searchArray[i]=searchArray[i].trim();                
        }
        console.log(searchArray);
        var country= searchArray.pop();
        var city= searchArray.pop();        
        queryString = `./weather.html?q=${city},${country}`;
        queryString= queryString.replace(/\s+/g, '%20'); //replaces the space, in two word cities, by '%20'
        console.log(queryString);
        searchCity.name=city;
        searchCity.query= queryString;
        prevCities.push(searchCity);
        console.log(prevCities);
        console.log(queryString);
        storeLocalMemory(prevCities);
        generateButton(2,prevCities);
        location.assign(queryString); //switch the location of the site to the weather.html (the location takes all the information needed on the next html to fetch the API)
    
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
    location.assign(elementQuery);
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