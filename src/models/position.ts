import { Location } from './location';
import { Company } from './company';

export class Position {
  id: String;
  positionTitle: String;
  positionCategory: String;
  positionSalary: Number;
  positionLocation?: Location;
  positionCompanies?: Company[];
  positionApproved?: Number;
  positionDenied?: Number;
  fav: Boolean = false;
  applied: Boolean = false;
}
