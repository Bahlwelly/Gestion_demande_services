import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorter',
  standalone: true
})
export class ShorterPipe implements PipeTransform {

  transform(value: string, limit : number, trail = "..."): string {
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

}
