import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './shift.reducer';

export const ShiftDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const shiftEntity = useAppSelector(state => state.shift.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="shiftDetailsHeading">
          <Translate contentKey="rosterApp.shift.detail.title">Shift</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{shiftEntity.id}</dd>
          <dt>
            <span id="key">
              <Translate contentKey="rosterApp.shift.key">Key</Translate>
            </span>
          </dt>
          <dd>{shiftEntity.key}</dd>
          <dt>
            <span id="shiftStart">
              <Translate contentKey="rosterApp.shift.shiftStart">Shift Start</Translate>
            </span>
          </dt>
          <dd>{shiftEntity.shiftStart ? <TextFormat value={shiftEntity.shiftStart} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="shiftEnd">
              <Translate contentKey="rosterApp.shift.shiftEnd">Shift End</Translate>
            </span>
          </dt>
          <dd>{shiftEntity.shiftEnd ? <TextFormat value={shiftEntity.shiftEnd} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="rosterApp.shift.type">Type</Translate>
            </span>
          </dt>
          <dd>{shiftEntity.type}</dd>
        </dl>
        <Button tag={Link} to="/shift" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/shift/${shiftEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ShiftDetail;
