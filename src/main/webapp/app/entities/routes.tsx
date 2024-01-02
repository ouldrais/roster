import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Team from './team';
import TeamPlan from './team-plan';
import Resource from './resource';
import ResourcePlan from './resource-plan';
import ResourceTraining from './resource-training';
import Training from './training';
import PositionRequirement from './position-requirement';
import Position from './position';
import Department from './department';
import Shift from './shift';
import ShiftDemand from './shift-demand';
import ShiftTemplate from './shift-template';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="team/*" element={<Team />} />
        <Route path="team-plan/*" element={<TeamPlan />} />
        <Route path="resource/*" element={<Resource />} />
        <Route path="resource-plan/*" element={<ResourcePlan />} />
        <Route path="resource-training/*" element={<ResourceTraining />} />
        <Route path="training/*" element={<Training />} />
        <Route path="position-requirement/*" element={<PositionRequirement />} />
        <Route path="position/*" element={<Position />} />
        <Route path="department/*" element={<Department />} />
        <Route path="shift/*" element={<Shift />} />
        <Route path="shift-demand/*" element={<ShiftDemand />} />
        <Route path="shift-template/*" element={<ShiftTemplate />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
