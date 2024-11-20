class Forecast{
    constructor(){
      this.key="DFXOy4d9UPUTPGaw198XXA8fQ9j9AEEG";
      this.weatherURI=`http://dataservice.accuweather.com/currentconditions/v1`;
      this.cityURI=`http://dataservice.accuweather.com/locations/v1/cities/search`;
  }
    async updateCity(city){
      const cityDetails = await this.getCity(city);
      const weather = await this.getWeather(cityDetails.Key);
      return { cityDetails, weather }
      }



     // getting city information
     async getCity(city){
      const query = `?apikey=${this.key}&q=${city}`;

      const response = await fetch(this.cityURI+ query);
      const data = await response.json();
    
      return data[0];
     } 

      // getting weather information

      async getWeather (id){
        const query =`/${id}?apikey=${this.key}`;

        const response  = await fetch(this.weatherURI+query);
        const data = await response.json();
        return data[0];
      }
}




// getCity('ranchi')
// .then((data)=>{
//     return getWeather(data.Key)
// }).then(data=>{
//     console.log(data);
// })
// .catch(err=>console.log(err))

