import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BookDataType, FAILED_STATUS, IDLE_STATUS, LOADING_STATUS, StatusPageDataType, SUCCESS_STATUS } from '../Types/ReduxTypes'

const initialState: BookDataType & StatusPageDataType = {
  error: "err",
  bookStatus: IDLE_STATUS,
  pageNumber: 1,
  data: {
    count: 0,
    next: "",
    previous: "",
    results: [{
      id: 0,
      languages: [""],
      resources: [{
        id: 0,
        uri: "",
        type: "",
      }],
      title: "",
    }]
  },
}

// set a query 
export const getBookData = createAsyncThunk("books/getBook", async (query: string) => {

  try {
    const data = await fetch(`https://gnikdroy.pythonanywhere.com/api/book/${query}`, {
      method: 'GET',
    })
    const result = data.json()
    return await result
  } catch (error) {
    throw await error
  }
})

export const bookDataSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    incrementPageNumber: (state) => {
      state.pageNumber += 1
    },
    decrementPageNumber: (state) => {
      state.pageNumber -= 1
    },
    setPageNumberByAmount: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getBookData.pending, (state) => {
      state.bookStatus = LOADING_STATUS
    })
    builder.addCase(getBookData.fulfilled, (state, action: PayloadAction<BookDataType["data"]>) => {
      state.data = action.payload
      state.bookStatus = SUCCESS_STATUS
    })
    builder.addCase(getBookData.rejected, (state, action: PayloadAction<any>) => {
      state.bookStatus = FAILED_STATUS
      state.error = action.payload
    })
  },
})

// Action creators are generated for each case reducer function
export const { incrementPageNumber, decrementPageNumber, setPageNumberByAmount } = bookDataSlice.actions

export default bookDataSlice.reducer
