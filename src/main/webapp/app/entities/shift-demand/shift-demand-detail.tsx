import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './shift-demand.reducer';

export const ShiftDemandDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const shiftDemandEntity = useAppSelector(state => state.shiftDemand.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="shiftDemandDetailsHeading">
          <Translate contentKey="rosterApp.shiftDemand.detail.title">ShiftDemand</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{shiftDemandEntity.id}</dd>
          <dt>
            <span id="count">
              <Translate contentKey="rosterApp.shiftDemand.count">Count</Translate>
            </span>
          </dt>
          <dd>{shiftDemandEntity.count}</dd>
          <dt>
            <Translate contentKey="rosterApp.shiftDemand.shift">Shift</Translate>
          </dt>
          <dd>{shiftDemandEntity.shift ? shiftDemandEntity.shift.key : ''}</dd>
          <dt>
            <Translate contentKey="rosterApp.shiftDemand.department">Department</Translate>
          </dt>
          <dd>{shiftDemandEntity.department ? shiftDemandEntity.department.key : ''}</dd>
        </dl>
        <Button tag={Link} to="/shift-demand" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/shift-demand/${shiftDemandEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ShiftDemandDetail;
