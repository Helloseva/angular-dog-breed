import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogBreedsComponent } from './dog-breeds.component';

describe('DogBreedsComponent', () => {
  let component: DogBreedsComponent;
  let fixture: ComponentFixture<DogBreedsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DogBreedsComponent]
    });
    fixture = TestBed.createComponent(DogBreedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
