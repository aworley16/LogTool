import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ImportDataComponent } from '../import-data/import-data.component';
import {IndexFileStoreService} from '../../index-file-store.service';
import {RouteDataTransferService} from '../../route-data-transfer.service';
import {DemoModalServiceStaticComponent} from '../../demo-modal-service-static/demo-modal-service-static.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  graph: any;
  tabs = [];
  sendingValue = 0;
  dataFromDialog: any = [];
  columnsXandY: any = [];
  timeSeriesY: any = [];
  show: any;
  ySelectorList: any = [];
  timeSeriesLineElement: any = [];
  temp: any;
  constructor(private router: Router,  private dialog: MatDialog, private indexFileStore: IndexFileStoreService, private routeDataTransfer: RouteDataTransferService) { }


  ngOnInit() {
    this.dataFromDialog = [];
    this.columnsXandY = [];
    this.timeSeriesY = [];
    this.indexFileStore.viewDataDB().then(result => {
      this.dataFromDialog = result;
      if (this.dataFromDialog === null || this.dataFromDialog === undefined) {
      } else {
        this.tabs = [];
        for (let i = 0; i < this.dataFromDialog.length; i++) {
          this.tabs.push( {
            name: this.dataFromDialog[i].name,
            id: i
          });
        }
        for (let i = 0; i < this.tabs.length; i++) {
          const filename = this.tabs[i].name;
          for (let j = 0; j < this.dataFromDialog[i].selectedHeader.length; j++) {
            const columnName = this.dataFromDialog[i].selectedHeader[j].headerName;
            if (!isNaN(this.dataFromDialog[i].dataArrayColumns[j][0]) && !Date.parse(this.dataFromDialog[i].dataArrayColumns[j][0])) {
              this.columnsXandY.push({
                name: filename + '-' + columnName,
                identifier: `${i}, ${j}`
              });
            }

            if (isNaN(this.dataFromDialog[i].dataArrayColumns[j][0]) && Date.parse(this.dataFromDialog[i].dataArrayColumns[j][0])) {
                    this.timeSeriesY.push({
                      name:filename + '-' + columnName,
                      identifier: `${i}, ${j}`
                    })
            }
          }
        }

        this.sendingValue = 0;
        this.router.navigateByUrl('/table-data', {skipLocationChange: true}).then(() => {
          this.sendingValue = this.dataFromDialog.length - 1;
          this.router.navigate(['/table-data'], {queryParams: {
              value: this.sendingValue
            }});
        });
      }
    }, error => {
      console.log(error);
    });
  }
  onImport() {
    this.dataFromDialog = [];
    this.columnsXandY = [];
    this.timeSeriesY = [];
      const dialogRef =  this.dialog.open(ImportDataComponent);
      dialogRef.afterClosed().subscribe( () => {
        this.indexFileStore.viewDataDB().then(result => {
          this.dataFromDialog = result;
          this.tabs = [];
          for (let i = 0; i < this.dataFromDialog.length; i++) {
            this.tabs.push({
              name: this.dataFromDialog[i].name,
              id: i
            });
          }
          for (let i = 0; i < this.tabs.length; i++) {
            const filename = this.tabs[i].name;
            for (let j = 0; j < this.dataFromDialog[i].selectedHeader.length; j++) {
              const columnName = this.dataFromDialog[i].selectedHeader[j].headerName;
              if (!isNaN(this.dataFromDialog[i].dataArrayColumns[j][0]) && !Date.parse(this.dataFromDialog[i].dataArrayColumns[j][0])) {
                this.columnsXandY.push({
                  name: filename + '-' + columnName,
                  identifier: `${i}, ${j}`
                });
              }

              if (isNaN(this.dataFromDialog[i].dataArrayColumns[j][0]) && Date.parse(this.dataFromDialog[i].dataArrayColumns[j][0])) {
                this.timeSeriesY.push({
                  name:filename + '-' + columnName,
                  identifier: `${i}, ${j}`
                })
              }
            }
          }
          this.sendingValue = this.dataFromDialog.length - 1;
          this.router.navigateByUrl('/table-data', {skipLocationChange: true}).then(() => {
            this.sendingValue = this.dataFromDialog.length - 1;
            this.router.navigate(['/table-data'], {queryParams: {
                value: this.sendingValue
              }});
          });

        });
      });
  }
  navigation(formData) {
      if (formData.graph === '' || formData.graph === undefined) {
        alert('Please select Graph type');
      } else if (formData.graph === 'line_graph') {
        this.routeDataTransfer.storage = {
          value: this.ySelectorList,
          timeSeries: this.timeSeriesLineElement
        };
        this.router.navigate(['/line-graph']);
      } else if (formData.graph === 'scatter_graph') {
        this.routeDataTransfer.storage = {
          value: this.ySelectorList,
          timeSeries: this.timeSeriesLineElement
        };
        this.router.navigate(['/scatter-graph']);
      }
  }
  changeDisplayTable(value) {
    this.router.navigateByUrl('/table-data', {skipLocationChange: true}).then(() => {
      this.sendingValue = value;
      this.router.navigate(['/table-data'], {queryParams: {
          value: this.sendingValue
        }});
    });
  }

  checkboxSelect(event) {
    if (event.target.value === 'line_graph') {
      this.show = true;
    }
    else if (event.target.value === 'scatter_graph') {
      this.show = false;
    }
  }

  ySelector(event) {
    this.ySelectorList.push({
      name: this.columnsXandY[event.target.options.selectedIndex].name,
      value: event.target.value
    });
  }

  removeFromListLine(event) {
    for (let i = 0; i<this.ySelectorList.length; i++) {
      if(this.ySelectorList[i].name === event.target.innerText) {
        if (i === 0) {
          this.ySelectorList.shift();
          break;
        } else if(this.ySelectorList.length === 1) {
          this.ySelectorList.pop();
          break;
        } else {
          this.ySelectorList.splice(1, i);
          break;
        }
      }
    }
  }

  timeSeriesLineY(event) {
    this.timeSeriesLineElement.pop();
        this.timeSeriesLineElement.push({
          value: event.target.value,
          name: this.timeSeriesY[event.target.options.selectedIndex].name
        });
  }
}


