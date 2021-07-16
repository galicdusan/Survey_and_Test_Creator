import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IzradaComponent } from './izrada.component';

describe('IzradaComponent', () => {
  let component: IzradaComponent;
  let fixture: ComponentFixture<IzradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IzradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IzradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
