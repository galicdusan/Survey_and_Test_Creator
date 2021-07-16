import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IspitanikComponent } from './ispitanik.component';

describe('IspitanikComponent', () => {
  let component: IspitanikComponent;
  let fixture: ComponentFixture<IspitanikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IspitanikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IspitanikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
