import { Outlet } from "react-router-dom";
import React from "react";
import NavBar from "../NavBar/NavBar.jsx";
import { motion } from "framer-motion";

export default function Layout() {

  return (
    <motion.div>
      <NavBar />
      <Outlet />
    </motion.div>
  );
}
