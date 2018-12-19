import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  query: String = '';
  searchType = '';

  constructor(private router: Router,
              private appService: AppService) {}

  search() {
    if (this.searchType === 'job') {
      this.appService.searchJob(this.query.toUpperCase());
      console.log(this.query);
      this.router.navigate(['job-list', this.query]);
    } else if (this.searchType === 'company') {
      this.appService.searchCompany(this.query.toUpperCase());
      this.router.navigate(['company-list', this.query]);
    }
  }
}
