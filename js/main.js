// constants
const input = document.getElementById("input")
let i = 0;

//functions

    // clock display

const time = function(){

    const optionsDate = {year: "numeric", month: "long", day: "numeric"}
    const optionsWeek = {weekday: "long"}
    const optionsTime = {hour: "numeric", minute: "numeric", second: "numeric"}
    let todaysDate = new Date();
    let realDate = todaysDate.toLocaleDateString("en-GB", optionsDate)
    let realDay = todaysDate.toLocaleDateString("en-GB", optionsWeek)
    let realTime = todaysDate.toLocaleTimeString("en-GB", optionsTime)
    document.getElementById("today-time").textContent = realTime
    document.getElementById("today-date").textContent = realDate
    document.getElementById("today-weekday").textContent = realDay + " "

}

setInterval(() => {
    time()
}, 1000);

    // End of Clock Display 

    // HTML reset

const HTMLreset = function(){
    const displayEl = document.getElementsByClassName("card")
    for (let i = 0; i < displayEl.length; i++){
        displayEl[i].style.opacity = "0" ;
    }
    const leftDisplay = document.getElementById("left-display")
        leftDisplay.style.opacity = "0"

    const rightDisplay = document.getElementById("right-display")
        rightDisplay.style.opacity = "0"
}
HTMLreset()

    // Display HTML elements

const HTMLdisplay = function(){
    const displayEl = document.getElementsByClassName("card")
    for (let i = 0; i < displayEl.length; i++){
        displayEl[i].style.opacity = "1" ;
    }
    const leftDisplay = document.getElementById("left-display")
        leftDisplay.style.opacity = "1"

    const rightDisplay = document.getElementById("right-display")
        rightDisplay.style.opacity = "1"
    };

// creating timestamp

const timestamp =function(array, array2, array3) {
    
    let todaysDate = new Date(array);
    let day = todaysDate.getDate()
    let month = todaysDate.getMonth()+ 1
    array2.push(day)
    array3.push(month)
    console.log(todaysDate)
    
};

    // Display data in HTML

    
const createCity = function(place){

    const city = document.getElementById("main-place");
    city.innerHTML = "";
    const cityInput = document.createElement("p");
    let lol = place.toUpperCase([0])
    cityInput.innerText = lol;
    city.appendChild(cityInput);
}

// create Dates

const createDates = function(date){

    for (let i = 8; i < date.length; i+=8){
        let dateArr = [];
        dateArr.push(date[i])
        console.log(dateArr[i])
    }
}
// Start of our App

let weather = new Vue ({
    el: "#app",
    data: {
        city: "",
        icon: [],
        fiveIcon: [],
        dates: [],
        days: [],
        months: [],
        fiveDays: [],
        weather: [],
        temps: [],
        fiveTemps: [],
        humidity: "",
        windSpeed: "",
        rainChance: "",
    },
    methods: {
        getWeather() {
            let url = "https://api.openweathermap.org/data/2.5/forecast"

// AXIOS API to fetch data from server

            axios 
                .get(url, {
                    params: {
                        q: this.city,
                        units: "metric",
                        appid: "1b209a1b31c5168e6fe9cb5720554953"
                    }
                })

// adding data from JSON file to arrays

                .then(response => {

                    this.dates = response.data.list.map(list => {
                        return list.dt_txt;
                    });

                    this.temps = response.data.list.map(list => {
                        return list.main.temp;
                    });

                    this.weather = response.data.list.map(list => {
                        return list.weather[0].description;
                    })
                    

                    this.icon = response.data.list.map(list => {
                        return list.weather[0].icon;
                    })

                    this.windSpeed = response.data.list[0].wind.speed;

                    this.humidity = response.data.list[0].main.humidity;

                })

                .then(response => {

                    for (let i = 8; i < this.dates.length; i+=8) {
                        this.fiveDays.push(this.dates[i])}

                    for (let i = 8; i < this.temps.length; i+=8) {
                        this.fiveTemps.push(Math.round(this.temps[i] * 10) / 10)}

                    for (let i = 8; i < this.dates.length; i+=8) {
                        this.fiveIcon.push(this.icon[i])}
                        

                    createCity(this.city)
                    HTMLdisplay()

                    for (let i = 0; i < this.fiveDays.length; i++){
                        timestamp(this.fiveDays[i], this.days, this.months)
                    }
                })
        },
        
    }              
});

// end of App
