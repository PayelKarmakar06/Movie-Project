import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../services/common-data.service';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.css']
})
export class MovieTableComponent implements OnInit {

  public movieTableData: any[] = [];
  public currentPage = 0;
  public searchVal = '';

  constructor(private commonDataService: CommonDataService) { }

  ngOnInit() {
    this.commonDataService.showSpinner();
    this.getMovieData();
  }

  private getMovieData() {
    const url = 'api/movie?page=' + this.currentPage + '&searchBy=' + this.searchVal;
    this.commonDataService.getService(url)
      .subscribe(basicData => {
        this.movieTableData = basicData.data;
        this.commonDataService.hideSpinner();
      });
  }

  public pageChanged(event) {
    this.commonDataService.showSpinner();
    let isPageCall = true;
    if (!event) {
      isPageCall = false;
    } else if (this.currentPage === event - 1) {
      isPageCall = false;
    }
    if (isPageCall) {
      this.currentPage = event - 1;
      this.getMovieData();
    }
  }

}
