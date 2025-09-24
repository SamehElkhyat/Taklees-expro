import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export default function UserPayment() {
  const navigate = useNavigate();
  const SendAmount = async (amount) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Payment`,
        { Amount: amount.Amount },
        {
          withCredentials: true,
        }
      );
      toast.success("تم الدفع بنجاح");
      navigate(data.approveUrl);
    } catch (error) {
      toast.error("فشلت العمليه");
    }
  };
  let formik = useFormik({
    initialValues: {
      Amount: "",
    },
    onSubmit: SendAmount,
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Card
            sx={{ maxWidth: 420, width: "100%", boxShadow: 3, borderRadius: 3 }}
          >
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                الدفع الإلكتروني
              </Typography>
              <Form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Form.Group controlId="Amount">
                      <Form.Label>المبلغ</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="المبلغ"
                        name="Amount"
                        value={formik.values.Amount}
                        onChange={formik.handleChange}
                      />
                    </Form.Group>
                  </Grid>

                  <Grid className="w-100" item xs={12}>
                    <Button
                      type="submit"
                      className="w-50 d-flex justify-content-center"
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{
                        py: 1.5,
                        borderRadius: 4,
                        width: "50%",
                        display: "flex",
                        justifyContent: "center",
                        fontSize: "16px",
                        backgroundColor: "green",
                        "&:hover": { backgroundColor: "white", color: "black" },
                      }}
                    >
                      تأكيد الدفع
                    </Button>
                  </Grid>
                </Grid>
              </Form>
              <Toaster />
            </CardContent>
          </Card>
        </Box>
      </motion.div>
    </>
  );
}
