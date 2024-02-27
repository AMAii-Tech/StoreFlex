/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { SnackbarProvider } from '@amaii/ui-framework';

export default function App() {
  useScrollToTop();

  return (
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </SnackbarProvider>
  );
}
