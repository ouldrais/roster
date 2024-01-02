import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TeamPlan from './team-plan';
import TeamPlanDetail from './team-plan-detail';
import TeamPlanUpdate from './team-plan-update';
import TeamPlanDeleteDialog from './team-plan-delete-dialog';

const TeamPlanRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TeamPlan />} />
    <Route path="new" element={<TeamPlanUpdate />} />
    <Route path=":id">
      <Route index element={<TeamPlanDetail />} />
      <Route path="edit" element={<TeamPlanUpdate />} />
      <Route path="delete" element={<TeamPlanDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TeamPlanRoutes;
