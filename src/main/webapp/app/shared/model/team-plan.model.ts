import { ITeam } from 'app/shared/model/team.model';
import { IShift } from 'app/shared/model/shift.model';

export interface ITeamPlan {
  id?: number;
  availability?: boolean | null;
  team?: ITeam | null;
  shift?: IShift | null;
}

export const defaultValue: Readonly<ITeamPlan> = {
  availability: false,
};
