import { Helmet } from 'react-helmet-async';

import TableCell from '@mui/material/TableCell';

import Label from '../components/label';
import GridComponent from '../components/grid';

const userheadLabel = [
  { id: 'name', label: 'Name' },
  { id: 'company', label: 'Company' },
  { id: 'role', label: 'Role' },
  {
    id: 'isVerified',
    label: 'Verified',
    align: 'center',
    customRender: ({ value }) =>
      value === 1 ? (
        <TableCell align="center">Yes</TableCell>
      ) : (
        <TableCell align="center">No</TableCell>
      ),
  },
  {
    id: 'status',
    label: 'Status',
    customRender: ({ value }) => (
      <TableCell>
        <Label color={(value === 'banned' && 'error') || 'success'}>{value}</Label>
      </TableCell>
    ),
  },
  { id: '' },
];

const userData = [
  {
    id: 1,
    name: 'Tushar',
    company: 'Spraxa',
    role: 'Developer',
    isVerified: 1,
    status: 'active',
  },
  {
    id: 2,
    name: 'Rohan',
    company: 'Spraxa',
    role: 'Developer',
    isVerified: 0,
    status: 'active',
  },
  {
    id: 3,
    name: 'Pawan',
    company: 'Spraxa',
    role: 'Developer',
    isVerified: 1,
    status: 'active',
  },
];

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      {/* <Grid /> */}
      <GridComponent title="User" headLabel={userheadLabel} data={userData} />
    </>
  );
}
