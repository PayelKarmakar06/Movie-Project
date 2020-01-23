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
  public filteredItemLength = 744;
  public sortByColumns = [];
  public selectedField = 'Select';
  public dataWithoutFilters = [];

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
    if (fieldName && fieldName !== 'Select') {
      url = url + '&sortBy=' + fieldName;
    }
    this.commonDataService.getService(url)
      .subscribe(basicData => {
        this.movieTableData = basicData.data;
        if (this.selectedField !== 'Select') {
          this.movieTableData = this.movieTableData.sort((a, b) => a[this.selectedField].localeCompare(b[this.selectedField]));
        }
        console.log('this.movieTableData', this.movieTableData);
        this.commonDataService.hideSpinner();
      });
  }

  public pageChanged(pageCounter) {
    this.commonDataService.showSpinner();
    if (pageCounter && this.currentPage !== pageCounter - 1) {
      this.currentPage = pageCounter - 1;
      this.getMovieData();
    }
  }

  public searchMovies(searchVal: string) {
    if (searchVal && searchVal.trim()) {
      this.commonDataService.showSpinner();
      this.currentPage = 0;
      this.getMovieData(searchVal.toLowerCase(), '');
    } else {
      this.movieTableData = this.dataWithoutFilters;
    }
  }

  public sortMovies(fieldName: string) {
    if (this.searchVal && this.searchVal.trim()) {
        return this.movieTableData.sort((a, b) => a[fieldName].localeCompare(b[fieldName]));
    } else {
      this.commonDataService.showSpinner();
      this.currentPage = 0;
      this.getMovieData('', fieldName);
    }
  }

  public searchOnChange() {
    if(this.searchVal.length == 0) {
      this.commonDataService.showSpinner();
      this.getMovieData();
    }
  }

  public resetFilter() {
    this.searchVal = '';
    this.selectedField = 'Select';
    this.commonDataService.showSpinner();
    this.getMovieData();
  }

}