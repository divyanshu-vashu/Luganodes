import { Box } from "@mui/material";
import React from "react";
import BgHeader from "../BgHeader";
import Navbar from "../Navbar";
import SearchBox from "../SearchBox";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />

      <BgHeader />

      <Box sx={{ position: "relative", zIndex: 999, mt: -9 }}>
        <SearchBox />
      </Box>

      {children}
    </>
  );
};

export default Layout;
