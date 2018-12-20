import { Location } from './location';

export class FavPosition {
  id: String;
  positionTitle: String;
  company?: String;
  positionCategory: String;
  positionSalary: Number;
  positionLocation?: Location;
  fav: Boolean = false;
}
