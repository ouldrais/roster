import { ITeam } from 'app/shared/model/team.model';

export interface IResource {
  id?: number;
  key?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  teamRole?: string | null;
  exchangeAllowed?: boolean | null;
  team?: ITeam | null;
}

export const defaultValue: Readonly<IResource> = {
  exchangeAllowed: false,
};
