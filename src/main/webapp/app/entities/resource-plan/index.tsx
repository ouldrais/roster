import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ResourcePlan from './resource-plan';
import ResourcePlanDetail from './resource-plan-detail';
import ResourcePlanUpdate from './resource-plan-update';
import ResourcePlanDeleteDialog from './resource-plan-delete-dialog';

const ResourcePlanRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ResourcePlan />} />
    <Route path="new" element={<ResourcePlanUpdate />} />
    <Route path=":id">
      <Route index element={<ResourcePlanDetail />} />
      <Route path="edit" element={<ResourcePlanUpdate />} />
      <Route path="delete" element={<ResourcePlanDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ResourcePlanRoutes;
