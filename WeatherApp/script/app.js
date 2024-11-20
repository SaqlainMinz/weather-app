const cityForm =document.querySelector('form');
const card =document.querySelector('.card');
const details =document.querySelector('.details');
const icon =document.querySelector('.icon img')
const time = document.querySelector('img.time')
const forecast =new Forecast();

// updating user interfase
const updateUI= (data)=>{
    const weather = data.weather;
    console.log(weather);
    
    const cityDetails =data.cityDetails;
  

    //update details template
            details.innerHTML= `
            <h5 class="my-3">${cityDetails.EnglishName}</h5>
                        <div class="my-3">${weather.WeatherText}</div>
                        <div class="display-4 my4">
                            <span>${weather.Temperature.Metric.Value}&deg;C</span>
                        </div>
            `
            if(card.classList.contains('d-none')){
                card.classList.remove('d-none')
            }
    //Update night/day and Icon
                const iconSrc= `img/icons/${weather.WeatherIcon}.svg`;
                icon.setAttribute('src',iconSrc);

                let timeSrc= null;
                if (weather.IsDayTime){
                    timeSrc='./img/time/day.svg'
                }else{
                    timeSrc='./img/time/night.svg'
                }
                time.setAttribute('src',timeSrc)

    
}
// adding event listner to the submit button

cityForm.addEventListener('submit',(e)=>{
    //prevent default action

    e.preventDefault();

    // getting the name of the city

    const city= cityForm.city.value.toString().trim().toLowerCase();
    cityForm.reset();
   
    
    //update the ui with new city
    forecast.updateCity(city)
    .then((data)=>{
       updateUI(data);
    })
    .catch(err=>console.log(err))

    // setting local storage

    localStorage.setItem('city',city);
})

 if(localStorage.getItem('city')){
   forecast.updateCity(localStorage.getItem('city'))
    .then(data=>{
        updateUI(data);
    })
    .catch(err=>{console.log(err);
    })
 }