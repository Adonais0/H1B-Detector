import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Location } from '../../models/location';
import { Company } from '../../models/company';
import { Position } from '../../models/position';
import { FavPosition } from '../../models/favorite';

import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.page.html',
  styleUrls: ['./company-detail.page.scss'],
})
export class CompanyDetailPage implements OnInit {
  id: String;
  public currentCompany: Company;

  constructor(private appService: AppService,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
    this.currentCompany = this.appService.companyDetail;

    this.appService.getCompanyDetailUpdated().subscribe(
  (companyDetail) => {
    this.currentCompany = companyDetail;
    console.log(this.currentCompany);
    for (let i = 0; i < this.currentCompany.companyPositions.length; i++) {
      this.currentCompany.companyPositions[i].fav = false;
      this.currentCompany.companyPositions[i].applied = false;
    }
    // this.loading.dismiss();
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
