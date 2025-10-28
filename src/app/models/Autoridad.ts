export interface Autoridad {
    id: number;
    nombre: string;
    correoElectronico: string;
    estado: 'ACTIVO' | 'INACTIVO';
    tipoAutoridad: 'JUEZ' | 'FISCAL' | 'DEFENSOR';
}
