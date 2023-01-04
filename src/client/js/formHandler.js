// APIs
const GEO_BASE_URL = 'http://api.geonames.org/searchJSON?q=';
const GEO_API_KEY = '&maxRows=10&username=location45';
const WEATHER_BASE_URL_FEATURE = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const WEATHER_BASE_URL_CURRENT = 'https://api.weatherbit.io/v2.0/current?';
const WEATHER_API_KEY = '&key=013b04ec40d64e70a9da7efcdc497abb'
const PIXABAY_BASE_URL = `https://pixabay.com/api/?`;
const PIXABAY_API_KEY = 'key=32449244-3a1b9efb1b17f891f06f8af7e&'


function handleSubmit(event) {
  event.preventDefault()
  let city = document.getElementById('city').value;
  Client.checkForName(city)
  console.log("::: Form Submitted :::")

  geographicLocation(GEO_BASE_URL + city + GEO_API_KEY)
    .then((data) => {
      // If the user travels after a week 
      if (getNumberofDays() > 7) {
        weather(`${WEATHER_BASE_URL_FEATURE}lat=${data.geonames[0].lat}&lon=${data.geonames[0].lng}${WEATHER_API_KEY}`)
      } else {
        weather(`${WEATHER_BASE_URL_CURRENT}lat=${data.geonames[0].lat}&lon=${data.geonames[0].lng}${WEATHER_API_KEY}`)
      }
      picture(`${PIXABAY_BASE_URL}${PIXABAY_API_KEY}q=${city}&image_type=photo`)
    })
}

// Get location info from http://api.geonames.org
async function geographicLocation(url) {
  try {
    console.log(url)
    const request = await fetch(url)
    return await request.json()
  } catch (error) {
    console.log(error)
  }

}

// Get weather info from https://www.weatherbit.io
async function weather(url) {
  try {
    const request = await fetch(url)
    const res = await request.json()
    console.log(url)
    document.getElementById('info').innerHTML = `
    <span id="weather-description">Weather Status</span>
    <p id="description">${res.data[0].weather.description}</p>
    <p id="clouds">Clouds: ${res.data[0].clouds} </p>
    <p id="temp">Temperature: ${res.data[0].temp}°</p>
    
    `
    return res
  } catch (error) {
    console.log(error)
  }

}
// Get picture from https://pixabay.com
async function picture(url) {
  try {
    console.log(url)
    const request = await fetch(url)
    const respond = await request.json()
    // UI update     
    document.getElementById('place').setAttribute("width", '97%');
    document.getElementById('place').setAttribute("src", respond.hits[0].webformatURL);
  } catch (error) {

  }
}
// A function to calculate number of days between current date and given date from user
function getNumberofDays() {
  // Convert date to milliseconds
  let userDate = (new Date(document.getElementById('date').value)).getTime();
  let today = (new Date()).getTime();
  // Return number of days
  let numberOfDaysInMilliSec = today - userDate;
  let numberOfDays = Math.round(numberOfDaysInMilliSec / (1000 * 60 * 60 * 24)) - 1
  return Math.abs(numberOfDays)
}

export { handleSubmit }
