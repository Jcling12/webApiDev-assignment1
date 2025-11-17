const { 
  sortFlightsByAirline,
  sortFlightsByMaxMinPrice,
  searchFlight,
  bookFlight,
  displayBookedFlights
} = require('./LingJunChen_flightBookingSystem.js');

//Function #1
/* sortFlightsByAirline();
sortFlightsByAirline("Scoot");
sortFlightsByAirline(["Singapore Airlines", "Scoot"]); */

//Function #2
/* sortFlightsByMaxMinPrice();
sortFlightsByMaxMinPrice({"minimumPrice": 800, "maximumPrice": 1000}); */

//Function #3

 //searchFlight();

/* //Example of producing a one-way flight, as there is no flights back on 02-09-2026
searchFlight({'arrivalCity': 'Shanghai, China', 'departDate': '30-08-2026', 'departRoundDate': '02-09-2026'})

//Example of producing a two-way flight
searchFlight({'arrivalCity': 'Ho Chi Minh City, Vietnam', 'departDate': '10-12-2025', 'departRoundDate': '12-12-2025', 'cabinClass': 'Business'});

//Example of naming another departureCity
searchFlight({'departureCity': 'London Borough of Hillingdon, London', 'arrivalCity': 'Singapore', 'departDate': '22-10-2026', 'cabinClass': 'Business'});  */

//Function #4
bookFlight();
//Successful booked flights
bookFlight("SQ203", "John Doe", "Business", "10-12-2025");

bookFlight("MU545", "Jun Chen", "First Class", "03-09-2026");
bookFlight("MU546", "Jun Chen", "Economy", "10-09-2026");

//Denied as no departure date example
bookFlight("TR890", "Mary Tan", "Economy", "21-11-2025");

//Function #5
displayBookedFlights("Jun Chen");
