import React from "react";
import { Slot } from "expo-router";
import { Provider } from "react-redux";
import store from "../store/store";
import FetchLocation from "../features/fetchLocation/fetchLocation";
import Push from "../utils/pushNotification";

const Layout = () => {
  return (
    <Provider store={store}>
      <Push />
      <FetchLocation />
      <Slot />
    </Provider>
  );
};

export default Layout;
