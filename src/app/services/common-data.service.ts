import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  private hostVar = 'http://localhost:3000/';

  constructor(private http: HttpClient,
              private spinner: NgxSpinnerService) {
  }

  private spinnerRunning = false;
  public getService(url: string): Observable<any> {
    url = this.hostVar + url;
    return this.http.get(url).pipe(
      catchError(err => {
        return of(null);
      }),
    );
  }

  public showSpinner() {
    // tslint:disable-next-line:no-debugger
    debugger;
    if (!this.spinnerRunning) {
      this.spinner.show();
      this.spinnerRunning = true;
    }
  }

  public hideSpinner() {
    this.spinnerRunning = false;
    this.spinner.hide();
  }

}
