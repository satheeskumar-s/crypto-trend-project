import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import routes, { RouteType } from './RouteProvider';

const RenderRoutes = () => {
  return (
    <Routes>
      {routes.map((eachRoute: RouteType) => {
        return (
          <Route
            key={eachRoute.url}
            path={eachRoute.url}
            element={eachRoute.component}
          />
        );
      })}
      <Route path='*' element={<Navigate to='/trends' />} />
    </Routes>
  );
};

export default RenderRoutes;
