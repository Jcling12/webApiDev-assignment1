# ✈️ Flight Booking System
Name: Ling Jun Chen<br>
Class: L2<br>
Admin Number: 232702Y

## Project Description

This is a NodeJS module that simulates a simple flight booking system. Below are the following functions that you can use to manage and retrieve flight data:

1. Sort flights by **airline**
2. Sort flights by a **range** of prices
3. Search flight based on **destination location** and **departure date**
4. Book a flight
5. Display booked flights based on user identity

## ⚙️Setup

1. Open your working folder in VS Code and open your terminal (Or press `` Ctrl + ` `` )
2. Clone the repository to your local directory by copying & pasting the code in the terminal:
```
git clone https://github.com/Jcling12/webApiDev-assignment1.git
```
3. Move into the project directory by entering the following command below:
```
cd .\webApiDev-assignment1\  # (may be different depending on the terminal's directory)
```
4. You can test out the functions by typing in the terminal below:
```
nodemon app.js
```

## Database Structure

Below describes the following flight details:
```
flight
├── flight_number             # Unqiuely identifies a flight
├── flight_name
├── flight_status
├── flight_dates              # Array of dates, single trip & round trip prices
├── flight_class              # Array of airline class and percentage increase in price
├── round_trip_flight_number  # Link with round trip flight if available
├── departure                 # Contains departure city, airport, terminal, gate & time of departure
├── arrival                   # Contains arrival city, airport, terminal, gate & time of arrival
```
### Limitations

As this module is a simple application, flight data is based on a static dataset, lacking real-time availability, dynamic pricing, and comprehensive coverage of all global routes and airlines. Below lists the main limitations you need to know: 
- All flights are direct (no stopovers)
- All flights are travelling to/from Singapore
- Some flights do not offer round trip flights (not mentioned "round_price" in these flights)
- Flight status limited to "Scheduled" and "Delayed" (for earlier date flights)

## ⚠️ Functions

### `sortFlightsByAirline()` - Sort all flights by airline

**Parameter:**
- `airline`: Airline(s) providing flights

<i>This function can accept **multiple flights** by encapsulating with an array</i>

**Examples:**
```js
sortFlightsByAirline("Scoot");
sortFlightsByAirline(["Singapore Airlines", "Scoot"]); 
```

**Output**
```
======== Function #1: Sorted Flights based on airline ========
N. Airline - Departure => Arrival

1. Scoot - Singapore => Seoul, South Korea

======== Function #1: Sorted Flights based on airline ========
N. Airline - Departure => Arrival

1. Singapore Airlines - Singapore => Ho Chi Minh City, Vietnam
2. Singapore Airlines - Ho Chi Minh City, Vietnam => Singapore
3. Scoot - Singapore => Seoul, South Korea
```
<br>

### `sortFlightsByMaxMinPrice()` - Sort all flights by a range of prices

**Parameters:**
- `minimumPrice`: Minimum price of a flight
- `maximumPrice`: Maximum price of a flight

<i>This function can accept **either or both** parameters</i>

**Examples:**
```js
sortFlightsByMaxMinPrice({"minimumPrice": 400, "maximumPrice": 1000}); //Flights between 400-1000
sortFlightsByMaxMinPrice({"minimumPrice": 800}); //Flights less than 800
sortFlightsByMaxMinPrice({"maximumPrice": 250}); //Flights greater than 250
```

**Output (First Function)**
```
======== Function #2: Sorted Flights based on minimum/maximum price ========
N. Airline - Departure => Arrival

1. Singapore Airlines - Singapore => Ho Chi Minh City, Vietnam
Date to Depart: 10-12-2025
Single-Trip Flight: $390
Round-Trip Flight: No flight

2. Singapore Airlines - Singapore => Ho Chi Minh City, Vietnam
Date to Depart: 15-12-2025
Single-Trip Flight: $370
Round-Trip Flight: $464

3. Singapore Airlines - Singapore => Ho Chi Minh City, Vietnam
Date to Depart: 18-12-2025
Single-Trip Flight: $380
Round-Trip Flight: $440

4. British Airways - London Borough of Hillingdon, London => Singapore
Date to Depart: 22-10-2026
Single-Trip Flight: $880
Round-Trip Flight: $1080

//Run in your VS code to see outputs for the other functions
```
<br>

### `searchFlight()` - Search a flight based on arrival city & departure date

**Parameters:**
- `departureCity`: Default value -> Singapore
- `arrivalCity`: **Complusory**
- `departDate`: **Complusory**
- `departRoundDate`: Default value -> null
- `cabinClass`: Default value -> Economy

<i>The user can additionally specify departure city, departure round flight date if the user requires and type of cabin class </i>

**Examples:**
```js
//Simplest example of producing a one-way flight
searchFlight({'departureCity': 'Ho Chi Minh City, Vietnam', 'arrivalCity': 'Singapore', 'departDate': '12-12-2025'})

//Example of inputting a two-way flight, but one-way flight is produced as there is no flights back on 02-09-2026
searchFlight({'arrivalCity': 'Shanghai, China', 'departDate': '30-08-2026', 'departRoundDate': '02-09-2026'})

//Example of producing a two-way flight
searchFlight({'arrivalCity': 'Ho Chi Minh City, Vietnam', 'departDate': '10-12-2025', 'departRoundDate': '12-12-2025', 'cabinClass': 'Business'});

//Example with inputting departureCity
searchFlight({'departureCity': 'London Borough of Hillingdon, London', 'arrivalCity': 'Singapore', 'departDate': '22-10-2026', 'cabinClass': 'Business'});

```

<br>

### `bookFlight()` - Book a flight

**Parameters:**
- `flightId`: Identify flight number
- `fullName`: Booking name
- `cabinClass`: Select cabin class type
- `departDate`: Date of departure

<i>This function requires all parameters</i>

**Examples:**
```js
bookFlight("SQ203", "John Doe", "Business", "10-12-2025");
bookFlight("MU545", "Jun Chen", "First Class", "03-09-2026");
bookFlight("MU546", "Jun Chen", "Economy", "10-09-2026");
```

**Output**
```js
Booked Successfully! Below is your confirmed flight details:
{
  booking_id: 'QYY9R5KAIR',
  booking_name: 'John Doe',
  flight_name: 'Singapore Airlines',
  status: 'Delayed',
  departure: {
    location: 'Singapore',
    airport: 'Changi Airport',
    time: '12:30',
    terminal: 2,
    gate: 'B35'
  },
  arrival: {
    location: 'Ho Chi Minh City, Vietnam',
    airport: 'Tan Son Nhat International Airport',
    time: '14:45',
    terminal: 1,
    gate: 'A18'
  },
  seatNumber: 'TBC',
  cabinClass: 'Business',
  departDate: '10-12-2025'
}

```
<br>

### `displayBookedFlights()` - Retrieve flight infomation based on booked name

**Parameter:**
- `name`: Flight booking name

<i>This function requires all parameters. This function can only be used when there are booked flights.</i>

**Examples:**
```js
displayBookedFlights("Jun Chen");
```

**Output**
```
Flights found under Jun Chen! Please ensure flight details are correct.

--- Flight Record 1 ---
booking_id: ZWZWDNRUU3
booking_name: Jun Chen
flight_name: China Eastern
status: Scheduled
location: Shanghai, China
airport: Shanghai Pudong International Airport
time: 10:50
terminal: 2
gate: D90
location: Singapore
airport: Changi Airport
time: 16:40
terminal: 3
gate: B2
seatNumber: TBC
cabinClass: First Class
departDate: 03-09-2026

--- Flight Record 2 ---
booking_id: 7Q64WH3GJ3
booking_name: Jun Chen
flight_name: China Eastern
status: Scheduled
location: Singapore
airport: Changi Airport
time: 09:30
terminal: 3
gate: B2
location: Shanghai, China
airport: Shanghai Pudong International Airport
time: 13:10
terminal: 2
gate: D90
seatNumber: TBC
cabinClass: Economy
departDate: 10-09-2026
```
<br>

# References
**Singapore Airlines** → https://www.singaporeair.com/en_UK/sg/home#/book/bookflight

![SingaporeAirlines](images/Singapore%20Airlines%20Reference.png)

**Trip.com** → https://sg.trip.com/flights

![Trip.com](images/Trip.com%20Reference.png)

**Flight API Reference** → https://docs.apilayer.com/aviationstack/docs/aviationstack-api-v-1-0-0#/default/getFlights
