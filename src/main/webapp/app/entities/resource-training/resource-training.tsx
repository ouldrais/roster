import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './resource-training.reducer';

export const ResourceTraining = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const resourceTrainingList = useAppSelector(state => state.resourceTraining.entities);
  const loading = useAppSelector(state => state.resourceTraining.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="resource-training-heading" data-cy="ResourceTrainingHeading">
        <Translate contentKey="rosterApp.resourceTraining.home.title">Resource Trainings</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="rosterApp.resourceTraining.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/resource-training/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="rosterApp.resourceTraining.home.createLabel">Create new Resource Training</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {resourceTrainingList && resourceTrainingList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="rosterApp.resourceTraining.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('status')}>
                  <Translate contentKey="rosterApp.resourceTraining.status">Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('status')} />
                </th>
                <th className="hand" onClick={sort('level')}>
                  <Translate contentKey="rosterApp.resourceTraining.level">Level</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('level')} />
                </th>
                <th className="hand" onClick={sort('trainer')}>
                  <Translate contentKey="rosterApp.resourceTraining.trainer">Trainer</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('trainer')} />
                </th>
                <th className="hand" onClick={sort('activeFrom')}>
                  <Translate contentKey="rosterApp.resourceTraining.activeFrom">Active From</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('activeFrom')} />
                </th>
                <th className="hand" onClick={sort('activeto')}>
                  <Translate contentKey="rosterApp.resourceTraining.activeto">Activeto</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('activeto')} />
                </th>
                <th>
                  <Translate contentKey="rosterApp.resourceTraining.resource">Resource</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="rosterApp.resourceTraining.training">Training</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {resourceTrainingList.map((resourceTraining, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/resource-training/${resourceTraining.id}`} color="link" size="sm">
                      {resourceTraining.id}
                    </Button>
                  </td>
                  <td>{resourceTraining.status}</td>
                  <td>{resourceTraining.level}</td>
                  <td>{resourceTraining.trainer}</td>
                  <td>
                    {resourceTraining.activeFrom ? (
                      <TextFormat type="date" value={resourceTraining.activeFrom} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {resourceTraining.activeto ? (
                      <TextFormat type="date" value={resourceTraining.activeto} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {resourceTraining.resource ? (
                      <Link to={`/resource/${resourceTraining.resource.id}`}>{resourceTraining.resource.key}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {resourceTraining.training ? (
                      <Link to={`/training/${resourceTraining.training.id}`}>{resourceTraining.training.key}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/resource-training/${resourceTraining.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/resource-training/${resourceTraining.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/resource-training/${resourceTraining.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="rosterApp.resourceTraining.home.notFound">No Resource Trainings found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ResourceTraining;
