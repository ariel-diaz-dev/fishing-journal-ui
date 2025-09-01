# fishing-journal-ui
UI for the Fishing Journal App

# Components
- Topnav
- Footer
- Map
- Tides
- WeatherWidget
- Calendar

# Views
- NewFishingTripPage
- FishingTripList
- FishingTripDetails
- TackleList
- NewTackleDialog
- FishingInsights

# API Endpoints
- GET   /trips
- GET   /trips/:id
- POST  /trips
- PUT   /trips/:id
- GET   /forecast
- GET   /tackle
- POST  /tackle
- PUT   /tackle/:id
- GET   /insights

# Google Maps API Key
Google Maps API (Fishing Journal)
API Key Restricted to IP Addresses



--------------------------2.0---------------------------

# Updated Vision
- App is only for saving fishing reports after they're finished, the app is not for planning a fishing trip.
- When you go into a saved fishing report, it is read-only mode. It's only when you click on Edit, that it lets you update the details of the fishing report.


# TODO
- UI changes first
- API integration after
- Implement read-only mode for saved fishing reports
- Add edit functionality to update fishing report details
- Update the existing mocked API functionality to match the real API models
- Set up API endpoints for trips, forecast, tackle, and insights
- Secure API key with IP address restrictions