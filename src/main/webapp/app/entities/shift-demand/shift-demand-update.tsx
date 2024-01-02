import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IShift } from 'app/shared/model/shift.model';
import { getEntities as getShifts } from 'app/entities/shift/shift.reducer';
import { IDepartment } from 'app/shared/model/department.model';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { IShiftDemand } from 'app/shared/model/shift-demand.model';
import { getEntity, updateEntity, createEntity, reset } from './shift-demand.reducer';

export const ShiftDemandUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const shifts = useAppSelector(state => state.shift.entities);
  const departments = useAppSelector(state => state.department.entities);
  const shiftDemandEntity = useAppSelector(state => state.shiftDemand.entity);
  const loading = useAppSelector(state => state.shiftDemand.loading);
  const updating = useAppSelector(state => state.shiftDemand.updating);
  const updateSuccess = useAppSelector(state => state.shiftDemand.updateSuccess);

  const handleClose = () => {
    navigate('/shift-demand');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getShifts({}));
    dispatch(getDepartments({}));
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
    if (values.count !== undefined && typeof values.count !== 'number') {
      values.count = Number(values.count);
    }

    const entity = {
      ...shiftDemandEntity,
      ...values,
      shift: shifts.find(it => it.id.toString() === values.shift.toString()),
      department: departments.find(it => it.id.toString() === values.department.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...shiftDemandEntity,
          shift: shiftDemandEntity?.shift?.id,
          department: shiftDemandEntity?.department?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="rosterApp.shiftDemand.home.createOrEditLabel" data-cy="ShiftDemandCreateUpdateHeading">
            <Translate contentKey="rosterApp.shiftDemand.home.createOrEditLabel">Create or edit a ShiftDemand</Translate>
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
                  id="shift-demand-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('rosterApp.shiftDemand.count')}
                id="shift-demand-count"
                name="count"
                data-cy="count"
                type="text"
              />
              <ValidatedField
                id="shift-demand-shift"
                name="shift"
                data-cy="shift"
                label={translate('rosterApp.shiftDemand.shift')}
                type="select"
              >
                <option value="" key="0" />
                {shifts
                  ? shifts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.key}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="shift-demand-department"
                name="department"
                data-cy="department"
                label={translate('rosterApp.shiftDemand.department')}
                type="select"
              >
                <option value="" key="0" />
                {departments
                  ? departments.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.key}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/shift-demand" replace color="info">
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

export default ShiftDemandUpdate;
