import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class EditService {
  public categories: any[];
  public categoryUpdate: Subject<any[]>;

  constructor(private httpClient: HttpClient) {
    this.categories = [];
    this.categoryUpdate = new Subject();
    this.categoryUpdate.next(this.categories);
  }

  public getCategories() {
    this.httpClient.get<any>(BACKEND_URL + 'category/').subscribe(
      (categories) => {
        this.categories = categories;
        this.categoryUpdate.next(this.categories);
      }
    );
  }

  postJob(content) {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

    this.httpClient.post<any>(BACKEND_URL + 'create/job/', content, {headers: headers}).subscribe(
      (res) => {
        console.log('successfully added the job');
      }, (err) => {
        console.log('error when adding the job');
      }
    );
  }

  public getCategoriesUpdate() {
    return this.categoryUpdate.asObservable();
  }
}
