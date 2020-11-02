import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncesListItemComponent } from './annonces-list-item.component';

describe('AnnoncesListItemComponent', () => {
  let component: AnnoncesListItemComponent;
  let fixture: ComponentFixture<AnnoncesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnoncesListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnoncesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
