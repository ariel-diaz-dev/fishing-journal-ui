const insights =
{
    fishCaught: 10,
    timeSinceLastTrip: "2 days ago",
    mostUsedTackle: "7ft Medium Rod",
    mostCaughtSpecies: "Redfish",
    mostPopularLocation: "Flamingo, Everglades",
    mostSuccessfulLure: "Topwater Popper",
    bestCatchingTimes: ["Dawn", "Dusk"],
    successfulLures: ["Topwater Popper", "Soft Plastic Jerkbait"],
    averageFishPerTrip: 3,
    recordCatches: [
        {
            species: "Tarpon",
            length: "48 inches"
        },
        {
            species: "Snook",
            length: "32 inches"
        },
        {
            species: "Redfish",
            length: "28 inches"
        },
        {
            species: "Spotted Seatrout",
            length: "18 inches"
        }
    ],
    successByWeather: {
        sunny: 0.7,
        cloudy: 0.6,
        rainy: 0.4,
        windy: 0.5,
        calm: 0.8
    },
    averageFightPerTripByLocation: {
        "Flamingo, Everglades": 0.7,
        "Biscayne National Park": 0.6,
        "Card Sound": 0.5,
        "Key Largo": 0.4,
    }
};

export default insights;