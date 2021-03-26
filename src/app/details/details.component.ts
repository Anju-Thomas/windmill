import { Component, OnInit,Inject } from '@angular/core';
import { TurbineService } from '../services/turbine.service';
import {Note, Wtgs} from '../model/wtgs.model' ;
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
import { MatDialog } from '@angular/material/dialog';
import {FormGroup,FormControl,Validators} from '@angular/forms';





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
  dateSelected:string=""
  idSelected:string=""
  imageIndex:number=1
  sidenavOpen:boolean=false
notes:Note[]=[];
JSON=JSON;
index:number=0;
editIndex:number=0;

dialogueForm=new FormGroup({
  note:new FormControl('',Validators.required)
})

  constructor(private turbineService: TurbineService,private activerouter:ActivatedRoute,
    private router:Router,private breakpointObserver: BreakpointObserver,public dialog: MatDialog
    )
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
  dialogbox(templateRef:any) {
    let dialogRef = this.dialog.open(templateRef, {
         width: '550px',
         height:'250px',
        
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        
    });
}
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
        

        }
        if("C"==elem.blade_id.slice(5,6)){
          this.listC=elem
         
          
        }

    
        }
      
      })
      });
    
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

imageClick(date:string,id:string,j:number,notes:Note[]){
 this. dateSelected=date
  this.idSelected=id
 this. imageIndex=j+1
  this.sidenavOpen=true;
  this.notes=notes;

}

bladeClick(notes:Note[], label:string){
  this.idSelected=label
  this.sidenavOpen=true;
  this.notes=notes;
}
save(){
  this.dialog.closeAll()
  let date=new Date().getTime()
  let note:Note={text:this.dialogueForm.controls["note"].value,date:date}
  this.notes.push(note)
  this.dialogueForm.reset()

}
deleted(index:number){
  this.index=index
}
 delete(){
   
 if (this.index>-1) {
       this.notes.splice(this.index, 1);
}

} 

cancel(){
  (document.getElementById('note')as HTMLInputElement).value=''
  this.dialogueForm.reset()
}
edit(editIndex:number ){
  this.editIndex=editIndex
  this.dialogueForm.patchValue({
    note:this.notes[editIndex].text
  })

}
editNote(){
  this.notes[this.editIndex].text=this.dialogueForm.controls['note'].value
  this.dialogueForm.reset();
  (document.getElementById('note')as HTMLInputElement).value=''
}
}


