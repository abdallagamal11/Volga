import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-error-not-found',
  templateUrl: './error-not-found.component.html',
  styleUrls: ['./error-not-found.component.css']
})
export class ErrorNotFoundComponent
{
  returnUrl: string | null = null;
  constructor(private route: ActivatedRoute, private router: Router)
  {
    this.route.queryParamMap.subscribe((params: ParamMap) => 
    {
      this.returnUrl = params.get('returnUrl');
    });
  }
  goBack(): void
  {
    if (this.returnUrl)
    {
      this.router.navigateByUrl(this.returnUrl);
    }
  }
}
