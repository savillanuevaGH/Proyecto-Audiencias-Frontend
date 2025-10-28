import { DistritoJudicial } from './DistritoJudicial';
export interface Sala {
  id: number;
  nombre: string;
  lugar: string;
  fecha: Date;
  distrito_judicial_id: DistritoJudicial['id'];
}
