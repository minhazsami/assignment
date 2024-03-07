describe('OpenWeatherMap API Test', () => {
    const apiKey = 'a04813f2a5c8db7c21b942809e1d53c1'; // Replace 'YOUR_API_KEY' with your actual API key
  
    it('Retrieves weather data for San Francisco, CA (valid request)', () => {
      const cityName = 'San Francisco';
  
      cy.request({
        method: 'GET',
        url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      }).then((response) => {
        expect(response.status).to.eq(200); // Check if the request was successful
        const weatherData = response.body;
  
        // Ensure relevant weather information is present
        expect(weatherData.name).to.eq('San Francisco');
        expect(weatherData.weather).to.be.an('array').that.is.not.empty;
        expect(weatherData.main.temp).to.be.a('number');
        expect(weatherData.main.humidity).to.be.a('number');
        expect(weatherData.wind.speed).to.be.a('number');
  
        // Log the weather information
        cy.log('Weather information for San Francisco, CA:');
        cy.log(`Description: ${weatherData.weather[0].description}`);
        cy.log(`Temperature: ${weatherData.main.temp} Kelvin`);
        cy.log(`Humidity: ${weatherData.main.humidity}%`);
        cy.log(`Wind Speed: ${weatherData.wind.speed} m/s`);
      });
    });
  
    it('Handles invalid city name (404 error)', () => {
      const invalidCityName = 'InvalidCity';
  
      cy.request({
        method: 'GET',
        url: `http://api.openweathermap.org/data/2.5/weather?q=${invalidCityName}&appid=${apiKey}`,
        failOnStatusCode: false // Do not fail test on 404 error
      }).then((response) => {
        expect(response.status).to.eq(404); // Check if the request returns a 404 error
        expect(response.body.message).to.eq('city not found'); // Ensure the error message is as expected
  
        // Log the error message
        cy.log('Error message for invalid city name:');
        cy.log(response.body.message);
      });
    });
  
    it('Handles missing API key (401 error)', () => {
      const cityName = 'San Francisco';
  
      cy.request({
        method: 'GET',
        url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}`, // No API key provided
        failOnStatusCode: false // Do not fail test on 401 error
      }).then((response) => {
        expect(response.status).to.eq(401); // Check if the request returns a 401 error
        expect(response.body.message).to.eq('Invalid API key. Please see https://openweathermap.org/faq#error401 for more info.');
  
        // Log the error message
        cy.log('Error message for missing API key:');
        cy.log(response.body.message);
      });
    });
  });