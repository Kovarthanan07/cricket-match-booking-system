import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  FilledInput,
  TextareaAutosize,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import baseURL from '../common/baseUrl';
import { ToastContainer, toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalButton(props) {
  const { ticket } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleHome = (event) => {
    window.location.href = '/buyer';
  };

  const formik = useFormik({
    initialValues: {
      name: ticket.name,
      price: ticket.price,
      description: ticket.description,
    },
    validationSchema: yup.object({
      title: yup.string().required('Title is required'),
      news: yup.string().required('News is required'),
    }),
    onSubmit: async (user) => {
      const data = {
        name: user.name,
        price: user.price,
        description: user.description,
      };
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      console.log('data : ', data);
      //   await axios
      //     .patch(`${baseURL}updateTicket/${ticket._id}`, data, config)
      //     .then((response) => {
      //       toast.success('News created successfully.');
      //     })
      //     .catch((err) => {
      //       toast.error('fail');
      //     });
    },
  });

  return (
    <div>
      <ToastContainer />
      <Button onClick={handleOpen} style={{ color: 'darkred' }}>
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Ticket
          </Typography>
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <FormControl sx={{ width: '100%' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    Title
                  </InputLabel>
                  <FilledInput
                    autoComplete="title"
                    name="title"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    autoFocus
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl sx={{ width: '100%' }} variant="filled">
                  {/*<InputLabel htmlFor="filled-adornment-password">Announcement</InputLabel>*/}
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={1}
                    placeholder="News place"
                    name="news"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    style={{ width: '100%' }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl sx={{ width: '100%' }} variant="filled">
                  {/*<InputLabel htmlFor="filled-adornment-password">Announcement</InputLabel>*/}
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={10}
                    placeholder="News place"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    style={{ width: '100%' }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Button
              // onClick={() => {history.push("/verify")}}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Announcement
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
