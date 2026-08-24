import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridaListComponent } from './corrida-list-component';

describe('CorridaListComponent', () => {
  let component: CorridaListComponent;
  let fixture: ComponentFixture<CorridaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorridaListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CorridaListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
