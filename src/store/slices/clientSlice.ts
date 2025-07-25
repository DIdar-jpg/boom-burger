import { createSlice, type PayloadAction, createSelector } from '@reduxjs/toolkit';
import { type RootState } from '@/store/store'; // Убедись, что путь корректен
import { type Client } from '@/entities'

type ClientState = Client;

const initialState: ClientState = {
   name: "",
   number: "",
   adress: "",
   note: undefined,
};

const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
      setClient: (_state, action: PayloadAction<Client>): Client => {
         return action.payload;
      },
      clearClient: () => {
         return initialState; 
      },
      updateClientField: (state, action: PayloadAction<{ field: keyof Client; value: string }>) => {
         if (state) {
               state[action.payload.field] = action.payload.value;
         }
      },
    },
});

export const { setClient, clearClient, updateClientField } = clientSlice.actions;

export default clientSlice.reducer;

// Селекторы остаются без изменений
export const selectClient = (state: RootState) => state.client;

export const selectClientName = createSelector(
    [selectClient],
    (client) => client?.name || ''
);

export const selectClientNumber = createSelector(
    [selectClient],
    (client) => client?.number || ''
);

export const selectClientAddress = createSelector(
    [selectClient],
    (client) => client?.adress || ''
);

export const selectClientNote = createSelector(
    [selectClient],
    (client) => client?.note || 'Ther is no notes.'
);