import { Box, Step, StepLabel, Stepper } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import _ from "lodash";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

function Tracking() {
  const [tracing, settracing] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const { id } = useParams();
  const GetTracing = useCallback(async () => {
    setisLoading(false); // ✅ ضع التحميل قبل تنفيذ الـ API
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-Trace-Order-User/${id}`,
        {
          withCredentials: true,
        }
      );

      if (JSON.stringify(data) == JSON.stringify(tracing)) {
      } else {
        settracing(data);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "حدث خطأ أثناء جلب البيانات"
      );
    } finally {
      setisLoading(true); // ✅ أوقف التحميل بعد جلب البيانات
    }
  }, []);

  useEffect(() => {
    GetTracing();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        <div className="container mt-5">
          <div className="card">
            <div
              style={{
                borderRadius: "15px",
                fontSize: "26px",
                fontWeight: "bold",
                backgroundColor: "green", // لون هادئ
                textAlign: "center",
                paddingBottom: "10px",
              }}
              className="card-header text-white"
            >
              <h3
                style={{
                  fontSize: "26px",
                  fontWeight: "bold",
                  textAlign: "center",
                  paddingBottom: "10px",
                }}
              >
                مسار الطلب
              </h3>
            </div>
            <div className="card-body">
              {isLoading == true ? (
                <>
                  <Box sx={{ width: "100%" }}>
                    <Stepper
                      activeStep={
                        tracing.step1 == null
                          ? 0
                          : tracing.step2 == null
                          ? 1
                          : tracing.step3 == null
                          ? 2
                          : 3
                      }
                      alternativeLabel
                    >
                      <Step key="Select master blaster campaign settings">
                        <StepLabel>تم اخراج الطلب من الارضيات</StepLabel>
                      </Step>
                      <Step key="Select master blaster campaign settings">
                        <StepLabel>الطلب تحت الفحص</StepLabel>
                      </Step>
                      <Step key="Select master blaster campaign settings">
                        <StepLabel>تم انهاء الطلب</StepLabel>
                      </Step>
                    </Stepper>
                  </Box>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <Toaster />
        <Toaster />
      </motion.div>
    </>
  );
}

export default Tracking;
