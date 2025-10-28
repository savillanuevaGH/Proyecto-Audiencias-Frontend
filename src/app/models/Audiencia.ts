export interface Audiencia {
    id: number;
    nombre: string;
    estado: string;
    tipo: string;
    cuit: string;
    hora_inicio: string;
    duracion: number;
    fecha_creacion: Date;
    fecha_inscripcion: Date;
    creado_por_usuario: number;
    modificado_por_usuario: number;
}