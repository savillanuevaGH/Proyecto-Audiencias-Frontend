import { DistritoJudicial } from './DistritoJudicial';
export interface Sala {
  id: number;
  nombre: string;
  lugar: string;
  fechaCreacion: Date;
  distritoJudicialId: number;
  distritoJudicial?: DistritoJudicial;
}
