import dayjs from 'dayjs';

export interface IShiftTemplate {
  id?: number;
  key?: number | null;
  shiftStart?: dayjs.Dayjs | null;
  shiftEnd?: dayjs.Dayjs | null;
  type?: string | null;
}

export const defaultValue: Readonly<IShiftTemplate> = {};
