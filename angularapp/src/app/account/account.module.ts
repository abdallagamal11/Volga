import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from '../account/login/login.component';
import { CoreModule } from '../core/core.module';
import { AnonymousOnlyGuardService } from '../core/services/anonymous-only-guard.service';
import { AuthguardService } from '../core/services/authguard.service';
import { AlreadyLoggedinComponent } from './already-loggedin/already-loggedin.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [AnonymousOnlyGuardService] },
	{ path: 'logout', component: LogoutComponent, canActivate: [AuthguardService] },
	{ path: 'register', component: RegisterComponent, canActivate: [AnonymousOnlyGuardService] },
	{ path: 'alreadyloggedin', component: AlreadyLoggedinComponent },
	{ path: 'profile', component: ProfileComponent, canActivate: [AuthguardService] },
];

@NgModule({
	declarations: [LoginComponent, AlreadyLoggedinComponent, LogoutComponent, RegisterComponent, ProfileComponent, ResetpasswordComponent],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		HttpClientModule,
		ReactiveFormsModule,
		CoreModule,
		TranslateModule,
	]
})
export class AccountModule { }
