import { useState } from 'react';
import PropTypes from 'prop-types';
// import { Grid } from '@amaii/ui-framework';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Grid from './GridComp';
import Iconify from '../iconify';
import FormComponent from '../form';
import Scrollbar from '../scrollbar';
import GridTableToolbar from './GridTableToolBar';
import { modalStyle, convertToSingular } from '../../utils/utils.mjs';

export default function GridComponent({ model }) {
  const { columns, title } = model;
  const [filterName, setFilterName] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const onFormChange = (e) => {
    const { value, name } = e.target;
    let details = { ...formData };
    details = { ...details, [name]: value };
    setFormData(details);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{title}</Typography>

        <Button
          variant="contained"
          color="inherit"
          onClick={() => setIsFormOpen(true)}
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New {title}
        </Button>
      </Stack>

      <Card>
        <GridTableToolbar filterName={filterName} onFilterName={handleFilterByName} />

        <Scrollbar>
          <Grid model={model} />
        </Scrollbar>
      </Card>
      <Modal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New {convertToSingular(title)}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <FormComponent columns={columns} onChange={onFormChange} formValues={formData} />
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
}

GridComponent.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.object,
  model: PropTypes.object,
};
