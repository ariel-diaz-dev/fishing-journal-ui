import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const fishingJournalApi = createApi({
    reducerPath: 'fishingJournalApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/v1/' }),
    endpoints: (builder) => ({
        getTrips: builder.query({
            query: () => 'trips',
        }),
        getTripById: builder.query({
            query: (id) => `trips/${id}`,
        }),
        addTrip: builder.mutation({
            query: (newTrip) => ({
                url: 'trips',
                method: 'POST',
                body: newTrip,
            }),
        }),
        updateTrip: builder.mutation({
            query: ({ id, ...updatedTrip }) => ({
                url: `trips/${id}`,
                method: 'PUT',
                body: updatedTrip,
            }),
        }),
        getForecast: builder.query({
            query: () => 'forecast',
        }),
        getTackle: builder.query({
            query: () => 'tackle',
        }),
        addTackle: builder.mutation({
            query: (newTackle) => ({
                url: 'tackle',
                method: 'POST',
                body: newTackle,
            }),
        }),
        updateTackle: builder.mutation({
            query: ({ id, ...updatedTackle }) => ({
                url: `tackle/${id}`,
                method: 'PUT',
                body: updatedTackle,
            }),
        }),
        getInsights: builder.query({
            query: () => 'insights',
        }),
    }),
});

export const {
    useGetTripsQuery,
    useGetTripByIdQuery,
    useAddTripMutation,
    useUpdateTripMutation,
    useGetForecastQuery,
    useGetTackleQuery,
    useAddTackleMutation,
    useUpdateTackleMutation,
    useGetInsightsQuery,
} = fishingJournalApi;

export default fishingJournalApi;