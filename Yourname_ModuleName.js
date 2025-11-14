const { flights } = require('./database.js');

module.exports = {
  //Function #1 - Sort flights based on popularity OR range between minimum and maximum price
  sortFlights({ popularity = null, minimumPrice = null, maximumPrice = null } = {}) {
    console.log("======== Function #1: Sorted Flights ========")
    console.log("N. Airline - Departure => Arrival\n");
    
    //When the "popularity" variable is only passed
    if (minimumPrice == null && maximumPrice == null && popularity !== null) {
      flights.sort((min, max) => max.rating - min.rating);

      flights.forEach((flight, index) => {
        console.log(`${index + 1}. ${flight.flight_name} - ${flight.departure.location} => ${flight.arrival.location}`);
        console.log(`Popularity Rate: ${flight.rating}\n`);
      })
    }
    
    //Safety check when no parameters are passed, display all flights instead 
    else if (minimumPrice == null && maximumPrice == null && popularity == null) {
      console.log('Please enter sorting options to see filtered results');
      console.log('You can sort by popularity, or a range of prices (maximum & minimum)\n');
      console.log('Available Flights: ');
      flights.forEach((flight, index) => {
        console.log(`${index + 1}. ${flight.flight_name} - ${flight.departure.location} => ${flight.arrival.location}`);
      });
    }

    //When "maximumPrice" & "minimumPrice" is passed
    else {
      const priceRangeFlights = flights.filter((flight) => {
        //Check if AT LEAST ONE date meets the price criteria.
        return flight.flight_dates.some((date) => {
          const single = date.single_price;
          const round = date.round_price;

          //Check if a price is valid and within range
          const isPriceInRange = (price) => {
            // Ensures price is a number and is in range
            return typeof price === 'number' &&
              price > minimumPrice &&
              price < maximumPrice;
          };

          return isPriceInRange(single) || isPriceInRange(round);
        });
      });

      priceRangeFlights.forEach((flight) => {
        flight.flight_dates.forEach((date, index) => {
          console.log(`${index + 1}. ${flight.flight_name} - ${flight.departure.location} => ${flight.arrival.location}`);
          console.log(`Date to Depart: ${date.date}`);
          console.log(`Single-Trip Flight: \$${date.single_price}`);
          console.log(`Round-Trip Flight: ${date.round_price ? `$${date.round_price}` : 'No flight'}\n`);
        })
      })
    }
  }
}