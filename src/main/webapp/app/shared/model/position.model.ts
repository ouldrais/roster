import { IDepartment } from 'app/shared/model/department.model';

export interface IPosition {
  id?: number;
  key?: number | null;
  leadership?: string | null;
  department?: IDepartment | null;
}

export const defaultValue: Readonly<IPosition> = {};
