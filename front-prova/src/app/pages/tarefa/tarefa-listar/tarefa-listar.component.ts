import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Tarefa } from "src/app/models/tarefa.model";

@Component({
  selector: "app-tarefa-listar",
  templateUrl: "./tarefa-listar.component.html",
  styleUrls: ["./tarefa-listar.component.css"],
})
export class TarefaListarComponent implements OnInit {
  constructor(private client: HttpClient) {}

  colunasTabela: string[] = [
    "titulo",
    "descricao",
    "criadoEm",
    "categoria",
    "status"
  ]

  tarefas: Tarefa[] = [];

  ngOnInit(): void {
    this.client
      .get<Tarefa[]>("https://localhost:7015/api/tarefa/listar")
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

  excluirTarefa(id: number) {
    this.client
    .delete<Tarefa[]>(
      `https://localhost:7195/api/produto/deletar/${id}`
    )
    .subscribe({
      //Requisição com sucesso
      next: (tarefas) => {
        this.tarefas = tarefas;
        console.log("Tarefa excluida!")
      },
      //Requisição com erro
      error: (erro) => {
        console.log(erro);
      },
    });
  }

  alteraStatus(tarefa: Tarefa){
    this.client
    .patch<Tarefa>(`https://localhost:7015/api/tarefa/alterar/${tarefa.tarefaId}`, tarefa)
    .subscribe({
      next: (tarefas) => {
        alert("Status alterada com sucesso")
        console.log(tarefas);
        window.location.reload();
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }
}
