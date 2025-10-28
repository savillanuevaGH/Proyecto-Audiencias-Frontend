export interface Audiencia {
    id: number;
    nombre: string;
    estado: string;
    tipo: string;
    cuij: string;
    horaInicio: string;
    duracion: number;
    fechaCreacion: Date;
    fechaInscripcion: Date;
    creadoPorUsuario: number;
    modificadoPorUsuario: number;
    sala: number;
}
