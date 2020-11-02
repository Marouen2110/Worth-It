import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAnnonceListComponent } from './my-annonce-list.component';

describe('MyAnnonceListComponent', () => {
  let component: MyAnnonceListComponent;
  let fixture: ComponentFixture<MyAnnonceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAnnonceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAnnonceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
