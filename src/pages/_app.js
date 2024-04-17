import '../styles/globals.css';
import Head from 'next/head';

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";

//Imports pour pouvoir utiliser les calendriers dans tout le site
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import 'moment/locale/fr' //Pour mettre les heures et dates au format GB similaire à FR


import { Provider } from "react-redux";

const reducers = combineReducers({ user });
const persistConfig = { key: "barTist", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="fr">
          <Head>
            <title>BarTist</title>
          </Head>
          <Component {...pageProps} />
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
