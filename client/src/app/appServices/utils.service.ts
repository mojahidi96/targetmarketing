import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    isLoading = false;
    setisLoading(val: any) {
        this.isLoading = val;
    }
    getisLoading() {
        return this.isLoading;
    }
}
