import { Component } from '@angular/core';
import { Header } from '../../../libs/components/Header/header';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
@Component({
  selector: 'app-dashboardTest',
  imports: [Header, ButtonModule, CardModule, NzProgressModule, NzTooltipModule],
  templateUrl: './dashboardTest.html',
  styleUrl: './dashboardTest.css'
})
export class DashboardTest {

}
