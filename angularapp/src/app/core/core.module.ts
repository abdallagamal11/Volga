import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AutofillMonitorDirective } from './directives/autofill-monitor.directive';

@NgModule({
	declarations: [
		AutofillMonitorDirective
	],
	imports: [CommonModule],
	exports: [
		AutofillMonitorDirective
	],
	providers: [
		AuthService
	]
})
export class CoreModule { }
