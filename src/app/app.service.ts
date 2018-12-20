import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Location } from '../models/location';
import { Company } from '../models/company';
import { Position } from '../models/position';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public fetchedCompany: any[];
  public fetchedCompanyDetail: any;
  public fetchedJob: any[];
  public fetchedJobDetail: any;

  public companies: Company[];
  public companyDetail: Company;
  public jobs: Position[];
  public jobDetail: Position;

  public companyUpdate: Subject<Company[]>;
  public companyDetailUpdate: Subject<Company>;
  public jobUpdate: Subject<Position[]>;
  public jobDetailUpdate: Subject<Position>;

  constructor(private httpClient: HttpClient) {
    this.companies = [];
    this.jobs = [];

    this.companyUpdate = new Subject();
    this.jobUpdate = new Subject();

    this.companyDetailUpdate = new Subject();
    this.jobDetailUpdate = new Subject();

    this.companyUpdate.next(this.companies);
    this.jobUpdate.next(this.jobs);
    this.companyDetailUpdate.next(this.companyDetail);
    this.jobDetailUpdate.next(this.jobDetail);
  }

  // ================ HTTP REQUEST ================== //
// ================SEARCH FOR Companies ================== //
public searchCompany(query: String) {
  this.httpClient.get<any>(BACKEND_URL + 'search/company/' + query + '/').subscribe(
    (fetchedData) => {
      this.fetchedCompany = fetchedData.slice(0, 20).map(this.parseCompany);
      this.companies = this.fetchedCompany;
      this.companyUpdate.next(this.companies);
    }
  );
}

public getSearchCompanyUpdated() {
  return this.companyUpdate.asObservable();
}

public parseCompany(company: any) {
  const result: Company = {
    id : company.company_id,
    companyName : company.company,
    companyLocation : company.location.city_id.city + ' ' + company.location.state_id.state,
    companyApplications : 20,
  };
  return result;
}

public getCompanyDetail(id: Number) {
  this.httpClient.get<any>(BACKEND_URL + 'company/' + id + '/').subscribe(
    (fetchedData) => {
      this.fetchedCompanyDetail = this.parseCompanyDetail(fetchedData);
      this.companyDetail = this.fetchedCompanyDetail;
      this.companyDetailUpdate.next(this.companyDetail);
    }
  );
}

public getCompanyDetailUpdated() {
  return this.companyDetailUpdate.asObservable();
}

public parseCompanyDetail(company: any) {
  return {
    id: company.company_id,
    companyName: company.company,
    companyLocation:
    company.location.city_id.city + ' - ' + company.location.state_id.state + ' - ' + company.location.postal_code_id.postal_code,
    companyApplications: 300,
    companyPositions: company.company_job.map(parseJob)
  };

  function parseJob(job: any) {
    return {
      positionTitle: job.job,
    };
  }
}

// ================SEARCH FOR JOB ================== //

public searchJob(query: String) {
  this.httpClient.get<any>(BACKEND_URL + 'search/job/' + query + '/').subscribe(
    (fetchedData) => {
      this.fetchedJob = fetchedData.slice(0, 20).map(this.parseJob);
      this.jobs = this.fetchedJob;
      this.jobUpdate.next(this.jobs);
      console.log(this.jobs);
    }
  );
}

public getSearchJobUpdated() {
  return this.jobUpdate.asObservable();
}

public parseJob(job: any) {
  const result: Position = {
    id : job.job_id,
    positionTitle : job.job,
    positionSalary: 80000,
    positionCategory: job.job_category.job_category,
    fav: false,
    applied: false,
  };
  return result;
}

public parseJobDetail(job: any) {
  const result: Position = {
    id : job.position.job_id,
    positionTitle : job.position.job,
    positionSalary: 80000,
    positionCategory: job.position.job_category.job_category,
    positionCompanies: job.companies,
    fav: false,
    applied: false,
  };
  return result;
}

public getJobDetail(id: Number) {
  this.httpClient.get<any>(BACKEND_URL + 'job/' + id + '/').subscribe(
    (fetchedData) => {
      this.fetchedJobDetail = this.parseJobDetail(fetchedData);
      this.jobDetail = this.fetchedJobDetail;
      this.jobDetailUpdate.next(this.jobDetail);
    }
  );
}

public getJobDetailUpdated() {
  return this.jobDetailUpdate.asObservable();
}
}
