import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapse', style({ height: '0px', minHeight: '0' })),
      state('expand', style({ height: '*' })),
      transition('expand <=> collapse', animate('250ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AnimationComponent implements OnInit {

  isTableExpanded = false;  
  imageUrl = "/assets/image/";
  customDS = new MatTableDataSource();  
  displayedColumns: string[] = ['className','sectionName','profileImage','studentName', 'studentID', 'examName', 'fullMark', 'obtainMark', 'actions'];

  constructor() { }

  dataSource : any = [
    {studentID : '000001', studentName : 'Masud Hasan', profileImage : '1001.jpg', className : 'PLAY', sectionName:'PLAY-A', 
    parentID : 0, examID : 1, examName : '1st Semester', subjectName : '', fullMark : 300, passMark : 0, obtainMark : 275, isExpanded : 0 },
    {studentID : '000001', studentName : 'Masud Hasan', profileImage : '1001.jpg', className : 'PLAY', sectionName:'PLAY-A', 
    parentID : 1, examID : 1, examName : '1st Semester', subjectName : 'BANGLA', fullMark : 100, passMark : 40, obtainMark : 95, isExpanded : 0 },
    {studentID : '000001', studentName : 'Masud Hasan', profileImage : '1001.jpg', className : 'PLAY', sectionName:'PLAY-A', 
    parentID : 1, examID : 1, examName : '1st Semester', subjectName : 'ENGLISH', fullMark : 100, passMark : 40, obtainMark : 90, isExpanded : 0 },
    {studentID : '000001', studentName : 'Masud Hasan', profileImage : '1001.jpg', className : 'PLAY', sectionName:'PLAY-A', 
    parentID : 1, examID : 1, examName : '1st Semester', subjectName : 'MATH', fullMark : 100, passMark : 40, obtainMark : 90, isExpanded : 0 },

    {studentID : '000001', studentName : 'Masud Hasan', profileImage : '1001.jpg', className : 'PLAY', sectionName:'PLAY-A', 
    parentID : 0, examID : 2, examName : '2nd Semester', subjectName : '', fullMark : 300, passMark : 0, obtainMark : 255, isExpanded : 0 },
    {studentID : '000001', studentName : 'Masud Hasan', profileImage : '1001.jpg', className : 'PLAY', sectionName:'PLAY-A', 
    parentID : 2, examID : 2, examName : '2nd Semester', subjectName : 'BANGLA', fullMark : 100, passMark : 40, obtainMark : 90, isExpanded : 0 },
    {studentID : '000001', studentName : 'Masud Hasan', profileImage : '1001.jpg', className : 'PLAY', sectionName:'PLAY-A', 
    parentID : 2, examID : 2, examName : '2nd Semester', subjectName : 'ENGLISH', fullMark : 100, passMark : 40, obtainMark : 80, isExpanded : 0 },
    {studentID : '000001', studentName : 'Masud Hasan', profileImage : '1001.jpg', className : 'PLAY', sectionName:'PLAY-A',
    parentID : 2, examID : 2, examName : '2nd Semester', subjectName : 'MATH', fullMark : 100, passMark : 40, obtainMark : 85, isExpanded : 0 },

    {studentID : '000001', studentName : 'Masud Hasan', profileImage : '1001.jpg', className : 'PLAY', sectionName:'PLAY-A', 
    parentID : 0, examID : 3, examName : 'Annual Exam', subjectName : '', fullMark : 300, passMark : 0, obtainMark : 268, isExpanded : 0 },
    {studentID : '000001', studentName : 'Masud Hasan', profileImage : '1001.jpg', className : 'PLAY', sectionName:'PLAY-A', 
    parentID : 3, examID : 3, examName : 'Annual Exam', subjectName : 'BANGLA', fullMark : 100, passMark : 40, obtainMark : 98, isExpanded : 0 },
    {studentID : '000001', studentName : 'Masud Hasan', profileImage : '1001.jpg', className : 'PLAY', sectionName:'PLAY-A', 
    parentID : 3, examID : 3, examName : 'Annual Exam', subjectName : 'ENGLISH', fullMark : 100, passMark : 40, obtainMark : 75, isExpanded : 0 },
    {studentID : '000001', studentName : 'Masud Hasan', profileImage : '1001.jpg', className : 'PLAY', sectionName:'PLAY-A', 
    parentID : 3, examID : 3, examName : 'Annual Exam', subjectName : 'MATH', fullMark : 100, passMark : 40, obtainMark : 95, isExpanded : 0 }

  ]
  
  ngOnInit(): void {
    this.loadGridView();
  }
  
  loadGridView(){    
    this.customDS.data = this.constructJSONFormate(this.dataSource);
   }
   constructJSONFormate(treeData){

     let jsonArray = [];
     for (let i of treeData) {       
       let jsonObj = i;   
       let assigned = false;     
       this.constructNestedJSON(jsonArray, jsonObj, assigned)
     }
     return jsonArray;
   }
   constructNestedJSON(jsonArray, jsonObj, assigned) {
   
        if (jsonObj.parentID == 0) {            
           jsonObj.children = [];
           jsonArray.push(jsonObj);      
           
           return true;
         } 
         else if (jsonObj.parentID == jsonArray.examID) {   
           jsonArray.children.push(jsonObj);    

           return true;
         }      
         else {
           if (jsonArray.length > 0) 
           { 
             
            for (let index = 0; index < jsonArray.length; index++) {
              let constructedObj = jsonArray[index];         
              if (assigned == false) {   

                assigned = this.constructNestedJSON(constructedObj, jsonObj, assigned);                             
              }
           
            }
           } 
          
           return false;
         }
       }
 
       // Toggel Rows
   toggleTableRows() {
     this.isTableExpanded = !this.isTableExpanded;
 
     this.customDS.data.forEach((row: any) => {
       row.isExpanded = this.isTableExpanded;
     })
   }

}
