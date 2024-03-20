import React from 'react';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Layout from './components/layout/Layout';
import RenderRoutes from './providers/RenderRoutes';

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
        <Layout>
          <RenderRoutes />
        </Layout>
      </ThemeProvider>
    </div>
  );
}

export default App;
