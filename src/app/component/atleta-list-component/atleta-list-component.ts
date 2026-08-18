import { Component, OnInit, signal } from '@angular/core';
import { Atleta } from '../models/Atletas';
import { AtletaService } from '../service/atleta-service';

@Component({
  selector: 'app-atleta-list-component',
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
        console.error('Erro ao buscar atletas:', erro);
      }
    });
  }

  excluir(id: number): void {
    this.atletaService.excluirAtleta(id).subscribe({
      next: () => {
        this.listarAtletas();
      },
      error: (erro) => {
        console.error('Erro ao excluir atleta:', erro);
      }
    });
  }
}