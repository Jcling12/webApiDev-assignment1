const { flights } = require('./database.js');

module.exports = {

  //Function #1 - Sort flights based on airline
  sortFlightsByAirline(airline) {
    console.log("\n======== Function #1: Sorted Flights based on airline ========")
    console.log("N. Airline - Departure => Arrival\n");
    //Safety check when no parameters are passed, display all flights instead 
    if (airline == null) {
      console.log('Please enter airline name to see filtered results\n');
      console.log('Available Flights: ');
      flights.forEach((flight, index) => {
        console.log(`${index + 1}. ${flight.flight_name} - ${flight.departure.location} => ${flight.arrival.location}`);
      });
    }
    //Only one airline (string) is passed
    else if (!Array.isArray(airline)) {
      let index = 1;
      flights.forEach((flight) => {
        if (airline == flight.flight_name) {
          console.log(`${index}. ${flight.flight_name} - ${flight.departure.location} => ${flight.arrival.location}`);
          index++;
        }
      })
    }
    //Multiple airlines
    else {
      let index = 1;
      airline.forEach((a) => {
        flights.forEach((flight) => {
          if (a == flight.flight_name) {
            console.log(`${index}. ${flight.flight_name} - ${flight.departure.location} => ${flight.arrival.location}`);
            index++;
          }
        })
      })
    }
  },

  //Function #2 - Sort flights based on range between minimum and maximum price
  sortFlightsByMaxMinPrice({ minimumPrice = null, maximumPrice = null } = {}) {
    console.log("\n======== Function #2: Sorted Flights based on minimum/maximum price ========")
    console.log("N. Airline - Departure => Arrival\n");

    //Safety check when no parameters are passed, display all flights instead 
    if (minimumPrice == null || maximumPrice == null) {
      console.log('Please enter sorting options (minimumPrice & maximumPrice) to see filtered results\n');
      console.log('Available Flights: ');
      flights.forEach((flight, index) => {
        console.log(`${index + 1}. ${flight.flight_name} - ${flight.departure.location} => ${flight.arrival.location}`);
      });
    } else {
      //When "maximumPrice" & "minimumPrice" is passed
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
  },

  //Function #3 - Search flights based on arrival city and departure date
  //User can additional specify departure city (default: Singapore), depature round flight date (for a matching two-way flight) and cabin class (default: Economy)
  searchFlight({ departureCity = 'Singapore', arrivalCity, departDate, departRoundDate = null, cabinClass = 'Economy' } = {}) {
    console.log("\n======== Function #3: Search Flights ========")
    let roundTripFlight = {};

    //Safety check when no/insufficient parameters are passed
    if (!arrivalCity || !departDate) {
      console.error('Arrival City and Departure Date are compulsory fields. Please enter...');
    }
    else {
      //Match flights based on user parameters
      const filteredFlights = flights.filter(flight =>
        flight.departure.location.toLowerCase() == departureCity.toLowerCase() &&
        flight.arrival.location.toLowerCase() == arrivalCity.toLowerCase() &&
        flight.flight_dates.find(d => d.date == departDate)
      )
      //Safety check when no flights matched with user input
      if (filteredFlights.length == 0) {
        console.log("No flights found. Please try again.");
      } else {
        //Only one flight is retrieved
        const flight = filteredFlights[0];

        //When the user wants to search for a two-way flight
        if (departRoundDate !== null) {
          roundTripFlight = flights.find(f => f.flight_number == flight.round_trip_flight_number);

          //Safety check when no two-way flights are found based on the date
          if (!roundTripFlight || !roundTripFlight.flight_dates.find(d => d.date == departRoundDate)) {
            console.log('No round trips found.');
            roundTripFlight = {};
          }
        }

        //Calculate the price based on cabin class
        const basePrice = flight.flight_dates.find(d => d.date == departDate).single_price;
        const priceIncrease = flight.flight_class.find(c => c.class == cabinClass).increase_percent;
        const finalPrice = basePrice * (priceIncrease / 100) + basePrice;

        //Return flight details
        const flightResult = {
          flight_number: flight.flight_number,
          flight_name: flight.flight_name,
          status: flight.flight_status?.type || flight.flight_status,
          departure: flight.departure,
          arrival: flight.arrival,
          cabin_class: cabinClass,
          depart_date: departDate,
          fare_price: `$${finalPrice}`,
          roundTripFlight
        }

        console.log(flightResult);
      }
    }
  }
}