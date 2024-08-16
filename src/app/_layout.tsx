import React from "react";
import { Slot } from "expo-router";
import { Provider } from "react-redux";
import store from "../store/store";

const Layout = () => (
  <Provider store={store}>
    <Slot />
  </Provider>
);

export default Layout;
