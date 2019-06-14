import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotScatterPlotComponent } from './plot-scatter-plot.component';

describe('PlotScatterPlotComponent', () => {
  let component: PlotScatterPlotComponent;
  let fixture: ComponentFixture<PlotScatterPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotScatterPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotScatterPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
