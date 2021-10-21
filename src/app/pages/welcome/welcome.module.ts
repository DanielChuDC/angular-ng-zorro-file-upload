import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import {DemoNgZorroAntdModule} from '../../antd/antd.module'

@NgModule({
  imports: [WelcomeRoutingModule,DemoNgZorroAntdModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
