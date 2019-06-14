import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlotLineGraphComponent} from './components/plot-line-graph/plot-line-graph.component';
import {PlotScatterPlotComponent} from './components/plot-scatter-plot/plot-scatter-plot.component';
import {TableDataComponent} from './components/table-data/table-data.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: 'table-data',
            component: TableDataComponent,
          }
        ]
    },
    {
      path: 'line-graph',
      component: PlotLineGraphComponent
    },
    {
      path: 'scatter-graph',
      component: PlotScatterPlotComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
