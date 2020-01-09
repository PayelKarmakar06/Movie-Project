import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  constructor(private http: HttpClient) {
  }

  public getService(url: string): Observable<any> {
    return this.http.get(url, {responseType: 'text'}).pipe(
      catchError(errpr => {
        return of(null);
      }),
    );
  }
}
