import { IResource } from 'app/shared/model/resource.model';
import { IShift } from 'app/shared/model/shift.model';
import { IPosition } from 'app/shared/model/position.model';

export interface IResourcePlan {
  id?: number;
  availability?: boolean | null;
  resource?: IResource | null;
  shift?: IShift | null;
  position?: IPosition | null;
}

export const defaultValue: Readonly<IResourcePlan> = {
  availability: false,
};
