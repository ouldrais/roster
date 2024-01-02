import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ResourceTraining from './resource-training';
import ResourceTrainingDetail from './resource-training-detail';
import ResourceTrainingUpdate from './resource-training-update';
import ResourceTrainingDeleteDialog from './resource-training-delete-dialog';

const ResourceTrainingRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ResourceTraining />} />
    <Route path="new" element={<ResourceTrainingUpdate />} />
    <Route path=":id">
      <Route index element={<ResourceTrainingDetail />} />
      <Route path="edit" element={<ResourceTrainingUpdate />} />
      <Route path="delete" element={<ResourceTrainingDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ResourceTrainingRoutes;
