import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresApiIdealoComponent } from './offres-api-idealo.component';

describe('OffresApiIdealoComponent', () => {
  let component: OffresApiIdealoComponent;
  let fixture: ComponentFixture<OffresApiIdealoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffresApiIdealoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffresApiIdealoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
