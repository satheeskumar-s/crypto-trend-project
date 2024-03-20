import React from 'react';
import '../scss/app.scss';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Layout from './components/layout/Layout';

function App() {
  const materialTheme = createTheme(/* your theme */);
  // const darkTheme = createTheme({
  //   palette: {
  //     mode: 'dark',
  //   },
  // });
  return (
    <div className='App'>
      <ThemeProvider theme={materialTheme}>
        <CssBaseline />
        <Layout />
      </ThemeProvider>
    </div>
  );
}

export default App;
