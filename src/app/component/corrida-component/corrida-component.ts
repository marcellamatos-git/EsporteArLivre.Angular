import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-corrida-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './corrida-component.html',
  styleUrl: './corrida-component.css'
})
export class CorridaComponent {

  corrida = {
    descricao: '',
    data: '',
    distancias: {
      km5: false,
      km10: false,
      km25: false
    }
  };

  cadastrarCorrida() {
    console.log('--- NOVA CORRIDA CADASTRADA ---');
    console.log(this.corrida);
    console.table({
      Descrição: this.corrida.descricao,
      Data: this.corrida.data,
      '5km': this.corrida.distancias.km5 ? 'Sim' : 'Não',
      '10km': this.corrida.distancias.km10 ? 'Sim' : 'Não',
      '25km': this.corrida.distancias.km25 ? 'Sim' : 'Não'
    });
  }

}