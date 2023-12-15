import { Directive, ElementRef, HostListener, NgZone } from '@angular/core';

@Directive({
	selector: '[appAutofillMonitor]'
})
export class AutofillMonitorDirective
{
	constructor(private elementRef: ElementRef, private ngZone: NgZone) { }

	@HostListener('change', ['$event.target'])
	onChange(target: HTMLInputElement)
	{
		this.ngZone.run(() =>
		{
			if (this.elementRef.nativeElement.value !== target.value)
			{
				this.elementRef.nativeElement.value = target.value;
			}
		});
	}

}