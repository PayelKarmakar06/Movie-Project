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
  public filteredItemLength = 500;
  public sortByColumns = [];

  constructor(private commonDataService: CommonDataService) { }

  ngOnInit() {
    this.commonDataService.showSpinner();
    this.getMovieData();
    this.sortByColumns = [{name: 'Title', value: 'primaryTitle'},
                          {name: 'Genre', value: 'genres'},
                          {name: 'Rating', value: 'averageRating'},
                          {name: 'Runtime', value: 'runtimeMinutes'} ];
  }

  private getMovieData(searchVal?: string, fieldName?: string) {
    let url = 'api/movie?page=' + this.currentPage;
    if (searchVal) {
      url = url + '&searchBy=' + searchVal;
    }
    if (fieldName) {
      url = url + '&sortBy=' + fieldName;
    }
    this.commonDataService.getService(url)
      .subscribe(basicData => {
        this.movieTableData = basicData.data;
        if (searchVal || searchVal !== 'undefined' || fieldName || fieldName !== 'undefined') {
          this.filteredItemLength = basicData.data.length;
        }
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

  public searchMovies(searchVal: string) {
    if (searchVal.length > 2) {
      this.commonDataService.showSpinner();
      this.currentPage = 0;
      this.getMovieData(searchVal.toLowerCase());
    }
  }

  public sortMovies(fieldName: string) {
    if (this.searchVal && this.searchVal.length > 2) {
        return this.movieTableData.sort((a, b) => a[fieldName].localeCompare(b[fieldName]));
    } else {
      this.commonDataService.showSpinner();
      this.currentPage = 0;
      this.getMovieData('', fieldName);
    }
  }

}
