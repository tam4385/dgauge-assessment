import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage as default storage

const persist = true;

export interface RootState {
  userName: string;
  apiConnected: boolean;
}

// Define the initial state
const initialState: RootState = {
  userName: "",
  apiConnected: false,
};

// Update the reducer to handle the SET_USER_NAME action
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_USER_NAME":
      return {
        ...state,
        userName: action.payload, // Update the userName in the state
      };
    case "SET_CONNECTED":
      return {
        ...state,
        apiConnected: action.payload, // Update the userName in the state
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

// Configure redux-persist
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

// Create the store with the persisted reducer
const store = createStore(persistedReducer);

// Create the persister

export const persister = persist ? persistStore(store) : null;

export type AppDispatch = typeof store.dispatch;
export default store;
