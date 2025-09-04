import { Routes } from '@angular/router';
import { AudienciasComponent } from '../pages/audiencias/audiencias.component';
import { SalasComponent } from '../pages/salas/salas.component';
import { AutoridadesComponent } from '../pages/autoridades/autoridades.component';
import { DistritosJudicialesComponent } from '../pages/distritos-judiciales/distritos-judiciales.component';
import { UsuariosComponent } from '../pages/usuarios/usuarios.component';

export const routes: Routes = [
    { path: '', component: AudienciasComponent },
    { path: '/salas', component: SalasComponent },
    { path: '/autoridades', component: AutoridadesComponent },
    { path: '/distritos', component: DistritosJudicialesComponent },
    { path: '/admin/usuarios', component: UsuariosComponent },
    { path: '**', redirectTo: '' }
];