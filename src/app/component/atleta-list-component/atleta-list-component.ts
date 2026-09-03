import { Component, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common'; // Adicionado para formatação do IMC
import { Atleta } from '../models/Atletas';
import { AtletaService } from '../service/atleta-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atleta-list-component',
  standalone: true,
  imports: [DecimalPipe], // Incluído o DecimalPipe
  templateUrl: './atleta-list-component.html',
  styleUrl: './atleta-list-component.css'
})
export class AtletaListComponent implements OnInit {

  listaAtletas = signal<Atleta[]>([]);

  constructor(
    private atletaService: AtletaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarAtletas();
  }

  calcularIdade(dataNascimento?: string): number | string {
    if (!dataNascimento) return 0; // ou return '-' caso prefira
    
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
  
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
  
    if (
      mes < 0 ||
      (mes === 0 && hoje.getDate() < nascimento.getDate())
    ) {
      idade--;
    }
  
    return idade;
  }

  // Método para calcular o IMC
  calcularIMC(peso?: number, altura?: number): number {
    if (!peso || !altura || altura <= 0) return 0;
    return peso / (altura * altura);
  }

  // Método para determinar a Situação
  obterSituacaoIMC(peso?: number, altura?: number): string {
    const imc = this.calcularIMC(peso, altura);
    if (imc <= 0) return 'Dados incompletos';

    if (imc < 18.5) return 'Abaixo do peso';
    if (imc >= 18.5 && imc <= 24.9) return 'Peso ideal';
    return 'Acima do peso';
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
    this.router.navigate(['/cadastroAtleta', atleta.id]);
  }
}