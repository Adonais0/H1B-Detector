import { Position } from './position';
import { Location } from './location';

export class Company {
  id: String;
  companyName: String;
  companyLocation: String;
  companyApplications?: Number;
  companyPositions?: Position[];
}
