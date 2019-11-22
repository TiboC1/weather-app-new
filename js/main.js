
// global variables

let realDate;
let forecast = document.getElementById("forecast");

// creating city display

const createCity = array => {
    const city = document.getElementById("city")
    let lastChild = city.lastElementChild;  
    while (lastChild) { 
        city.removeChild(lastChild); 
        lastChild = city.lastElementChild; 
    } 
    const child = document.createElement("p")
    child.innerText = array
    city.appendChild(child) 

};

// creating timestamp

const timestamp =function(array) {

    const optionsDate = {year: "numeric", month: "long", day: "numeric", weekday: "short"}
    let todaysDate = new Date(array);
    realDate = todaysDate.toLocaleDateString("en-GB", optionsDate)

};

// create HTML eraser

const HTMLEraser = () => {

    let forecast = document.getElementById("forecast");
    let child = forecast.lastElementChild;  
    while (child) { 
        forecast.removeChild(child); 
        child = forecast.lastElementChild; 
    } 
};

// create HTML structure for forecast 

const createForecast = (array1, array2) => {

    const div = document.createElement("div");
    const date = document.createElement("p");
    const icon = document.createElement("img");
    const temp = document.createElement("p");

    const card = document.createAttribute("class")
    card.value = "card"
    div.setAttributeNode(card)

    date.textContent = realDate;
    icon.src = `/img/${array1}.png`;
    temp.textContent = array2

    this.forecast.appendChild(div);
    div.appendChild(date);
    div.appendChild(icon);
    div.appendChild(temp);

};

// Start of our App

    let weather = new Vue ({
        el: "#app",
        data: {
            city: "",
            icon: [],
            fiveIcon: [],
            dates: [],
            fiveDays: [],
            temps: [],
            fiveTemps: [],
            errored: false
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

                        this.icon = response.data.list.map(list => {
                            return list.weather[0].icon;
                        })
                    })   

// filtering through arrays to get 5 day forecast
                    
                    .then(response => {

                        this.fiveDays = [];
                        this.fiveTemps = [];
                        this.fiveIcon = [];

                        for (let i = 8; i < this.dates.length; i+=8) {
                            this.fiveDays.push(this.dates[i])}

                        for (let i = 8; i < this.temps.length; i+=8) {
                            this.fiveTemps.push(Math.round(this.temps[i] * 10) / 10)}

                        for (let i = 8; i < this.dates.length; i+=8) {
                            this.fiveIcon.push(this.icon[i])}
                        })
                    

// creating HTML cards with forecast                

                    .then(response => {

                        createCity(this.city)
                        HTMLEraser(forecast)

                        for (let i = 0; i < this.fiveDays.length; i++){

                            timestamp(this.fiveDays[i])
                            createForecast(this.fiveIcon[i], this.fiveTemps[i])
                            console.log(this.fiveDays)
                        }
                    })

                    .catch(error => {
                        console.log(error);
                        this.errored = true;
                    })
            },        
        },
    });

// end of App

// bg image changer

    function lol(){
        let bg = document.getElementById("app")
        let time = new Date().getHours();

        if (time == 24){
            time = 0
        }

        switch (time) {
            case 0:
                bg.style.background = "linear-gradient(to bottom,  #012459 0%,#001322 100%)"
            break;
            case 1:
                bg.style.background = "linear-gradient(to bottom,  #003972 0%,#001322 100%)"
            break;
            case 2:
                bg.style.background = "inear-gradient(to bottom,  #003972 0%,#001322 100%)"
            break;
            case 3:
                bg.style.background = "linear-gradient(to bottom,  #004372 0%,#00182b 100%)";
            break;
            case 4:
                bg.style.background = "linear-gradient(to bottom,  #004372 0%, #011d34 100%)"
            break;
            case 5:
                bg.style.background = "linear-gradient(to bottom,  #016792 0%, #00182b 100%)"
            break;
            case 6:
                bg.style.background = "linear-gradient(to bottom,  #07729f 0%, #042c47 100%)"
            break;
            case 7:
                bg.style.background = "linear-gradient(to bottom,  #12a1c0 0%, #07506e 100%)"
            break;
            case 8:
                bg.style.background = "linear-gradient(to bottom,  #74d4cc 0%, #1386a6 100%)"
            break;
            case 9:
                bg.style.background = "linear-gradient(to bottom,  #efeebc 0%,#61d0cf 100%)"
            break;
            case 10:
                bg.style.background = "linear-gradient(to bottom,  #fee154 0%,#a3dec6 100%)"
            break;
            case 11:
                bg.style.background = "linear-gradient(to bottom,  #fdc352 0%,#e8ed92 100%)"
            break;
            case 12:
                bg.style.background = "linear-gradient(to bottom,  #ffac6f 0%,#ffe467 100%)"
            break;
            case 13:
                bg.style.background = "linear-gradient(to bottom,  #fda65a 0%,#ffe467 100%)"
            break;
            case 14:
                bg.style.background = "linear-gradient(to bottom,  #fd9e58 0%,#ffe467 100%)"
            break;
            case 15:
                bg.style.background = "linear-gradient(to bottom,  #f18448 0%,#ffd364 100%)"
            break;
            case 16:
                bg.style.background = "linear-gradient(to bottom,  #f06b7e 0%,#f9a856 100%)"
            break;
            case 17:
                bg.style.background = "linear-gradient(to bottom,  #ca5a92 0%,#f4896b 100%)"
            break;
            case 18:
                bg.style.background = "linear-gradient(to bottom,  #5b2c83 0%,#d1628b 100%)"
            break;
            case 19:
                bg.style.background = "linear-gradient(to bottom,  #371a79 0%,#713684 100%)"
            break;
            case 20:
                bg.style.background = "linear-gradient(to bottom,  #28166b 0%,#45217c 100%)"
            break;
            case 21:
                bg.style.background = "linear-gradient(to bottom,  #192861 0%,#372074 100%)"
            break;
            case 22:
                bg.style.background = "linear-gradient(to bottom,  #040b3c 0%,#233072 100%)"
            break;
            case 23:
                bg.style.background = "linear-gradient(to bottom,  #040b3c 0%,#012459 100%)"
            break;


        }
    }

// time and date

const time = function(){

    const optionsDate = {year: "numeric", month: "long", day: "numeric"}
    const optionsWeek = {weekday: "long"}
    const optionsTime = {hour: "numeric", minute: "numeric", second: "numeric"}
    let todaysDate = new Date();
    let realDate = todaysDate.toLocaleDateString("en-GB", optionsDate)
    let realDay = todaysDate.toLocaleDateString("en-GB", optionsWeek)
    let realTime = todaysDate.toLocaleTimeString("en-GB", optionsTime)
    document.getElementById("time").textContent = realTime
    document.getElementById("date").textContent = realDate
    document.getElementById("weekday").textContent = realDay

}

setInterval(() => {
    time()
}, 1000);

lol()