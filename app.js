window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            // https://api.darksky.net/forecast/7bf1bee450da60e3ed1adf6735f6af51/37.8267,-122.4233
            // const api = `${proxy}api.darksky.net/forecast/7bf1bee450da60e3ed1adf6735f6af51/${lat},${long}`;
            const api = `https://api.darksky.net/forecast/7bf1bee450da60e3ed1adf6735f6af51/46.770439,23.591423`;
        
        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const  { temperature,summary,icon } = data.currently;
            // Set Dom elements from Api
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;
            let celcius = (temperature - 32) * (5 / 9);
            //Set icon
            setIcons (icon,document.querySelector('.icon'));

            //Change temperature to celcius
            temperatureSection.addEventListener('click', () =>{
                if(temperatureSpan.textContent === 'F'){
                    temperatureSpan.textContent = 'C';
                    temperatureDegree.textContent = Math.floor(celcius);
                } else {
                    temperatureSpan.textContent = 'F';
                    temperatureDegree.textContent = temperature;
                }
            })


              });
            });
        }

        function setIcons(icon,iconID){
            const skycons = new Skycons({color:'white'});
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID,Skycons[currentIcon]);
        }
});
