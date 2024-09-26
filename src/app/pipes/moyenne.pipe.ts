import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moyenne',
  standalone: true
})
export class MoyennePipe implements PipeTransform {

  transform(list : number[]): number {
    let somme = 0;
    let moyenne = 0;

    for (let i = 0; i < list.length; i++) {
      somme += list[i];
    }

    moyenne = somme/list.length
    return parseFloat(moyenne.toFixed(1));
  }

}
