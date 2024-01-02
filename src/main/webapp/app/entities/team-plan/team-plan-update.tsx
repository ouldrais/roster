import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITeam } from 'app/shared/model/team.model';
import { getEntities as getTeams } from 'app/entities/team/team.reducer';
import { IShift } from 'app/shared/model/shift.model';
import { getEntities as getShifts } from 'app/entities/shift/shift.reducer';
import { ITeamPlan } from 'app/shared/model/team-plan.model';
import { getEntity, updateEntity, createEntity, reset } from './team-plan.reducer';

export const TeamPlanUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const teams = useAppSelector(state => state.team.entities);
  const shifts = useAppSelector(state => state.shift.entities);
  const teamPlanEntity = useAppSelector(state => state.teamPlan.entity);
  const loading = useAppSelector(state => state.teamPlan.loading);
  const updating = useAppSelector(state => state.teamPlan.updating);
  const updateSuccess = useAppSelector(state => state.teamPlan.updateSuccess);

  const handleClose = () => {
    navigate('/team-plan');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTeams({}));
    dispatch(getShifts({}));
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

    const entity = {
      ...teamPlanEntity,
      ...values,
      team: teams.find(it => it.id.toString() === values.team.toString()),
      shift: shifts.find(it => it.id.toString() === values.shift.toString()),
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
          ...teamPlanEntity,
          team: teamPlanEntity?.team?.id,
          shift: teamPlanEntity?.shift?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="rosterApp.teamPlan.home.createOrEditLabel" data-cy="TeamPlanCreateUpdateHeading">
            <Translate contentKey="rosterApp.teamPlan.home.createOrEditLabel">Create or edit a TeamPlan</Translate>
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
                  id="team-plan-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('rosterApp.teamPlan.availability')}
                id="team-plan-availability"
                name="availability"
                data-cy="availability"
                check
                type="checkbox"
              />
              <ValidatedField id="team-plan-team" name="team" data-cy="team" label={translate('rosterApp.teamPlan.team')} type="select">
                <option value="" key="0" />
                {teams
                  ? teams.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.key}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="team-plan-shift" name="shift" data-cy="shift" label={translate('rosterApp.teamPlan.shift')} type="select">
                <option value="" key="0" />
                {shifts
                  ? shifts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.key}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/team-plan" replace color="info">
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

export default TeamPlanUpdate;
