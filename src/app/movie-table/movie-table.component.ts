import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../services/common-data.service';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.css']
})
export class MovieTableComponent implements OnInit {

  constructor(private commonDataService: CommonDataService) { }

  ngOnInit() {
    this.getDatafromService();
  }

  private getDatafromService() {
    this.commonDataService.getService('assets/title.basics.tsv/data.tsv')
      .subscribe(basicData => {
        console.log(basicData);
      });
  }

}
