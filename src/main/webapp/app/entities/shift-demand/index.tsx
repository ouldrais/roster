import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ShiftDemand from './shift-demand';
import ShiftDemandDetail from './shift-demand-detail';
import ShiftDemandUpdate from './shift-demand-update';
import ShiftDemandDeleteDialog from './shift-demand-delete-dialog';

const ShiftDemandRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ShiftDemand />} />
    <Route path="new" element={<ShiftDemandUpdate />} />
    <Route path=":id">
      <Route index element={<ShiftDemandDetail />} />
      <Route path="edit" element={<ShiftDemandUpdate />} />
      <Route path="delete" element={<ShiftDemandDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ShiftDemandRoutes;
