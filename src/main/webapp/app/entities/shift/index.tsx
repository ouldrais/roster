import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Shift from './shift';
import ShiftDetail from './shift-detail';
import ShiftUpdate from './shift-update';
import ShiftDeleteDialog from './shift-delete-dialog';

const ShiftRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Shift />} />
    <Route path="new" element={<ShiftUpdate />} />
    <Route path=":id">
      <Route index element={<ShiftDetail />} />
      <Route path="edit" element={<ShiftUpdate />} />
      <Route path="delete" element={<ShiftDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ShiftRoutes;
