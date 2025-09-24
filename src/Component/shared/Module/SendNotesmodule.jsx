import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import PropTypes from "prop-types";
import NotesForm from "../NotesForm";

export default function SendNotesmodule({ Bar, handleCloseBar, OrderId }) {
  const [IsLoading, setIsLoading] = useState(false);

  const SendFile = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("formFile", values.formFile);
    formData.append("Notes", values.Notes);
    formData.append("newOrderId", OrderId);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Notes-From-CustomerService`,
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success("تم تقديم الملاحظات بنجاح");
      handleCloseBar();
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ما");
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      Notes: "",
      formFile: "",
    },
    onSubmit: SendFile,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("formFile", file);
  };

  return (
    <Modal className="text-end" show={Bar !== null} onHide={handleCloseBar}>
      <Modal.Header
        closeButton
        className="bg-primary text-white text-center"
        style={{ borderRadius: "8px 8px 0 0", padding: "15px" }}
      >
        <Modal.Title className="w-100 fs-5">تقديم الملاحظات</Modal.Title>
      </Modal.Header>
      <Modal.Body
        className="p-4 bg-light"
        style={{ borderRadius: "0 0 8px 8px" }}
      >
        <NotesForm 
          formik={formik}
          isLoading={IsLoading}
          onFileChange={handleFileChange}
        />
      </Modal.Body>
      <Modal.Footer className="bg-light d-flex justify-content-center">
        <Button
          variant="secondary"
          onClick={handleCloseBar}
          className="fw-bold shadow-sm px-4"
        >
          إغلاق
        </Button>
      </Modal.Footer>
      <Toaster />
    </Modal>
  );
}

// PropTypes validation
SendNotesmodule.propTypes = {
  Bar: PropTypes.any,
  handleCloseBar: PropTypes.func.isRequired,
  OrderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
