import { Component, OnInit } from '@angular/core';
import { EditService } from './edit.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  jobTitle: String = '';
  jobCategory: String = '';
  categories: any[];

  constructor(private editService: EditService) {
    this.editService.getCategories();
    this.categories = this.editService.categories;
    this.editService.getCategoriesUpdate().subscribe(
      data => {
        this.categories = data;
      }
    );
  }

  createJob() {
    const body = {
      'job': this.jobTitle,
      'job_category': this.jobCategory
    };
    this.editService.postJob(body);
  }

  ngOnInit() {
  }

}
