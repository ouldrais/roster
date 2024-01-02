import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PositionRequirement from './position-requirement';
import PositionRequirementDetail from './position-requirement-detail';
import PositionRequirementUpdate from './position-requirement-update';
import PositionRequirementDeleteDialog from './position-requirement-delete-dialog';

const PositionRequirementRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<PositionRequirement />} />
    <Route path="new" element={<PositionRequirementUpdate />} />
    <Route path=":id">
      <Route index element={<PositionRequirementDetail />} />
      <Route path="edit" element={<PositionRequirementUpdate />} />
      <Route path="delete" element={<PositionRequirementDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PositionRequirementRoutes;
