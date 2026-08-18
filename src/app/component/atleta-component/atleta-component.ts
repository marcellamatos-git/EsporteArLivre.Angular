import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AtletaService } from '../service/atleta-service';
import { Atleta } from '../models/Atletas';
@Component({
  selector: 'app-atleta-component',
  imports: [FormsModule],
  templateUrl: './atleta-component.html',
  styleUrl: './atleta-component.css',
})
export class AtletaComponent {
  atleta: Atleta = new Atleta();

  constructor(private atletaService: AtletaService) {}

  cadastrarAtleta() {
    this.enviarDadosAtleta();
  }

  limparDados() {
    this.atleta = new Atleta();
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