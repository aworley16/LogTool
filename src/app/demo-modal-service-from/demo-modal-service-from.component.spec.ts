import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoModalServiceFromComponent } from './demo-modal-service-from.component';

describe('DemoModalServiceFromComponent', () => {
  let component: DemoModalServiceFromComponent;
  let fixture: ComponentFixture<DemoModalServiceFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoModalServiceFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoModalServiceFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
