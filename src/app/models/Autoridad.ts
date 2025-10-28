export interface Autoridad {
    id: number;
    nombre: string;
    mail: string;
    estado: string;
    tipo: 'JUEZ' | 'FISCAL' | 'DEFENSOR';
}
