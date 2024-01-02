import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/team">
        <Translate contentKey="global.menu.entities.team" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/team-plan">
        <Translate contentKey="global.menu.entities.teamPlan" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/resource">
        <Translate contentKey="global.menu.entities.resource" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/resource-plan">
        <Translate contentKey="global.menu.entities.resourcePlan" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/resource-training">
        <Translate contentKey="global.menu.entities.resourceTraining" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/training">
        <Translate contentKey="global.menu.entities.training" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/position-requirement">
        <Translate contentKey="global.menu.entities.positionRequirement" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/position">
        <Translate contentKey="global.menu.entities.position" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/department">
        <Translate contentKey="global.menu.entities.department" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/shift">
        <Translate contentKey="global.menu.entities.shift" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/shift-demand">
        <Translate contentKey="global.menu.entities.shiftDemand" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/shift-template">
        <Translate contentKey="global.menu.entities.shiftTemplate" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
