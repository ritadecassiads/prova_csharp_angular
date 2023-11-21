import { Component } from "@angular/core";
import { Tarefa } from "src/app/models/tarefa.model";
import { ActivatedRoute } from "@angular/router";
import { Categoria } from "src/app/models/categoria.model";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-tarefa-cadastrar",
  templateUrl: "./tarefa-cadastrar.component.html",
  styleUrls: ["./tarefa-cadastrar.component.css"],
})
export class TarefaCadastrarComponent {
  titulo: string = "";
  descricao: string = "";
  criadoEm: string = "";
  categoriaId: number = 0;
  categorias: Categoria[] = [];
  status: string = "";

  constructor(private route: ActivatedRoute, private client: HttpClient) {}

  ngOnInit() {
    this.client
      .get<Categoria[]>("https://localhost:7015/api/categoria/listar")
      .subscribe({
        next: (categorias) => {
          console.log(categorias);
          this.categorias = categorias;
        },
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  salvarTarefa() {
    let tarefa: Tarefa = {
      titulo: this.titulo,
      descricao: this.descricao,
      criadoEm: this.criadoEm,
      categoriaId: this.categoriaId,
      status: this.status,
    };

    this.client
      .post<Tarefa>("https://localhost:7015/api/tarefa/cadastrar", tarefa)
      .subscribe({
        //A requição funcionou
        next: (tarefa) => {
          alert("cadastrou!!")
        },
        //A requição não funcionou
        error: (erro) => {
          console.log(erro);
        },
      });
  }
}
