import React from 'react';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Layout from '../components/layout/Layout';
import RenderRoutes from '../providers/route/RenderRoutes';

function App() {
  const materialTheme = createTheme(/* your theme */);
  // const darkTheme = createTheme({
  //   palette: {
  //     mode: 'dark',
  //   },
  // });
  return (
    <ThemeProvider theme={materialTheme}>
      <CssBaseline />
      <Layout>
        <RenderRoutes />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
