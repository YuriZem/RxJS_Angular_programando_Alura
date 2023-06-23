import { Item, LivrosResultado } from './../../models/interfaces';
import { EMPTY, catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap, throwError } from 'rxjs';
import { LivroService } from './../../service/livro.service';
import { Component } from '@angular/core';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { FormControl } from '@angular/forms';

const PAUSA = 300
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent  {
  campoBusca = new FormControl();
  mensagemErro = '';
  livrosResultado : LivrosResultado;
  listaLivros :any
  constructor(private service: LivroService) {}

  totalDeLivros$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter(valorDigitado => valorDigitado.length > 3),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    map(res => this.livrosResultado = res),
    map(res => res.items ?? []),
    map(items => this.listaLivros = this.livrosResultadoParaLivros(items)),
    catchError(erro =>{
      console.error(erro)
      return of()
    })
  )



  livrosEncontrado$ =  this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter(valorDigitado => valorDigitado.length > 3),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    map(retornoApi => retornoApi.items ?? []),
    map(retorno => this.livrosResultadoParaLivros(retorno)),
    catchError(() => {
      this.mensagemErro = 'Ops ocorreu um erro';
      return EMPTY
    })
  )

  livrosResultadoParaLivros(items: Item[]):LivroVolumeInfo[] {
    return items.map(item => {return new LivroVolumeInfo(item)})
  }
}
