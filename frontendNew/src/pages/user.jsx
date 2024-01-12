import { Helmet } from 'react-helmet-async';

import GridComponent from '../components/grid';

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <GridComponent />
    </>
  );
}
