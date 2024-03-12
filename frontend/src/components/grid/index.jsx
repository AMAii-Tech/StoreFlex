import { useState } from 'react';
import PropTypes from 'prop-types';
// import { Grid } from '@amaii/ui-framework';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Grid from './GridComp';
import Iconify from '../iconify';
import Scrollbar from '../scrollbar';
import GridTableToolbar from './GridTableToolBar';

export default function GridComponent({ title, data }) {
  const [filterName, setFilterName] = useState('');

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{title}</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New {title}
        </Button>
      </Stack>

      <Card>
        <GridTableToolbar filterName={filterName} onFilterName={handleFilterByName} />

        <Scrollbar>
          <Grid />
        </Scrollbar>
      </Card>
    </Container>
  );
}

GridComponent.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object,
};
