import React, { useEffect, useState } from 'react';
import './form.css'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import { Modal, Box, Button, Grid, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ImCross } from 'react-icons/im';
import { openForm } from '../../features/commanSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreateTask, GetAllTask, GetUpdatingData, UpdateTask } from '../../features/taskSlice';
const useCustomFormikContext = () => useFormikContext();
const TaskForm = () => {
  const dispatch = useDispatch();
  const isopen = useSelector((state) => state.comman.isopen);
  const isupdatebtn = useSelector((state) => state.comman.isupdatebtn);
  const isupdatingdata = useSelector((state) => state.tasks.updatingdata);
  const initialValues = {
    title: '',
    description: '',
    Status: false,
  };


  const style = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  const handleSubmit = ( values, { resetForm }) => {
    console.log(values);
    dispatch(CreateTask(values));
    dispatch(GetAllTask())
    resetForm();
    dispatch(openForm({ isopen: false, update: false }));
  };
  const handleUpdate = (values, { resetForm }) => {
    dispatch(UpdateTask({ id: isupdatingdata._id, data: values }));
    dispatch(GetAllTask())
    dispatch(GetUpdatingData(null))
    resetForm();
    dispatch(openForm({ isopen: false, update: false }));
  };

  return (
    <Modal
      open={isopen}
      onClose={() => dispatch(openForm({ isopen: false, update: false }))}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="form-container">
          <button onClick={() => dispatch(openForm({ isopen: false, update: false }))} className="cross-btn">
            <ImCross />
          </button>
          <Formik
            initialValues={isupdatingdata ? isupdatingdata : initialValues}
            validationSchema={validationSchema}
            onSubmit={isupdatebtn ? handleUpdate : handleSubmit}>
            {({ values, handleChange, handleBlur, handleSubmit, handleUpdate, setFieldValue }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="title"
                      label="Title"
                      name="title"
                      variant="standard"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="title" component="div" className="error-msg" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="standard-multiline-flexible"
                      multiline
                      maxRows={5}
                      variant="standard"
                      label="Description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="description" component="div" className="error-msg" />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="Status"
                          checked={values.Status}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      }
                      label="Complete"
                    />
                  </Grid>
                </Grid>
                {
                  isupdatebtn
                    ?
                    <Button type="submit" variant="contained" className="task-btn">
                      Update Task
                    </Button>
                    :
                    <Button type="submit" variant="contained" className="task-btn">
                      Create Task
                    </Button>
                }
              </Form>
            )}
          </Formik>
        </div>
      </Box>
    </Modal>
  );
};

export default TaskForm;
