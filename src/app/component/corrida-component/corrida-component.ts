import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corrida-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './corrida-component.html',
  styleUrl: './corrida-component.css'
})
export class CorridaComponent implements OnInit {

  corrida = {
    descricao: '',
    data: '',
    distancias: {
      km5: false,
      km10: false,
      km25: false
    }
  };

  constructor(private router: Router) {}

  ngOnInit(): void {

    const id = localStorage.getItem('corridaEditar');

    if (id) {

      const dados = localStorage.getItem('corridas');

      if (dados) {

        const corridas = JSON.parse(dados);

        const corridaEncontrada = corridas.find(
          (corrida: any) => corrida.id === Number(id)
        );
        if (corridaEncontrada) {
          this.corrida = corridaEncontrada;
        
          if (this.corrida.data) {
            this.corrida.data = this.corrida.data.substring(0, 10);
          }
        }
      }

      localStorage.removeItem('corridaEditar');
    }
  }

  cadastrarCorrida(): void {

    const dados = localStorage.getItem('corridas');

    const corridas = dados ? JSON.parse(dados) : [];

    if ((this.corrida as any).id) {

      const indice = corridas.findIndex(
        (corrida: any) =>
          corrida.id === (this.corrida as any).id
      );

      if (indice !== -1) {
        corridas[indice] = this.corrida;
      }

    } else {

      const novaCorrida = {
        id: corridas.length > 0
          ? Math.max(
              ...corridas.map((corrida: any) => corrida.id)
            ) + 1
          : 1,

        ...this.corrida
      };

      corridas.push(novaCorrida);
    }

    localStorage.setItem(
      'corridas',
      JSON.stringify(corridas)
    );

    console.log('--- NOVA CORRIDA CADASTRADA ---');
    console.log(this.corrida);

    console.table({
      Descrição: this.corrida.descricao,
      Data: this.corrida.data,
      '5km': this.corrida.distancias.km5 ? 'Sim' : 'Não',
      '10km': this.corrida.distancias.km10 ? 'Sim' : 'Não',
      '25km': this.corrida.distancias.km25 ? 'Sim' : 'Não'
    });

    this.router.navigate(['/listaCorrida']);
  }
}