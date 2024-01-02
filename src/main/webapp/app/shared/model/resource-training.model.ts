import dayjs from 'dayjs';
import { IResource } from 'app/shared/model/resource.model';
import { ITraining } from 'app/shared/model/training.model';

export interface IResourceTraining {
  id?: number;
  status?: string | null;
  level?: string | null;
  trainer?: string | null;
  activeFrom?: dayjs.Dayjs | null;
  activeto?: dayjs.Dayjs | null;
  resource?: IResource | null;
  training?: ITraining | null;
}

export const defaultValue: Readonly<IResourceTraining> = {};
