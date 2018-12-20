import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Position } from '../../models/position';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { FavPosition } from '../../models/favorite';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  positions: FavPosition[];
  posSub: Subscription;

  constructor(private appService: AppService) {
    this.positions = this.appService.getFav();
    this.posSub = this.appService.updateFavPosition().subscribe(
      (updated) => {
        this.positions = updated;
        console.log(this.positions);
      }
    );
  }

  public rmFavorite(position: FavPosition) {
    this.appService.rmFavorite(position);
  }
}
