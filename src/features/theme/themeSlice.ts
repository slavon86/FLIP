import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
    value: string;
}

const initialState: ThemeState = {
    value: "theme-1",
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
