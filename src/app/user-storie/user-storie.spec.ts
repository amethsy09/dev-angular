import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStorie } from './user-storie';

describe('UserStorie', () => {
  let component: UserStorie;
  let fixture: ComponentFixture<UserStorie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserStorie],
    }).compileComponents();

    fixture = TestBed.createComponent(UserStorie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
