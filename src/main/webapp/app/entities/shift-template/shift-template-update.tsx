import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IShiftTemplate } from 'app/shared/model/shift-template.model';
import { getEntity, updateEntity, createEntity, reset } from './shift-template.reducer';

export const ShiftTemplateUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const shiftTemplateEntity = useAppSelector(state => state.shiftTemplate.entity);
  const loading = useAppSelector(state => state.shiftTemplate.loading);
  const updating = useAppSelector(state => state.shiftTemplate.updating);
  const updateSuccess = useAppSelector(state => state.shiftTemplate.updateSuccess);

  const handleClose = () => {
    navigate('/shift-template');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
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
    if (values.key !== undefined && typeof values.key !== 'number') {
      values.key = Number(values.key);
    }
    values.shiftStart = convertDateTimeToServer(values.shiftStart);
    values.shiftEnd = convertDateTimeToServer(values.shiftEnd);

    const entity = {
      ...shiftTemplateEntity,
      ...values,
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
          shiftStart: displayDefaultDateTime(),
          shiftEnd: displayDefaultDateTime(),
        }
      : {
          ...shiftTemplateEntity,
          shiftStart: convertDateTimeFromServer(shiftTemplateEntity.shiftStart),
          shiftEnd: convertDateTimeFromServer(shiftTemplateEntity.shiftEnd),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="rosterApp.shiftTemplate.home.createOrEditLabel" data-cy="ShiftTemplateCreateUpdateHeading">
            <Translate contentKey="rosterApp.shiftTemplate.home.createOrEditLabel">Create or edit a ShiftTemplate</Translate>
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
                  id="shift-template-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('rosterApp.shiftTemplate.key')}
                id="shift-template-key"
                name="key"
                data-cy="key"
                type="text"
              />
              <ValidatedField
                label={translate('rosterApp.shiftTemplate.shiftStart')}
                id="shift-template-shiftStart"
                name="shiftStart"
                data-cy="shiftStart"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('rosterApp.shiftTemplate.shiftEnd')}
                id="shift-template-shiftEnd"
                name="shiftEnd"
                data-cy="shiftEnd"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('rosterApp.shiftTemplate.type')}
                id="shift-template-type"
                name="type"
                data-cy="type"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/shift-template" replace color="info">
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

export default ShiftTemplateUpdate;
