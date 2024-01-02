export interface IDepartment {
  id?: number;
  key?: number | null;
  team?: string | null;
}

export const defaultValue: Readonly<IDepartment> = {};
