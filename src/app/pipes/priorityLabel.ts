import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'priorityLabel',
})

export class PriorityLabelPipe implements PipeTransform {
    transform(value: number, uppercase: boolean = true): string {
        switch (value) {
            case 1: return uppercase ? 'LOW' : 'Low';
            case 2: return uppercase ? 'MEDIUM' : 'Medium';
            case 3: return uppercase ? 'HIGH' : 'High';
            default: return 'Unknown';
        }
    }
}
