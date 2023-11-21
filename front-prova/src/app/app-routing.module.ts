import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarefaListarComponent } from './pages/tarefa/tarefa-listar/tarefa-listar.component';
import { TarefaCadastrarComponent } from './pages/tarefa/tarefa-cadastrar/tarefa-cadastrar.component';
import { ListarConcluidasComponent } from './pages/tarefa/listar-concluidas/listar-concluidas.component';
import { ListarNaoConcluidasComponent } from './pages/tarefa/listar-nao-concluidas/listar-nao-concluidas.component';


const routes: Routes = [
  {
    path: "",
    component: TarefaListarComponent
  },
  {
    path: "pages/tarefa/listar",
    component: TarefaListarComponent
  },
  {
    path: "pages/tarefa/cadastrar",
    component: TarefaCadastrarComponent
  },
  { 
    path: "pages/tarefa/editar/:id", 
    component: TarefaCadastrarComponent 
  },
  { 
    path: "pages/tarefa/concluidas", 
    component: ListarConcluidasComponent
  },
  { 
    path: "pages/tarefa/naoconcluidas", 
    component: ListarNaoConcluidasComponent
  }
]; // toda vez que for criar uma nova rota pro componente escrever como um Objeto

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
