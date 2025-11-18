const { flights, booked_flights } = require('./database.js');

module.exports = {
  //Function #1 - Sort flights based on airline
  sortFlightsByAirline(airline) {
    console.log("\n======== Function #1: Sorted Flights based on airline ========")
    console.log("N. Airline - Departure => Arrival\n");

    let index = 1;

    //Safety check when no parameters are passed, display all flights instead 
    if (airline == null) {
      console.log('Please enter airline name to see filtered results\n');
      console.log('Available Flights: ');
      flights.forEach((flight, index) => {
        console.log(`${index + 1}. ${flight.flight_name} - ${flight.departure.location} => ${flight.arrival.location}`);
      });
    } else {
      //Only one airline (string) is passed
      if (!Array.isArray(airline)) {
        flights.forEach((flight) => {
          if (airline == flight.flight_name) {
            console.log(`${index}. ${flight.flight_name} - ${flight.departure.location} => ${flight.arrival.location}`);
            index++;
          }
        })
      }
      //Multiple airlines
      else {
        airline.forEach((a) => {
          flights.forEach((flight) => {
            if (a == flight.flight_name) {
              console.log(`${index}. ${flight.flight_name} - ${flight.departure.location} => ${flight.arrival.location}`);
              index++;
            }
          })
        })
      }
    }
  },

  //Function #2 - Sort flights based on range between minimum and maximum price
  sortFlightsByMaxMinPrice({ minimumPrice = null, maximumPrice = null } = {}) {
    console.log("\n======== Function #2: Sorted Flights based on minimum/maximum price ========")
    console.log("N. Airline - Departure => Arrival\n");

    let index = 1;

    //Safety check when no parameters are passed, display all flights instead 
    if (!minimumPrice && !maximumPrice) {
      console.log('Please enter sorting options (minimumPrice & maximumPrice) to see filtered results\n');
      console.log('Available Flights: ');
      flights.forEach((flight, index) => {
        console.log(`${index + 1}. ${flight.flight_name} - ${flight.departure.location} => ${flight.arrival.location}`);
      });
    } else {
      const priceRangeFlights = flights.filter(flight => {
        return flight.flight_dates.some(date => {
          const single = date.single_price;
          const round = date.round_price;

          // Helper function to check if a price is valid and within range
          const isPriceInRange = (price) => {
            // Ensures price is a number and is in range
            const isNumber = typeof price === 'number';

            if (minimumPrice !== null && maximumPrice !== null) {
              // Condition 1: When both maximumPrice and minimumPrice are set
              return isNumber && price >= minimumPrice && price < maximumPrice;
            } else if (minimumPrice == null) {
              // Condition 2: When only maximumPrice is set
              return isNumber && price < maximumPrice;
            } else {
              // Condition 3: When only minimumPrice is set
              return isNumber && price > minimumPrice;
            }
          };

          return isPriceInRange(single) || isPriceInRange(round);
        });
      })

      priceRangeFlights.forEach((flight) => {
        flight.flight_dates.forEach((date) => {
          console.log(`${index}. ${flight.flight_name} - ${flight.departure.location} => ${flight.arrival.location}`);
          console.log(`Date to Depart: ${date.date}`);
          console.log(`Single-Trip Flight: ${date.single_price ? `$${date.single_price}` : 'No flight'}`);
          console.log(`Round-Trip Flight: ${date.round_price ? `$${date.round_price}` : 'No flight'}\n`);
          index++;
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
      const filteredFlight = flights.find(flight =>
        flight.departure.location.toLowerCase() == departureCity.toLowerCase() &&
        flight.arrival.location.toLowerCase() == arrivalCity.toLowerCase() &&
        flight.flight_dates.find(d => d.date == departDate) &&
        flight.flight_class.find(c => c.class == cabinClass)
      )
      //Safety check when no flights matched with user input
      if (filteredFlight.length == 0) {
        console.log("No flights found. Please try again.");
      } else {
        //When the user wants to search for a two-way flight
        if (departRoundDate !== null) {
          roundTripFlight = flights.find(f => f.flight_number == filteredFlight.round_trip_flight_number);

          //Safety check when no two-way flights are found based on the date
          if (!roundTripFlight || !roundTripFlight.flight_dates.find(d => d.date == departRoundDate)) {
            console.log('No round trips found.');
            roundTripFlight = {};
          }
        }

        //Calculate the price based on cabin class
        const basePrice = filteredFlight.flight_dates.find(d => d.date == departDate).single_price;
        const priceIncrease = filteredFlight.flight_class.find(c => c.class == cabinClass).increase_percent;
        const finalPrice = basePrice * (priceIncrease / 100) + basePrice;

        //Return flight details
        const flightResult = {
          flight_number: filteredFlight.flight_number,
          flight_name: filteredFlight.flight_name,
          status: filteredFlight.flight_status?.type || filteredFlight.flight_status,
          departure: filteredFlight.departure,
          arrival: filteredFlight.arrival,
          cabin_class: cabinClass,
          depart_date: departDate,
          fare_price: `$${finalPrice}`,
          roundTripFlight
        }

        console.log(flightResult);
      }
    }
  },

  //Function #4 - Book a flight based on flight_number with essential information
  bookFlight(flightId, fullName, cabinClass, departDate) {
    console.log("\n======== Function #4: Book Flight ========");
    //Safety check when no/insufficient parameters are passed
    if (!flightId || !fullName || !cabinClass || !departDate) {
      console.log("Unable to book flight. Please fill the required fields.");
    } else {
      //Retrieve selected flight with fulfilled citeria
      const selectedFlight = flights.find(f =>
        f.flight_number.toLowerCase() == flightId.toLowerCase() &&
        f.flight_dates.find(d => d.date == departDate) &&
        f.flight_class.find(c => c.class == cabinClass)
      );

      if (selectedFlight) {
        //Deduct available seats when flight found
        let flight_date = selectedFlight.flight_dates.find(f => f.date == departDate);
        flight_date.availableSeats--;

        //Return flight details
        const flightResult = {
          booking_id: Math.random().toString(36).substring(2, 12).toUpperCase(),
          booking_name: fullName,
          flight_name: selectedFlight.flight_name,
          status: selectedFlight.flight_status?.type || selectedFlight.flight_status,
          departure: selectedFlight.departure,
          arrival: selectedFlight.arrival,
          seatNumber: 'TBC',
          cabinClass,
          departDate
        }
        //Put the booked flight in another JSON object (another table in the database)
        booked_flights.push(flightResult);

        console.log('Booked Successfully! Below is your confirmed flight details: ');
        console.log(flightResult);
      } else {
        //Safety check when parameters does not match with flight data
        console.log("Flight not found. Please relook and enter the required fields.");
      }
    }
  },

  //Function #5 - Retrieve flight information based on booked name
  displayBookedFlights(name) {
    console.log("\n======== Function #5: Display Booked Flights ========");
    //Safety check when no/insufficient parameters are passed
    if (!name) {
      console.log(`Unable to find booked flights. Please enter your booking name.`);
    } else {
      const userFlights = booked_flights.filter(flight => flight.booking_name.toLowerCase() == name.toLowerCase());
      //No flights found based on user input
      if (booked_flights.length == 0 || userFlights.length == 0) {
        console.log(`No booked flights under ${name}`);
      } else {
        console.log(`Flights found under ${name}! Please ensure flight details are correct.`);
        for (let i = 0; i < userFlights.length; i++) {
          const flight = userFlights[i];
          console.log(`\n--- Flight Record ${i + 1} ---`);

          // Loop through the keys of the object
          for (const key in flight) {
            // Check if the value is another object (like 'departure' or 'arrival')
            if (typeof flight[key] === 'object' && flight[key] !== null) {
              // Loop through the nested object's keys
              for (const nestedKey in flight[key]) {
                console.log(`${nestedKey}: ${flight[key][nestedKey]}`);
              }
            } else {
              // Display the key-value pair for simple properties
              console.log(`${key}: ${flight[key]}`);
            }
          }
        }
      }
    }

  }
}