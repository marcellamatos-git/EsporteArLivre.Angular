import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-corrida-list-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './corrida-list-component.html',
  styleUrl: './corrida-list-component.css'
})
export class CorridaListComponent implements OnInit {

  corridas: any[] = [];

  ngOnInit(): void {
    this.listarCorridas();
  }

  listarCorridas(): void {
    const dados = localStorage.getItem('corridas');

    if (dados) {
      this.corridas = JSON.parse(dados);
    }
  }

  editar(id: number): void {
    localStorage.setItem('corridaEditar', id.toString());

    window.location.href = '/cadastroCorrida';
  }

  excluir(id: number): void {

    if (!confirm('Deseja realmente excluir esta corrida?')) {
      return;
    }

    const dados = localStorage.getItem('corridas');

    if (!dados) {
      return;
    }

    const corridas = JSON.parse(dados);

    const novasCorridas = corridas.filter(
      (corrida: any) => corrida.id !== id
    );

    localStorage.setItem(
      'corridas',
      JSON.stringify(novasCorridas)
    );

    this.listarCorridas();
  }
}