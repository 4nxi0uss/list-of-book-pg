import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BookDataType, FAILED_STATUS, IDLE_STATUS, LOADING_STATUS, SUCCESS_STATUS } from '../Types/ReduxTypes'


const initialState: BookDataType = {
  error: "err",
  bookStatus: IDLE_STATUS,
  pageNumber: 1,
  data: {
    count: 0,
    next: "",
    previous: "",
    results: [{
      agents: [{
        id: 0,
        person: "",
        type: "",
      }],
      bookshelves: [""],
      description: "",
      downloads: 0,
      id: 0,
      languages: [""],
      license: "",
      resources: [{
        id: 0,
        uri: "",
        type: "",
      }],
      subjects: [""],
      title: "",
      type: ""
    }]
  },
}

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
    builder.addCase(getBookData.fulfilled, (state, action: PayloadAction<any>) => {
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
export const { incrementPageNumber, decrementPageNumber, setPageNumberByAmount} = bookDataSlice.actions

export default bookDataSlice.reducer
