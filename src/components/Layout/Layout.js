import React from "react";
import Container from "../Container/Container";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <div style={{height:"100hv"}}>
      <Header />
      <Container />
      <Footer />
    </div>
  );
};

export default Layout;
