import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceShowComponent } from './annonce-show.component';

describe('AnnonceShowComponent', () => {
  let component: AnnonceShowComponent;
  let fixture: ComponentFixture<AnnonceShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnonceShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
