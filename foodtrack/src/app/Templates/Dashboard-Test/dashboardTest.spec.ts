import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTest } from './dashboardTest';

describe('DashboardTest', () => {
  let component: DashboardTest;
  let fixture: ComponentFixture<DashboardTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
