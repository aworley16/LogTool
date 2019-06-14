import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatSlideToggleModule,
  MatCardModule,
  MatButtonToggleModule, MatTabsModule
} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PlotLineGraphComponent } from './components/plot-line-graph/plot-line-graph.component';
import { PlotScatterPlotComponent } from './components/plot-scatter-plot/plot-scatter-plot.component';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { AgGridModule } from 'ag-grid-angular';
import { PlotlyModule } from 'angular-plotly.js';
import {ExportCsvService} from './export-csv.service';
import {DataService} from './data.service';
import { ToolHeaderComponent } from './components/tool-header/tool-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImportDataComponent, ModalContentComponent } from './components/import-data/import-data.component';
import { HotTableModule } from '@handsontable/angular';
import { TableDataComponent } from './components/table-data/table-data.component';
import { NgZorroAntdModule, NZ_ICONS } from 'ng-zorro-antd';
import {DemoModalServiceFromComponent} from './demo-modal-service-from/demo-modal-service-from.component';
import { DemoModalServiceStaticComponent } from './demo-modal-service-static/demo-modal-service-static.component';
import {BsModalService, ModalModule} from 'ngx-bootstrap';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    PlotLineGraphComponent,
    PlotScatterPlotComponent,
    ToolHeaderComponent,
    ImportDataComponent,
    TableDataComponent,
    DemoModalServiceStaticComponent,
    DemoModalServiceFromComponent,
    DemoModalServiceFromComponent,
    ModalContentComponent
  ],
  entryComponents: [ImportDataComponent, ImportDataComponent, DemoModalServiceFromComponent, ModalContentComponent],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    HotTableModule.forRoot(),
    NgZorroAntdModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    PlotlyModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatButtonToggleModule,
    AgGridModule.withComponents([]),
    MatTabsModule,
    ModalModule.forRoot(),

  ],
  providers: [ElectronService, ExportCsvService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
