import React from 'react';
import Header from "../header/header";
import {Outlet} from "react-router-dom";


const Layout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  );
};

export {Layout};