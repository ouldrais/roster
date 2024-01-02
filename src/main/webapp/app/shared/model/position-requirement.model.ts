import { ITraining } from 'app/shared/model/training.model';
import { IPosition } from 'app/shared/model/position.model';

export interface IPositionRequirement {
  id?: number;
  mandatoty?: string | null;
  training?: ITraining | null;
  position?: IPosition | null;
}

export const defaultValue: Readonly<IPositionRequirement> = {};
