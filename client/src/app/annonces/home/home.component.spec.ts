import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceHomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: AnnonceHomeComponent;
  let fixture: ComponentFixture<AnnonceHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnnonceHomeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
