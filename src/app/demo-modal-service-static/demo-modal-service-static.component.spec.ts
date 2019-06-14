import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoModalServiceStaticComponent } from './demo-modal-service-static.component';

describe('DemoModalServiceStaticComponent', () => {
  let component: DemoModalServiceStaticComponent;
  let fixture: ComponentFixture<DemoModalServiceStaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoModalServiceStaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoModalServiceStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
