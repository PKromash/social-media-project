"use client";

import {SessionProvider} from "next-auth/react";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import Reducers from "../redux/reducers/index";
import {ChakraProvider} from "@chakra-ui/react";

const store = configureStore({
  reducer: Reducers,
  middleware: [thunk],
});

const ProviderWrapper = ({children, session}) => {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <ChakraProvider>{children}</ChakraProvider>
      </SessionProvider>
    </Provider>
  );
};

export default ProviderWrapper;
