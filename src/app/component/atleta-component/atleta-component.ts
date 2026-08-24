import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AtletaService } from '../service/atleta-service';
import { Atleta } from '../models/Atletas';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-atleta-component',
  imports: [FormsModule],
  templateUrl: './atleta-component.html',
  styleUrl: './atleta-component.css',
})
export class AtletaComponent implements OnInit {
  atleta: Atleta = new Atleta();

  constructor(
    private atletaService: AtletaService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
  
    if (id) {
      this.carregaDados(Number(id));
    }
  
  }

  cadastrarAtleta() {
    this.enviarDadosAtleta();
  }

  limparDados() {
    this.atleta = new Atleta();
  }

  carregaDados(idAtleta: number) {
    this.atletaService.listarAtleta(idAtleta)
      .subscribe({
        next: (dadosAtleta) => {
          this.atleta = dadosAtleta;
        },
        error: (msgErro) => {
          console.log('ERRO AO LISTAR ATLETA', msgErro);
        }
      });
  }

  enviarDadosAtleta() {
    if (this.atleta.id) {
      this.atletaService.alterarAtleta(this.atleta).subscribe({
        next: (resposta: Atleta) => {
          console.log('Alterado com sucesso', resposta);
          this.limparDados();
        },
        error: (err: any) => console.error(err)
      });
    } else {
      this.atletaService.salvarAtleta(this.atleta).subscribe({
        next: (resposta: Atleta) => {
          console.log('Salvo com sucesso', resposta);
          this.limparDados();
        },
        error: (err: any) => console.error(err)
      });
    }
  }
}