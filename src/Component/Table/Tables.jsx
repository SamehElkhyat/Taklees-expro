import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const Brookers = [
  { fullName: "وسيط 1", email: "broker1@example.com", count: 30 },
  { fullName: "وسيط 2", email: "broker2@example.com", count: 80 },
  { fullName: "وسيط 3", email: "broker3@example.com", count: 5 },
];

const getStars = (count) => {
  const fullStars = Math.min(5, Math.floor(count / 25) + 1);
  return (
    <>
      {[...Array(5)].map((_, index) =>
        index < fullStars ? (
          <StarIcon key={index} sx={{ color: "#fdd835" }} />
        ) : (
          <StarBorderIcon key={index} sx={{ color: "#fdd835" }} />
        )
      )}
    </>
  );
};

const CustomTable = () => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: "100%", overflowX: "auto", bgcolor: "#f9f9f9", p: 2 }}>
      <Table sx={{ minWidth: 300 }} aria-label="custom table">
        <TableHead>
          <TableRow sx={{ bgcolor: "primary.main" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>الوسيط</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>البريد الالكتروني</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>التقييم</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>الطلبات المنجزة</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Brookers.map((item, index) => (
            <TableRow key={index} sx={{ "&:nth-of-type(odd)": { bgcolor: "#e3f2fd" } }}>
              <TableCell sx={{ textAlign: "center" }}>{item.fullName}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{item.email}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{getStars(item.count)}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{item.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;