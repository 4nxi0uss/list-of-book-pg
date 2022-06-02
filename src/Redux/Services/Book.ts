// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const gutenbergProjectApi = createApi({
  reducerPath: 'gpBook',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://gnikdroy.pythonanywhere.com/api/' }),
  endpoints: (builder) => ({
    getAuthorByName: builder.query<any, string>({
      query: (name = "") => `book/${name}`,
    }),
  }),
})
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAuthorByNameQuery } = gutenbergProjectApi;