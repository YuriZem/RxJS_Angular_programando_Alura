import { LivroService } from './../../service/livro.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {
  campoBusca: string = ''
  listaLivros: [];

  constructor(
    private service:LivroService
  ) { }

  buscarLivros(){
    this.service.buscar(this.campoBusca).subscribe({
      next: res => {},
      error: err => {},
      complete: () => {}
    }
    // parei na aula 2 video 4

      )
  }
}



