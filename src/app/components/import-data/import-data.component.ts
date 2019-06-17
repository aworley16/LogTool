import {Component, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
import {IndexFileStoreService} from '../../index-file-store.service';
import {BsModalRef, BsModalService, ModalDirective, ModalModule} from 'ngx-bootstrap';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component2.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImportDataComponent implements OnInit {

  fileName: any;
  ailis: string;
  fileContent: any = '';
  header = [];
  start: any;
  end: any;
  data_count: any;
  number_columns;
  readFirstRow: any;
  fileCsvRead = [];
  filled = false;
  filled2 = false;
  // bsModalRef: BsModalRef;
  // constructor(private dialog: MatDialogRef<ImportDataComponent>, private indexFileStore: IndexFileStoreService) {}
  constructor( private indexFileStore: IndexFileStoreService,   private modalService: BsModalService, private bsModalRef: BsModalRef) {}
  ngOnInit() {
      this.fileName = 'Please select a file to upload';
  }
  ngOnInit() {
      this.fileName = 'Please select a file to upload';
  }
  file_rename(name){
     this.ailis = name;
     console.log(this.ailis);
  }

  onChange(event) {
    this.fileName = '';
    this.fileContent = '';
    this.header = [];
    this.start = '';
    this.end = '';
    this.data_count = '';
    this.number_columns = '';
    this.readFirstRow = '';
    this.fileCsvRead = [];
    const reader = new FileReader();
    this.fileName = event.target.files[0].name;
    reader.readAsText(event.target.files[0]);
    const me = this;
    reader.onload = function () {
      me.fileContent = '';
      me.fileContent = reader.result;
      me.fileCsvRead = me.fileContent.split('\n');
      me.fileContent = d3.csvParse(me.fileContent);
        me.readFirstRow = me.fileCsvRead[1].split(',');
        for (let i = 0; i < me.fileCsvRead[0].split(',').length; i++) {
          let check = false;
          check = !(me.readFirstRow[i] === null || me.readFirstRow[i] === undefined
            || me.readFirstRow[i] === '' || me.readFirstRow[i] === ' ');
          me.header.push({
            id: i,
            checked: check,
            name: me.fileCsvRead[0].split(',')[i]
          });
        }
        me.start = me.fileCsvRead[1].split(',')[1];
        if (me.fileCsvRead[me.fileCsvRead.length - 1] === '' ||
          me.fileCsvRead[me.fileCsvRead.length - 1] === undefined
          || me.fileCsvRead[me.fileCsvRead.length - 1] === null) {
          me.end = me.fileCsvRead[me.fileCsvRead.length - 2].split(',')[1];
        } else {
          me.end = me.fileCsvRead[me.fileCsvRead.length - 1].split(',')[1];
        }
        me.data_count = me.fileContent.length;
        me.number_columns = me.header.length;
    };
    this.filled = true;
    console.log(this.fileName);
  }

  submitCheckBox(formData) {
    const formDataVariable = [];
    const dataArrayColumns = [];
    const selectedHeader = [];
    for (let i = 0; i < this.header.length; i++) {
      if (formData[i]) {
        formDataVariable.push(i);
      }
    }
    for (let z = 0; z < formDataVariable.length; z++) {
      const temp = [];
      for (let i = 1; i < this.fileCsvRead.length; i++) {
        const initialSplit = this.fileCsvRead[i].split(',');
        for (let j = 0; j < initialSplit.length; j++) {
          if (j === formDataVariable[z]) {
            temp.push(initialSplit[j]);
          }
        }
      }
      dataArrayColumns.push(temp);
    }
    for (let i = 0; i < this.header.length; i ++) {
      if (this.header[i].checked) {
        selectedHeader.push({
          headerName: this.header[i].name,
          field: this.header[i].name,
          editable: true
        });
      }

    }
    this.indexFileStore.addIntoDB(this.fileName, this.fileContent, dataArrayColumns,
      this.header, selectedHeader, this.fileContent.columns, this.start, this.end, '', this.data_count, this.number_columns, '');
 /*   setTimeout( () => {
      this.dialog.close();
      console.log('Send Data');
    }, 2000);*/

  }

  columnNameChange(event) {
    console.log(event);
  }

  // --------------------------------------------------------------------------------------------
  openModalWithComponent() {
    const initialState = {

      filename: 'DOOM',
    };

    this.bsModalRef = this.modalService.show( {initialState, class: "my-modal"});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  close(){
    this.bsModalRef.hide();
  }


}

//remove from angular.modules

// ---------------Code for popup Modal -------------------------------------------------------------
@Component({
  selector: 'app-modal-content',
  templateUrl: './import-data.component.html', //'./ngx-template.html',
  styleUrls: ['./import-data.component2.scss'],
  encapsulation: ViewEncapsulation.None
})


export class ModalContentComponent implements OnInit {
/*

  title: string;
  closeBtnName: string;
  fileName: any;
  fileContent: any = '';
  header = [];
  start: any;
  end: any;
  data_count: any;
  number_columns;
  readFirstRow: any;
  fileCsvRead = [];

  onChange(event) {
    this.fileName = '';
    this.fileContent = '';
    this.header = [];
    this.start = '';
    this.end = '';
    this.data_count = '';
    this.number_columns = '';
    this.readFirstRow = '';
    this.fileCsvRead = [];
    const reader = new FileReader();
    this.fileName = event.target.files[0].name;
    reader.readAsText(event.target.files[0]);
    const me = this;
    reader.onload = function () {
      me.fileContent = '';
      me.fileContent = reader.result;
      me.fileCsvRead = me.fileContent.split('\n');
      me.fileContent = d3.csvParse(me.fileContent);
      me.readFirstRow = me.fileCsvRead[1].split(',');
      for (let i = 0; i < me.fileCsvRead[0].split(',').length; i++) {
        let check = false;
        check = !(me.readFirstRow[i] === null || me.readFirstRow[i] === undefined
          || me.readFirstRow[i] === '' || me.readFirstRow[i] === ' ');
        me.header.push({
          id: i,
          checked: check,
          name: me.fileCsvRead[0].split(',')[i]
        });
      }
      me.start = me.fileCsvRead[1].split(',')[1];
      if (me.fileCsvRead[me.fileCsvRead.length - 1] === '' ||
        me.fileCsvRead[me.fileCsvRead.length - 1] === undefined
        || me.fileCsvRead[me.fileCsvRead.length - 1] === null) {
        me.end = me.fileCsvRead[me.fileCsvRead.length - 2].split(',')[1];
      } else {
        me.end = me.fileCsvRead[me.fileCsvRead.length - 1].split(',')[1];
      }
      me.data_count = me.fileContent.length;
      me.number_columns = me.header.length;
    };
  }

  submitCheckBox(formData) {
    const formDataVariable = [];
    const dataArrayColumns = [];
    const selectedHeader = [];
    for (let i = 0; i < this.header.length; i++) {
      if (formData[i]) {
        formDataVariable.push(i);
      }
    }
    for (let z = 0; z < formDataVariable.length; z++) {
      const temp = [];
      for (let i = 1; i < this.fileCsvRead.length; i++) {
        const initialSplit = this.fileCsvRead[i].split(',');
        for (let j = 0; j < initialSplit.length; j++) {
          if (j === formDataVariable[z]) {
            temp.push(initialSplit[j]);
          }
        }
      }
      dataArrayColumns.push(temp);
    }
    for (let i = 0; i < this.header.length; i ++) {
      if (this.header[i].checked) {
        selectedHeader.push({
          headerName: this.header[i].name,
          field: this.header[i].name,
          editable: true
        });
      }

    }
    this.indexFileStore.addIntoDB(this.fileName, this.fileContent, dataArrayColumns,
      this.header, selectedHeader, this.fileContent.columns, this.start, this.end, '', this.data_count, this.number_columns, '');
    /!*   setTimeout( () => {
         this.dialog.close();
         console.log('Send Data');
       }, 2000);*!/

  }

  columnNameChange(event) {
    console.log(event);
  }

  // important allows modal to be closed
  constructor( private indexFileStore: IndexFileStoreService, public bsModalRef: BsModalRef) {}

*/

  ngOnInit() {}
}
