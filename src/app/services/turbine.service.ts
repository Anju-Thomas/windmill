import { Injectable } from '@angular/core';
import { Wtgs } from '../model/wtgs.model';

import { wtgsList } from '../appHelper';
import {InspectionList} from '../inspection';
import { inspection } from '../model/inspection.model';

@Injectable({
  providedIn: 'root'
})
export class TurbineService {
 

  wtgsList: Wtgs[] = wtgsList;
  InspectionList:inspection[]=InspectionList

  constructor() { }

}
