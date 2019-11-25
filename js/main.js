// constants
const input = document.getElementById("input")

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

    // Display data in HTML

    
const displayForecastDate = function(){

    const tempDiv = document.createElement("div");
    const temp = document.createElement("p");


}

// Start of our App

let weather = new Vue ({
    el: "#app",
    data: {
        city: "",
        icon: [],
        dates: [],
        weather: "",
        temps: [],
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

                    this.weather = response.data.list[0].weather[0].description;
                    

                    this.icon = response.data.list.map(list => {
                        return list.weather[0].icon;
                    })

                    console.log(this.weather)
                })   

        },
        getImgUrl(pic) {
            (`/img/${pic}.png`)
        }
    }              
});

// end of App
