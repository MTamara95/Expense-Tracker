import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spaceSeparated'
})
export class SpaceSeparatedPipe implements PipeTransform {
  transform(value: any[]): string {
    return value.join(', ');
  }
}