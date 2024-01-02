import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IResource } from 'app/shared/model/resource.model';
import { getEntities as getResources } from 'app/entities/resource/resource.reducer';
import { ITraining } from 'app/shared/model/training.model';
import { getEntities as getTrainings } from 'app/entities/training/training.reducer';
import { IResourceTraining } from 'app/shared/model/resource-training.model';
import { getEntity, updateEntity, createEntity, reset } from './resource-training.reducer';

export const ResourceTrainingUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const resources = useAppSelector(state => state.resource.entities);
  const trainings = useAppSelector(state => state.training.entities);
  const resourceTrainingEntity = useAppSelector(state => state.resourceTraining.entity);
  const loading = useAppSelector(state => state.resourceTraining.loading);
  const updating = useAppSelector(state => state.resourceTraining.updating);
  const updateSuccess = useAppSelector(state => state.resourceTraining.updateSuccess);

  const handleClose = () => {
    navigate('/resource-training');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getResources({}));
    dispatch(getTrainings({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.activeFrom = convertDateTimeToServer(values.activeFrom);
    values.activeto = convertDateTimeToServer(values.activeto);

    const entity = {
      ...resourceTrainingEntity,
      ...values,
      resource: resources.find(it => it.id.toString() === values.resource.toString()),
      training: trainings.find(it => it.id.toString() === values.training.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          activeFrom: displayDefaultDateTime(),
          activeto: displayDefaultDateTime(),
        }
      : {
          ...resourceTrainingEntity,
          activeFrom: convertDateTimeFromServer(resourceTrainingEntity.activeFrom),
          activeto: convertDateTimeFromServer(resourceTrainingEntity.activeto),
          resource: resourceTrainingEntity?.resource?.id,
          training: resourceTrainingEntity?.training?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="rosterApp.resourceTraining.home.createOrEditLabel" data-cy="ResourceTrainingCreateUpdateHeading">
            <Translate contentKey="rosterApp.resourceTraining.home.createOrEditLabel">Create or edit a ResourceTraining</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="resource-training-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('rosterApp.resourceTraining.status')}
                id="resource-training-status"
                name="status"
                data-cy="status"
                type="text"
              />
              <ValidatedField
                label={translate('rosterApp.resourceTraining.level')}
                id="resource-training-level"
                name="level"
                data-cy="level"
                type="text"
              />
              <ValidatedField
                label={translate('rosterApp.resourceTraining.trainer')}
                id="resource-training-trainer"
                name="trainer"
                data-cy="trainer"
                type="text"
              />
              <ValidatedField
                label={translate('rosterApp.resourceTraining.activeFrom')}
                id="resource-training-activeFrom"
                name="activeFrom"
                data-cy="activeFrom"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('rosterApp.resourceTraining.activeto')}
                id="resource-training-activeto"
                name="activeto"
                data-cy="activeto"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="resource-training-resource"
                name="resource"
                data-cy="resource"
                label={translate('rosterApp.resourceTraining.resource')}
                type="select"
              >
                <option value="" key="0" />
                {resources
                  ? resources.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.key}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="resource-training-training"
                name="training"
                data-cy="training"
                label={translate('rosterApp.resourceTraining.training')}
                type="select"
              >
                <option value="" key="0" />
                {trainings
                  ? trainings.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.key}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/resource-training" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ResourceTrainingUpdate;
