import { IShift } from 'app/shared/model/shift.model';
import { IDepartment } from 'app/shared/model/department.model';

export interface IShiftDemand {
  id?: number;
  count?: number | null;
  shift?: IShift | null;
  department?: IDepartment | null;
}

export const defaultValue: Readonly<IShiftDemand> = {};
