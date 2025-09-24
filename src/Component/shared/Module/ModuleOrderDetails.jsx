import React from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from 'prop-types';

export default function ModuleOrderDetails({ selectedOrder, handleCloseDetails }) {
  const fields = [
    { label: "البريد الإلكتروني", value: selectedOrder?.email },
    { label: "الاسم", value: selectedOrder?.fullName },
    { label: "رقم الهوية", value: selectedOrder?.identity },
    { label: "رقم الهاتف", value: selectedOrder?.phoneNumber },
    { label: "رخصة المخلص", value: selectedOrder?.license },
    { label: "الرقم الضريبي", value: selectedOrder?.taxRecord },
  ];

  return (
    <Modal
      className="text-end"
      show={selectedOrder !== null}
      onHide={handleCloseDetails}
    >
      <Modal.Header closeButton>
        <Modal.Title>تفاصيل الطلب</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedOrder && (
          <>
            {fields.map((field) => (
              <p key={field.label}>
                <strong>{field.label}:</strong> {field.value}
              </p>
            ))}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDetails}>
          إغلاق
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ModuleOrderDetails.propTypes = {
  selectedOrder: PropTypes.object.isRequired,
  handleCloseDetails: PropTypes.func.isRequired,
};
