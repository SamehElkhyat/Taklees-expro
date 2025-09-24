import React from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import LoadingButton from './LoadingButton';

const NotesForm = ({ 
  formik, 
  isLoading, 
  title = "إضافة ملاحظات وملف",
  notesLabel = "ملاحظات الطلب",
  notesPlaceholder = "أدخل ملاحظاتك هنا...",
  fileLabel = "الإبانه",
  submitText = "إرسال الملاحظات",
  onFileChange,
  showFileUpload = true,
  fileInputProps = {}
}) => {
  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 3,
        boxShadow: 4,
        borderRadius: 3,
        backgroundColor: "white",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        className="text-primary fw-bold text-center"
      >
        {title}
      </Typography>
      
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mt-4 text-center" controlId="Notes">
          <Form.Label className="fw-bold text-secondary">
            {notesLabel}
          </Form.Label>
          <Form.Control
            type="text"
            placeholder={notesPlaceholder}
            name="Notes"
            value={formik.values.Notes}
            onChange={formik.handleChange}
            className="shadow-sm border-primary"
          />
        </Form.Group>
        
        {showFileUpload && (
          <Form.Group controlId="formData" className="mt-4 text-center">
            <Form.Label className="fw-bold text-secondary">
              {fileLabel}
            </Form.Label>
            <InputGroup className="shadow-sm border-primary">
              <FormControl
                type="file"
                multiple
                onChange={onFileChange}
                className="p-2"
                {...fileInputProps}
              />
            </InputGroup>
          </Form.Group>
        )}
        
        <LoadingButton
          isLoading={isLoading}
          loadingIcon="gear"
          type="submit"
          variant="primary"
          className="w-100 mt-4 d-flex justify-content-center align-items-center fw-bold shadow-sm text-black border-0"
        >
          {submitText}
        </LoadingButton>
      </Form>
    </Box>
  );
};

NotesForm.propTypes = {
  formik: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string,
  notesLabel: PropTypes.string,
  notesPlaceholder: PropTypes.string,
  fileLabel: PropTypes.string,
  submitText: PropTypes.string,
  onFileChange: PropTypes.func,
  showFileUpload: PropTypes.bool,
  fileInputProps: PropTypes.object,
};

export default NotesForm;
