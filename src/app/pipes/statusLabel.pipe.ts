import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'statusLabel',
})

export class StatusLabelPipe implements PipeTransform {
    transform(value: number): string {
        switch (value) {
            case 1: return 'TODO';
            case 2: return 'IN PROGRESS';
            case 3: return 'IN REVIEW';
            case 4: return 'DONE';
            default: return 'Unknown';
        }
    }
}
