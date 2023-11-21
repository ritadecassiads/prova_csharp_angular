import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Tarefa } from 'src/app/models/tarefa.model';

@Component({
  selector: 'app-listar-concluidas',
  templateUrl: './listar-concluidas.component.html',
  styleUrls: ['./listar-concluidas.component.css']
})
export class ListarConcluidasComponent {
  constructor(private client: HttpClient) {}

  colunasTabela: string[] = [
    "titulo",
    "descricao",
    "criadoEm",
    "categoria",
    "status",
  ]

  tarefas: Tarefa[] = [];

  ngOnInit(): void {
    this.client
      .get<Tarefa[]>("https://localhost:7015/api/tarefa/concluidas")
      .subscribe({
        next: (tarefas) => {
          console.log(tarefas);
          this.tarefas = tarefas;
        },
        error: (erro) => {
          console.log(erro);
        },
      });
  }
}
