document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault();
    });

    async function copyResult(event) {
        const mainDiv = document.querySelector(".main");
        const moreInfoElement = document.querySelector(".moreInfo");
        const temperatureElement = document.querySelector('.temperature');
        const conditionElement = document.querySelector('.condition');
        const cityElement = document.querySelector('.cityname');
        const weatherIcon = document.getElementById("weatherIcon");
        const resp = document.querySelector(".search-input").value;
        document.querySelector(".search-input").value = "";

        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${resp}&appid=7652d43c48acaf7a470be9941048ff62&units=metric`;
            const response = await fetch(url);
            const resultApi = await response.json();
            console.log(resultApi);

            temperatureElement.textContent = `${resultApi.main.temp}°C`;
            conditionElement.textContent = `${resultApi.weather[0].main}`;
            cityElement.textContent = `${resultApi.name}, ${resultApi.sys.country}`;
            if (conditionElement.textContent === 'Sunny' || conditionElement.textContent === 'Clear') {
                weatherIcon.src = "sun.png";
            } else {
                weatherIcon.src = "cloud.png";
            }

            moreInfo(resultApi); // Pass resultApi to the moreInfo function

        } catch (err) {
            console.error(err);
        }
        function moreInfo(resultApi) {
            const mainDiv = document.querySelector(".main");
            const moreInfoElement = document.querySelector(".moreInfo");
            const minTemp = document.querySelector(".minTemp");
            const maxTemp = document.querySelector(".maxTemp");
    
            mainDiv.addEventListener('click', function () {
                
                if (moreInfoElement) {
                    moreInfoElement.innerText = `Feels like: ${resultApi.main.feels_like}°C`;
                    minTemp.innerText = `temp_min: ${resultApi.main.temp_min}°C`;
                    maxTemp.innerText = `temp_max: ${resultApi.main.temp_max}°C`;
            }});
        }
    }

    document.querySelector('.search-button').addEventListener('click', copyResult, true);
});
