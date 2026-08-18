import { Component, OnInit, signal } from '@angular/core';
import { Atleta } from '../models/Atletas';
import { AtletaService } from '../service/atleta-service';

@Component({
  selector: 'app-atleta-list-component',
  standalone: true,
  imports: [],
  templateUrl: './atleta-list-component.html',
  styleUrl: './atleta-list-component.css'
})
export class AtletaListComponent implements OnInit {

  listaAtletas = signal<Atleta[]>([]);

  constructor(private atletaService: AtletaService) {}

  ngOnInit(): void {
    this.listarAtletas();
  }

  listarAtletas(): void {

    this.atletaService.listarAtletas().subscribe({
      next: (dadosAtletas: Atleta[]) => {
        this.listaAtletas.set(dadosAtletas);
      },

      error: (erro) => {
        console.error('Erro ao listar atletas:', erro);
      }
    });

  }

  excluir(id: number | undefined): void {

    if (id === undefined) {
      console.error('ID do atleta não encontrado.');
      return;
    }

    this.atletaService.excluirAtleta(id).subscribe({

      next: () => {
        console.log('Atleta excluído com sucesso.');
        this.listarAtletas();
      },

      error: (erro) => {
        console.error('Erro ao excluir atleta:', erro);
      }

    });
  }

  carregaDadosAtletaForm(atleta: Atleta): void {

    console.log('Atleta selecionado:', atleta);

  }

}