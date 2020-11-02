import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAnnonceHomeComponent } from './my-annonce-home.component';

describe('MyAnnonceHomeComponent', () => {
  let component: MyAnnonceHomeComponent;
  let fixture: ComponentFixture<MyAnnonceHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAnnonceHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAnnonceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
