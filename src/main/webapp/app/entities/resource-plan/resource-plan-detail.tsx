import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './resource-plan.reducer';

export const ResourcePlanDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const resourcePlanEntity = useAppSelector(state => state.resourcePlan.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="resourcePlanDetailsHeading">
          <Translate contentKey="rosterApp.resourcePlan.detail.title">ResourcePlan</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{resourcePlanEntity.id}</dd>
          <dt>
            <span id="availability">
              <Translate contentKey="rosterApp.resourcePlan.availability">Availability</Translate>
            </span>
          </dt>
          <dd>{resourcePlanEntity.availability ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="rosterApp.resourcePlan.resource">Resource</Translate>
          </dt>
          <dd>{resourcePlanEntity.resource ? resourcePlanEntity.resource.key : ''}</dd>
          <dt>
            <Translate contentKey="rosterApp.resourcePlan.shift">Shift</Translate>
          </dt>
          <dd>{resourcePlanEntity.shift ? resourcePlanEntity.shift.key : ''}</dd>
          <dt>
            <Translate contentKey="rosterApp.resourcePlan.position">Position</Translate>
          </dt>
          <dd>{resourcePlanEntity.position ? resourcePlanEntity.position.key : ''}</dd>
        </dl>
        <Button tag={Link} to="/resource-plan" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/resource-plan/${resourcePlanEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ResourcePlanDetail;
