import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Position } from '../../models/position';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from '../../models/company';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.page.html',
  styleUrls: ['./job-list.page.scss'],
})
export class JobListPage implements OnInit {
  private jobTitle: String = '';
  public positions: Position[];

  constructor(private appService: AppService,
              private loadingCtrl: LoadingController,
              private route: ActivatedRoute,
              private router: Router) {
    this.jobTitle = this.route.snapshot.params['query'];
    this.positions = this.appService.jobs;
    this.appService.getSearchJobUpdated().subscribe(
      data => {
        this.positions = data;
        console.log(this.positions);
        // this.loading.dismiss();
      }
    );
  }

  public toDetail(id) {
    console.log(id);
    this.appService.getJobDetail(id);
    this.router.navigate(['job-detail', id]);
  }

  ngOnInit() {
  }

}
