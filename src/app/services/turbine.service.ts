import { Injectable } from '@angular/core';
import { Wtgs } from '../model/wtgs.model';

import { wtgsList } from '../appHelper';

@Injectable({
  providedIn: 'root'
})
export class TurbineService {
 

  wtgsList: Wtgs[] = wtgsList;

  constructor() { }

}
