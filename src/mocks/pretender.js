import Pretender from 'pretender';
import tackle from './tackle';
import trip from './trip';
import trips from './trips';

export default function startMockServer() {

  const server = new Pretender(function () {
    this.get('http://localhost:4000/api/v1/trips', () => {
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify(trips)];
    });

    this.get('http://localhost:4000/api/v1/trips/:id', (request) => {
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify(trip)];
    });

    this.post('http://localhost:4000/api/v1/trips', (request) => {
      const newTrip = JSON.parse(request.requestBody);
      const trip = { ...newTrip, id: `trip-${Date.now()}` };
      trips.push(trip);
      return [201, { 'Content-Type': 'application/json' }, JSON.stringify(trip)];
    });

    this.put('http://localhost:4000/api/v1/trips/:id', (request) => {
      const updatedTrip = JSON.parse(request.requestBody);
      const index = trips.findIndex(t => t.id === request.params.id);
      trips[index] = { ...updatedTrip, id: request.params.id };
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify(trips[index])];
    });

    this.get('http://localhost:4000/api/v1/tackle', () => {
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify(tackle)];
    });

    this.post('http://localhost:4000/api/v1/tackle', (request) => {
      const newTackle = JSON.parse(request.requestBody);
      const tackleItem = { ...newTackle, id: `tackle-${Date.now()}` };
      tackle.push(tackleItem);
      return [201, { 'Content-Type': 'application/json' }, JSON.stringify(tackleItem)];
    });

    this.put('http://localhost:4000/api/v1/tackle/:id', (request) => {
      const updatedTackle = JSON.parse(request.requestBody);
      const index = tackle.findIndex(t => t.id === request.params.id);
      tackle[index] = { ...updatedTackle, id: request.params.id };
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify(tackle[index])];
    });

    this.get('http://localhost:4000/api/v1/forecast', () => {
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify({
        temperature: 28,
        windSpeed: 12,
        windDirection: "NE",
        tides: {
          firstHigh: "05:45",
          firstLow: "11:30",
          secondHigh: "18:15",
          secondLow: "00:20"
        },
        waterTemperature: 26,
        conditions: "Sunny with occasional clouds"
      })];
    });

    this.get('http://localhost:4000/api/v1/insights', () => {
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify({
        bestCatchingTimes: ["Dawn", "Dusk"],
        popularSpecies: ["Snook", "Redfish", "Tarpon"],
        successfulLures: ["Topwater Popper", "Soft Plastic Jerkbait"],
        topLocations: ["Flamingo, Everglades"]
      })];
    });

    // Add delay to simulate network latency
    this.timing = 500;
  });

  // Log all requests to console
  server.handledRequest = function (verb, path, request) {
    console.log(`[Pretender] ${verb} ${path}`, request);
  };

  return server;
}
