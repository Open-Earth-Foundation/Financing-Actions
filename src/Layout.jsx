import React from "react";
import {NavBar} from "./components/NavBar.tsx";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
        <NavBar/>
      <header className="bg-blue-600 p-4 text-white">
        <h1 className="text-xl">{("layout-title")}</h1> // TODO NINA translate
      </header>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
};

export default Layout;
