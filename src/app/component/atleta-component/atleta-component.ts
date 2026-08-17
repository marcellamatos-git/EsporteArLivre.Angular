import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importação do FormsModule

@Component({
  selector: 'app-atleta-component',
  standalone: true,
  imports: [FormsModule], // Adicionado na lista de imports
  templateUrl: './atleta-component.html',
  styleUrl: './atleta-component.css'
})
export class AtletaComponent {

  // Objeto para capturar os campos do formulário
  atleta = {
    nome: '',
    cpf: '',
    sexo: '',
    cep: '',
    ruaLogradouro: '',
    bairro: '',
    cidade: ''
  };

  cadastrarAtleta() {
    console.log('--- NOVO ATLETA CADASTRADO ---');
    console.log(this.atleta);
    console.table(this.atleta); // Exibe em formato de tabela organizada
  }

}