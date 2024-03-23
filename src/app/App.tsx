import React, { useMemo } from 'react';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Layout from '../components/layout/Layout';
import RenderRoutes from '../providers/route/RenderRoutes';
import { Toaster } from 'react-hot-toast';
import { registerInterceptors } from '../middleware/AxiosInterceptors';

function App() {
  const materialTheme = createTheme(/* your theme */);
  // const darkTheme = createTheme({
  //   palette: {
  //     mode: 'dark',
  //   },
  // });

  useMemo(() => {
    registerInterceptors();
  }, []);

  return (
    <ThemeProvider theme={materialTheme}>
      <CssBaseline />
      <Toaster position='top-right' reverseOrder={true} />
      <Layout>
        <RenderRoutes />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
