import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Company } from '../../models/company';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.page.html',
  styleUrls: ['./company-list.page.scss'],
})
export class CompanyListPage implements OnInit {
  private companyTitle: String = '';
  public companies: Company[];

  constructor(private appService: AppService,
              private loadingCtrl: LoadingController,
              private route: ActivatedRoute,
              private router: Router) {
    this.companyTitle = this.route.snapshot.params['query'];
    this.companies = this.appService.companies;
    this.appService.getSearchCompanyUpdated().subscribe(
      data => {
        this.companies = data;
        // this.loading.dismiss();
        console.log(this.companies);
      }
    );
}

public toDetail(id) {
    this.appService.getCompanyDetail(id);
    this.router.navigate(['company-detail', id]);
  }

  ngOnInit() {
  }

}
