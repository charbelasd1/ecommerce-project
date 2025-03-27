import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initialUpper'
})
export class InitialUpperPipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    var result = value.charAt(0).toUpperCase()+value.slice(1);
    var space = value.indexOf(' ');

    if(space!==-1){
        result=result.substring(0,space+1)+value.charAt(space+1).toUpperCase()+value.slice(space+2);
    }

    return result;
  }

}
