import team from 'app/entities/team/team.reducer';
import teamPlan from 'app/entities/team-plan/team-plan.reducer';
import resource from 'app/entities/resource/resource.reducer';
import resourcePlan from 'app/entities/resource-plan/resource-plan.reducer';
import resourceTraining from 'app/entities/resource-training/resource-training.reducer';
import training from 'app/entities/training/training.reducer';
import positionRequirement from 'app/entities/position-requirement/position-requirement.reducer';
import position from 'app/entities/position/position.reducer';
import department from 'app/entities/department/department.reducer';
import shift from 'app/entities/shift/shift.reducer';
import shiftDemand from 'app/entities/shift-demand/shift-demand.reducer';
import shiftTemplate from 'app/entities/shift-template/shift-template.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  team,
  teamPlan,
  resource,
  resourcePlan,
  resourceTraining,
  training,
  positionRequirement,
  position,
  department,
  shift,
  shiftDemand,
  shiftTemplate,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
