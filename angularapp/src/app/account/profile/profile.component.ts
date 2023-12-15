import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent
{
	constructor(private authService: AuthService)
	{
		authService.getProfile().subscribe();
	}
}
