/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { getData } from '../../http';

const dataRows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const GridComponent = ({ model, height = 400, width = '100%' }) => {
  const { columns } = model;
  const [filter, setFilter] = useState();
  const [sort, setSort] = useState();
  const [pagination, setPagination] = useState({ pageSize: 5, page: 0 });
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = () => {
      getData({ model, sort, filter, pagination, setRows, dataRows, setIsLoading });
    };
    fetchRecords();
  }, [filter, sort, pagination, model]);

  return (
    <div>
      <Box sx={{ height, width }}>
        <DataGrid
          unstable_headerFilters
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 15, 20]}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          filterModel={filter}
          sortModel={sort}
          paginationModel={pagination}
          onSortModelChange={setSort}
          onFilterModelChange={setFilter}
          onPaginationModelChange={setPagination}
          loading={isLoading}
        />
      </Box>
    </div>
  );
};

GridComponent.prototype = {
  height: PropTypes.number,
  width: PropTypes.string,
  rows: PropTypes.object,
  model: PropTypes.object,
  pageSizeOptions: PropTypes.object,
};

export default GridComponent;
