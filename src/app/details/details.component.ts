import { Component, OnInit } from '@angular/core';
import { TurbineService } from '../services/turbine.service';
import {Wtgs} from '../model/wtgs.model' ;
import {ActivatedRoute} from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { inspection } from '../model/inspection.model';
import {CatColors} from '../catColors';
import { Router} from '@angular/router'; 
import { MatSelectChange } from '@angular/material/select';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { variable } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  isActive = false;

  

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
 
  
 wtg_IdList:any[]=[]
 inspectionsList:any[]=[]
  data:any=[]
  displayList:any=[]
  listA:any
  listB:any
  listC:any
  filterWtgIdList: string[] = [];
  wtgidDateList:string[]=[];
  idList:string[]=[];
  inspectionDataList:any=[]
  bladeA:any
  bladeB:any
  bladeC:any
  filterId: string=""
  filterDate:string=""
  constructor(private turbineService: TurbineService,private activerouter:ActivatedRoute,
    private router:Router,private breakpointObserver: BreakpointObserver)
{

 }
  ngOnInit():void{
    this.activerouter.params.subscribe((params)=>{
      this.data=params
      this.onLoadRow()
this.setFilter()
this.filterId=this.data.id
this.filterDate=this.data.date
console.log(this.filterDate)
    })




  }
  rowDataList:Wtgs[]=JSON.parse(JSON.stringify(this.turbineService.wtgsList));
  inspectionList:inspection[]=JSON.parse(JSON.stringify(this.turbineService.InspectionList))
  onLoadRow(){
    this.rowDataList.forEach(element => {
      if(this.data.id==element.wtg_id)
      {
  JSON.stringify(this.displayList.push(element))
      }
      this.inspectionList.forEach(elem=>{
        if(this.data.id==elem.blade_id.slice(0,4) && (this.data.date==elem.inspection_date.slice(0,10))
        ){
        if("A"==elem.blade_id.slice(5,6)){
          this.listA=elem
          // console.log(this.listA)
        }
        if("B"==elem.blade_id.slice(5,6)){
          this.listB=elem
          // console.log(this.listB)

        }
        if("C"==elem.blade_id.slice(5,6)){
          this.listC=elem
          // console.log(this.listC)
          
        }

    
        }
      
      })
      });
    // console.log(this.displayList)
    //console.log(this.inspectionDataList) 
  } 

  getImgSrc(imageCat: any): string {
    let imageSrc = '../../assets/images/blade-';
  
    const cat = imageCat.validated ?? imageCat.auto;
    imageSrc += CatColors[cat];
  
    const isValidated = imageCat.validated != null;
    imageSrc += isValidated ? '-filled.png' : '-unfilled.png';
  
    return imageSrc;
  }
   private setFilter():void{
    const inspectionsList:string[]=[];
    const wtg_IdList: string[] = [];

     this.rowDataList.forEach((element)=>{
       wtg_IdList.push(element.wtg_id)
       inspectionsList.push(element.inspection_date.slice(0,10))

     });
     wtg_IdList.sort((a, b) => {
      const lowerA = a.trim().toLowerCase();
      const lowerB = b.trim().toLowerCase();

      return lowerA === lowerB ? 0 : lowerA > lowerB ? 1 : -1;
    });
    inspectionsList.sort((a:any,b:any)=>{
  var val1:any = new Date(a.inspection_date).getTime()
  var val2:any = new Date (b.inspections_date).getTime() 
  return   val1 > val2 ? 1:-1

   })
   this.inspectionsList=Array.from(new Set(inspectionsList))
   this.wtg_IdList=Array.from(new Set(wtg_IdList))
  }
  onToggleFilter(e:MatSelectChange):void{
    this.router.navigate(['details',this.filterId,this.filterDate])
    this.displayList=[]
    this.listA=''
    this.listB=''
    this.listC=''
  }
  }