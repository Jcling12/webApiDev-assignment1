const flights = [
  //Main flights
  {
    "flight_number": "SQ203",
    "flight_name": "Singapore Airlines",
    "rating": "4.9",
    "flight_status": {
      "type": "Delayed",
      "time_delay": 2.5
    },
    "flight_dates": [
      {
        "date": "10-12-2025",
        "single_price": 390.00
      },
      {
        "date": "15-12-2025",
        "single_price": 370.00,
        "round_price": 464.00,
      },
      {
        "date": "18-12-2025",
        "single_price": 380.00,
        "round_price": 440.00
      }
    ],
    "round_trip_flight_number": "SQ204",
    "departure": {
      "location": "Singapore",
      "airport": "Changi Airport",
      "time": "12:30",
      "terminal": 2,
      "gate": "B35",
    },
    "arrival": {
      "location": "Ho Chi Minh City, Vietnam",
      "airport": "Tan Son Nhat International Airport",
      "time": "14:45",
      "terminal": 1,
      "gate": "A18",
    },
  },

  //Round-trip flight for SQ203 or Single trip from Tan Son Nhat
  {
    "flight_number": "SQ204",
    "flight_name": "Singapore Airlines",
    "rating": "4.8",
    "flight_status": "Scheduled",
    "flight_dates":
      [
        {
          "date": "12-12-2025",
          "single_price": 250.40
        },
        {
          "date": "13-12-2025",
          "single_price": 280.00
        },
        {
          "date": "15-12-2025",
          "single_price": 260.00,
          "round_price": 315.00,
        },
        {
          "date": "18-02-2026",
          "single_price": 240.00,
          "round_price": 320.20
        },
      ],
    "round_trip_flight_number": "SQ203",
    "departure": {
      "location": "Ho Chi Minh City, Vietnam",
      "airport": "Tan Son Nhat International Airport",
      "time": "18:30",
      "terminal": 2,
      "gate": "E03",
    },
    "arrival": {
      "location": "Singapore",
      "airport": "Changi Airport",
      "time": "20:45",
      "terminal": 2,
      "gate": "B36",
    },
  },

  {
    "flight_number": "MU545",
    "flight_name": "China Eastern",
    "rating": "4.2",
    "flight_status": "Scheduled",
    "flight_dates": [
      {
        "date": "03-09-2026",
        "single_price": 350.00,
        "round_price": 285.00
      },
      {
        "date": "10-09-2026",
        "single_price": 380.00,
        "round_price": 310.00
      }
    ],
    "round_trip_flight_number": "MU546",
    "departure": {
      "location": "Shanghai, China",
      "airport": "Shanghai Pudong International Airport",
      "time": "10:50",
      "terminal": 2,
      "gate": "D90"
    },
    "arrival": {
      "location": "Singapore",
      "airport": "Changi Airport",
      "time": "16:40",
      "terminal": 3,
      "gate": "B2"
    }
  },

  //Round-trip flight for MU545 or Single trip from ShangHai
  {
    "flight_number": "MU546",
    "flight_name": "China Eastern",
    "rating": "4.5",
    "flight_status": "Scheduled",
    "flight_dates": [
      {
        "date": "30-08-2026",
        "single_price": 290.00
      },
      {
        "date": "01-09-2026",
        "single_price": 310.00
      },
      {
        "date": "03-09-2026",
        "single_price": 305.20,
        "round_price": 340.00
      },
      {
        "date": "10-09-2026",
        "round_price": 300.00
      }
    ],
    "departure": {
      "location": "Singapore",
      "airport": "Changi Airport",
      "time": "09:30",
      "terminal": 3,
      "gate": "B2"
    },
    "arrival": {
      "location": "Shanghai, China",
      "airport": "Shanghai Pudong International Airport",
      "time": "13:10",
      "terminal": 2,
      "gate": "D90"
    }
  },

  //Single Flights
  {
    "flight_number": "TR890",
    "flight_name": "Scoot",
    "rating": "3.7",
    "flight_status": {
      "type": "Delayed",
      "time_delay": 1.0
    },
    "flight_dates": [
      {
        "date": "20-11-2025",
        "single_price": 289.00
      },
      {
        "date": "23-11-2025",
        "round_price": 269.70
      }
    ],
    "departure": {
      "location": "Singapore",
      "airport": "Changi Airport",
      "time": "06:00",
      "terminal": 1,
      "gate": "D3"
    },
    "arrival": {
      "location": "Seoul, South Korea",
      "airport": "Incheon International Airport",
      "time": "13:30",
      "terminal": 1,
      "gate": "115"
    },
  },

  {
    "flight_number": "BA15",
    "flight_name": "British Airways",
    "rating": "4.6",
    "flight_status": "Scheduled",
    "flight_dates": [
      {
        "date": "22-10-2026",
        "single_price": 880.00,
        "round_price": 1080.00
      }
    ],
    "departure": {
      "location": "London Borough of Hillingdon, London",
      "airport": "London Heathrow Airport",
      "time": "21:30",
      "terminal": 5,
      "gate": "A10"
    },
    "arrival": {
      "location": "Singapore",
      "airport": "Changi Airport",
      "time": "18:25",
      "terminal": 1,
      "gate": "C1"
    },
  }
]

const main_users = {

}

const passengers = {

}

const booked_flights = {

}

module.exports = {
  flights,
  passengers
}

