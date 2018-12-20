import { Component, OnInit } from '@angular/core';
import { Position } from '../../models/position';
import { AppService } from './../app.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FavPosition } from '../../models/favorite';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.page.html',
  styleUrls: ['./job-detail.page.scss'],
})
export class JobDetailPage implements OnInit {
  public position: Position;
  id: String;
  constructor(
    private appService: AppService,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params['id'];
    this.position = this.appService.jobDetail;
    this.appService.getJobDetailUpdated().subscribe(
      (jobDetail) => {
        this.position = jobDetail;
        console.log(this.position);
        // this.loading.dismiss();
        // this.getAvatar();

      }
    );
  }

  public addToFavorite(company: String, position: FavPosition) {
    const pos: FavPosition = {
      'id': String(localStorage.getItem('favorite') == null ? 0 : localStorage.getItem('favorite').length),
      'positionTitle': position.positionTitle,
      'company': company,
      'positionCategory': position.positionCategory,
      'positionSalary': 20000,
      'fav': false,
    };

    pos.fav = true;
    this.appService.addFovoriteJobs(pos);
    this.appService.updateFavPosition();
    // this.presentToast(position.positionTitle);
  }

  ngOnInit() {
  }

}
