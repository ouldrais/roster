import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ShiftTemplate from './shift-template';
import ShiftTemplateDetail from './shift-template-detail';
import ShiftTemplateUpdate from './shift-template-update';
import ShiftTemplateDeleteDialog from './shift-template-delete-dialog';

const ShiftTemplateRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ShiftTemplate />} />
    <Route path="new" element={<ShiftTemplateUpdate />} />
    <Route path=":id">
      <Route index element={<ShiftTemplateDetail />} />
      <Route path="edit" element={<ShiftTemplateUpdate />} />
      <Route path="delete" element={<ShiftTemplateDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ShiftTemplateRoutes;
