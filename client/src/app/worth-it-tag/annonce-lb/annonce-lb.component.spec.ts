import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceLBComponent } from './annonce-lb.component';

describe('AnnonceLBComponent', () => {
  let component: AnnonceLBComponent;
  let fixture: ComponentFixture<AnnonceLBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnonceLBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceLBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
