import { Component, OnInit } from '@angular/core';
import { TurbineService } from '../services/turbine.service';
import {Wtgs} from '../model/wtgs.model' ;
import {ActivatedRoute} from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  isActive = false;

  columnDefs: any[] = [];
  rowDataList: Wtgs[] = JSON.parse(
    JSON.stringify(this.turbineService.wtgsList)
  ); // Deep copy
  farmList: string[] = [];
  inspectionDateList: string[] = [];
  wtgIdList: string[] = [];
  wtgCatList: any[] = [];
  filterFarmList: string[] = [];
  filterInspectionDateList: string[] = [];
  filterWtgIdList: string[] = [];
  filterWtgCatList: string[]=[];
  fullImagePath: string;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
 
  constructor(private turbineService: TurbineService,private activerouter:ActivatedRoute,private breakpointObserver: BreakpointObserver)
{
  this.fullImagePath = 'assets/images/windmill.jpg'

 }

  data:any=[]
  displayList:any=[]
  ngOnInit() {
this.data=JSON.parse(JSON.stringify(this.activerouter.snapshot.params))
this.setFilters();

this.onLoadRow()
  }
  onToggleFilter(isOpen: boolean): void {
    if (isOpen) {
      return;
    }

    if (
      this.filterFarmList.length +
        this.filterInspectionDateList.length +
        this.filterWtgIdList.length +
        this.filterWtgCatList.length >
      0
    ) {
      this.rowDataList = this.turbineService.wtgsList.filter((wtg) => {
        

        const isValidInspectionDate =
          this.filterInspectionDateList.length > 0
            ? this.filterInspectionDateList.includes(
                wtg.inspection_date.slice(0, 4)
              )
            : true;

        const isValidWtgId =
          this.filterWtgIdList.length > 0
            ? this.filterWtgIdList.includes(wtg.wtg_id)
            : true;

        
        return (
         isValidInspectionDate && isValidWtgId 
        );
      });
    } else {
      this.rowDataList = JSON.parse(
        JSON.stringify(this.turbineService.wtgsList)// Deep copy
      ); 
    }
  }
  onLoadRow(){
    this.rowDataList.forEach(element => {
      if(this.data.id==element.wtg_id)
      {
  JSON.stringify(this.displayList.push(element))
      }
      
    });
    console.log(this.displayList)
  } 
  private setFilters(): void {
    const farmList: string[] = [];
    const inspectionDateList: string[] = [];
    const wtgIdList: string[] = [];

    this.rowDataList.forEach((element) => {
      farmList.push(element.farm);
      inspectionDateList.push(element.next_inspection.slice(0, 4));
      wtgIdList.push(element.wtg_id);
    });

    farmList.sort((a, b) => {
      const lowerA = a.trim().toLowerCase();
      const lowerB = b.trim().toLowerCase();

      return lowerA === lowerB ? 0 : lowerA > lowerB ? 1 : -1;
    });

    inspectionDateList.sort((a, b) => (a === b ? 0 : a > b ? 1 : -1));

    wtgIdList.sort((a, b) => {
      const lowerA = a.trim().toLowerCase();
      const lowerB = b.trim().toLowerCase();

      return lowerA === lowerB ? 0 : lowerA > lowerB ? 1 : -1;
    });

    this.farmList = Array.from(new Set(farmList));
    this.inspectionDateList = Array.from(new Set(inspectionDateList));
    this.wtgIdList = Array.from(new Set(wtgIdList));
    this.wtgCatList = [
      {
        label: 'cat. 5',
        value: 'V5',
        imgSrc: 'assets/images/category-red-filled.png',
      },
      {
        label: 'cat. 4',
        value: 'V4',
        imgSrc: 'assets/images/category-orange-filled.png',
      },
      {
        label: 'cat. 3',
        value: 'V3',
        imgSrc: 'assets/images/category-yellow-filled.png',
      },
      {
        label: 'cat. 2',
        value: 'V2',
        imgSrc: 'assets/images/category-green-filled.png',
      },
      {
        label: 'cat. 1',
        value: 'V1',
        imgSrc: 'assets/images/category-azure-filled.png',
      },
      {
        label: 'cat. 5',
        value: 'A5',
        imgSrc: 'assets/images/category-red-unfilled.png',
      },
      {
        label: 'cat. 4',
        value: 'A4',
        imgSrc: 'assets/images/category-orange-unfilled.png',
      },
      {
        label: 'cat. 3',
        value: 'A3',
        imgSrc: 'assets/images/category-yellow-unfilled.png',
      },
      {
        label: 'cat. 2',
        value: 'A2',
        imgSrc: 'assets/images/category-green-unfilled.png',
      },
      {
        label: 'cat. 1',
        value: 'A1',
        imgSrc: 'assets/images/category-azure-unfilled.png',
      },
    ];
  }
 

  


}
