import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BookDataType, FAILED_STATUS, IDLE_STATUS, LOADING_STATUS, OptionDataType, SUCCESS_STATUS } from '../Types/ReduxTypes'

const initialState: OptionDataType & BookDataType = {
    error: "err",
    langOptionStatus: IDLE_STATUS,
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

// set query
export const getLangOptionData = createAsyncThunk("books/getLang", async (query: string) => {

    try {
        const data = await fetch(`https://gnikdroy.pythonanywhere.com/api/language/${query}`, {
            method: 'GET',
        })
        const result = data.json()
        return await result
    } catch (error) {
        throw await error
    }
})

export const LangOptionDataSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLangOptionData.pending, (state) => {
            state.langOptionStatus = LOADING_STATUS
        })
        builder.addCase(getLangOptionData.fulfilled, (state, action: PayloadAction<BookDataType["data"]>) => {
            state.data = action.payload
            state.langOptionStatus = SUCCESS_STATUS
        })
        builder.addCase(getLangOptionData.rejected, (state) => {
            state.langOptionStatus = FAILED_STATUS
        })
    },
})

// Action creators are generated for each case reducer function

export default LangOptionDataSlice.reducer
