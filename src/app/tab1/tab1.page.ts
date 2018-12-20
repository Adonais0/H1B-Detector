import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { AuthAPIService } from '../auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  query: String = '';
  searchType = '';
  isAuthed: Boolean = false;
  isAuthedUpdate: Subscription;

  constructor(private router: Router,
              private appService: AppService,
              private authService: AuthAPIService) {
    this.isAuthed = this.authService.getIsAuth();
    this.isAuthedUpdate = this.authService.getAuthStatusListener().subscribe(
      status => {
        this.isAuthed = status;
        console.log('status changed');
        console.log(this.isAuthed);
      }
    );
  }

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

  toEdit() {
    this.router.navigate(['edit']);
  }
}
