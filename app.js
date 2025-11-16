const { 
  sortFlightsByAirline,
  sortFlightsByMaxMinPrice,
  searchFlight,
} = require('./LingJunChen_flightBooking.js');

//Function #1
/* sortFlightsByAirline();
sortFlightsByAirline("Scoot");
sortFlightsByAirline(["Singapore Airlines", "Scoot"]); */

//Function #2
/* sortFlightsByMaxMinPrice();
sortFlightsByMaxMinPrice({"minimumPrice": 800, "maximumPrice": 1000}); */

//Function #3

/* searchFlight();

//Example of producing a one-way flight, as there is no flights back on 02-09-2026
searchFlight({'arrivalCity': 'Shanghai, China', 'departDate': '30-08-2026', 'departRoundDate': '02-09-2026'})

//Another example of producing a one-way flight, as there is no flights back on 10-12-2025
searchFlight({'arrivalCity': 'Ho Chi Minh City, Vietnam', 'departDate': '10-12-2025', 'departRoundDate': '10-12-2025', 'cabinClass': 'Business'});

//Example of naming another departureCity
searchFlight({'departureCity': 'London Borough of Hillingdon, London', 'arrivalCity': 'Singapore', 'departDate': '22-10-2026', 'cabinClass': 'Business'}); */

