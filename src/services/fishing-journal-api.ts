import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface FishingJournalEntry {
    id: number;
    date: string;
    location: string;
    species: string;
    weight: number;
}

export const fishingJournalApi = createApi({
    reducerPath: 'fishingJournalApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        getEntries: builder.query<FishingJournalEntry[], void>({
            query: () => 'entries',
        }),
        getEntryById: builder.query<FishingJournalEntry, number>({
            query: (id) => `entries/${id}`,
        }),
        addEntry: builder.mutation<void, Partial<FishingJournalEntry>>({
            query: (newEntry) => ({
                url: 'entries',
                method: 'POST',
                body: newEntry,
            }),
        }),
        updateEntry: builder.mutation<void, { id: number; entry: Partial<FishingJournalEntry> }>({
            query: ({ id, entry }) => ({
                url: `entries/${id}`,
                method: 'PUT',
                body: entry,
            }),
        }),
        deleteEntry: builder.mutation<void, number>({
            query: (id) => ({
                url: `entries/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetEntriesQuery,
    useGetEntryByIdQuery,
    useAddEntryMutation,
    useUpdateEntryMutation,
    useDeleteEntryMutation,
} = fishingJournalApi;