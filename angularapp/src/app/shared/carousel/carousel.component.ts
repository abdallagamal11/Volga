import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'vg-carousel',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent implements OnDestroy, AfterViewChecked //AfterViewInit
{
	carouselItems: ElementRef[] | undefined;
	@Input() numVisible = 3;
	@Input() numScroll = 3;
	@Input() gap: number = 10;
	@Input() responsiveOptions: { [k: number]: { [k: string]: number } } | undefined;
	@Input() rtl: boolean = false;
	@ViewChild('carouselWrapper') carouselWrapper!: ElementRef;
	@ViewChild('carouselMainLine') carouselMainLine!: ElementRef;
	private tranlateXValue: number = 0;
	private itemWidth = 0;
	protected index: number = 0;
	protected numPages: number = 0;
	loop: boolean = true;
	protected loaded: boolean = false;

	@Input() set items(value: ElementRef[] | undefined)
	{
		if (value === undefined) return;
		this.carouselItems = value;
		this.cdr.detectChanges();
	}

	constructor(private el: ElementRef, private cdr: ChangeDetectorRef)
	{
		this.cdr.detach();

		window.addEventListener('load', (e) => this.onLoad(e));
	}

	onLoad(e: Event)
	{
		e.stopPropagation();
		this.updateResponsive();
		this.updateUi();
		this.calculatePosition(false);
		this.cdr.detectChanges();
		this.loaded = true;
	}

	// ngAfterViewInit()
	// {
	// 	this.updateUi();
	// 	this.calculatePosition(false);
	// 	this.cdr.detectChanges();
	// 	setTimeout(() =>
	// 	{
	// 		this.adjustSize();
	// 	}, 250);
	// }

	ngAfterViewChecked()
	{
		this.updateUi();
		this.calculatePosition(false);
		this.cdr.detectChanges();
		setTimeout(() =>
		{
			this.adjustSize();
		}, 250);
	}

	adjustSize()
	{
		const container = this.carouselWrapper.nativeElement;
		const containerRect = container.getBoundingClientRect();
		const items = this.carouselItems;

		items?.forEach((e: any) =>
		{
			const item = e.nativeElement;
			const itemRect = item.getBoundingClientRect();

			// Check if the item is fully or partially visible
			if (
				itemRect.top >= containerRect.top &&
				itemRect.bottom <= containerRect.bottom &&
				itemRect.left >= containerRect.left &&
				itemRect.right <= containerRect.right
			)
			{
				// console.log(`Item ${item.innerText} is currently visible`);
				// Add your logic for visible items here
				if (containerRect.height < itemRect.height)
				{
					container.style.height = itemRect.height + 'px';
				}
			}
		});
	}

	updateUi(checkLoad: boolean = true)
	{
		if (checkLoad && (this.carouselItems === undefined || this.carouselItems.length == 0 || this.loaded)) return;

		this.updateResponsive();
		this.carouselMainLine.nativeElement.style.gap = this.gap + 'px';

		this.carouselItems?.forEach(elm =>
		{
			const e = elm as ElementRef;
			e.nativeElement.classList.add('vg-carousel-item');
			const parentWidth: number = this.carouselWrapper.nativeElement.getBoundingClientRect().width;

			e.nativeElement.style.width = (parentWidth / this.numVisible).toFixed(2) + 'px';
		});
		this.numPages = Math.ceil((this.carouselItems!.length - this.numVisible) / this.numScroll + 1);

		this.calculatePosition();
	}

	calculatePosition(checkLoad: boolean = true)
	{
		if (checkLoad && !this.loaded) return;

		// set carousel height
		let mainLineHeight: number = this.carouselMainLine.nativeElement.getBoundingClientRect().height;
		mainLineHeight = this.carouselMainLine.nativeElement.clientHeight;

		this.carouselWrapper.nativeElement.style.height = mainLineHeight + 'px';

		// set carousel full width
		this.itemWidth = parseFloat((100 / this.numVisible).toFixed(2)) / 100 *
			this.carouselWrapper.nativeElement.getBoundingClientRect().width;
		this.carouselMainLine.nativeElement.style.width = this.itemWidth * this.carouselItems!.length + 'px';


		if (this.rtl)
		{
			if (this.index == 0)
				this.tranlateXValue = (- this.itemWidth * this.carouselItems!.length) + this.itemWidth * this.numScroll * (this.index + 1);
			if (this.index == this.numPages)
			{
				// const totalItems = this.carouselItems!.length;
				// const itemsPerPage = this.numVisible * this.numScroll;
				// const lastPageItems = totalItems % itemsPerPage || itemsPerPage;

				this.tranlateXValue = 0;//(- this.itemWidth * this.carouselItems!.length) + this.itemWidth * this.numScroll * (this.index + 1);
			}
			this.carouselMainLine.nativeElement.style.transform = `translate3d(${this.tranlateXValue}px, 0, 0)`;
		}

	}

	private resizeAction: any;
	@HostListener('window:resize', ['$event']) onResize(event: Event)
	{
		clearTimeout(this.resizeAction);
		const self = this;
		this.resizeAction = setTimeout(() => { self.updateResize(); }, 200);

	}

	updateResponsive()
	{
		if (this.responsiveOptions)
		{
			const carouselWidth = this.carouselWrapper.nativeElement.getBoundingClientRect().width;

			Object.entries(this.responsiveOptions)
				.sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
				.forEach((obj) =>
				{
					const width = parseInt(obj[0]);
					if (carouselWidth > width)
					{
						if (obj[1]['numVisible']) this.numVisible = obj[1]['numVisible'];
						if (obj[1]['numScroll']) this.numScroll = obj[1]['numScroll'];
					}
				});
		}
	}

	updateResize()
	{
		if (this.index > this.numPages - 1) this.index = 0;
		this.updateResponsive();
		this.updateUi(false);
		this.calculatePosition(false);
		if (this.index > this.numPages - 1) this.index = 0;

		this.tranlateXValue = -1 * this.itemWidth * this.numScroll * this.index;

		if (this.rtl)
		//	this.tranlateXValue = (-this.itemWidth * this.carouselItems!.length) + this.itemWidth * this.numScroll * (this.index + 1);
		{
			if (this.index + 1 > this.numPages - 1)
			{
				// If we are at the last page, transition back to the first page
				this.index = this.loop ? 0 : this.index;
			}

			// Calculate the new tranlateXValue for RTL
			this.tranlateXValue = (-this.itemWidth * this.carouselItems!.length) + this.itemWidth * this.numScroll * (this.index + 1);

			// Update the styles
			this.carouselMainLine.nativeElement.style.transform = `translate3d(${this.tranlateXValue}px, 0, 0)`;

		}

		this.carouselMainLine.nativeElement.style.transform = `translate3d(${this.tranlateXValue}px, 0, 0)`;
		this.cdr.detectChanges();
	}

	nextPage(): void
	{
		if (this.index + 1 > this.numPages - 1) this.index = this.loop ? 0 : this.index;
		else this.index = this.index + 1;
		this.tranlateXValue = -1 * this.itemWidth * this.numScroll * this.index;

		// if (this.rtl) this.tranlateXValue *= -1;
		if (this.rtl)
			this.tranlateXValue = (- this.itemWidth * this.carouselItems!.length) + this.itemWidth * this.numScroll * (this.index + 1);

		this.carouselMainLine.nativeElement.style.transform = `translate3d(${this.tranlateXValue}px, 0, 0)`;
	}

	prevPage(): void
	{
		if (this.index == 0) this.index = this.loop ? this.numPages - 1 : this.index;
		else this.index = this.index - 1;

		this.tranlateXValue = -1 * this.itemWidth * this.numScroll * this.index;

		if (this.rtl)
			this.tranlateXValue = (- this.itemWidth * this.carouselItems!.length) + this.itemWidth * this.numScroll * (this.index + 1);

		this.carouselMainLine.nativeElement.style.transform = `translate3d(${this.tranlateXValue}px, 0, 0)`;
	}

	ngOnDestroy()
	{
		clearTimeout(this.resizeAction);
		const images: HTMLImageElement[] = this.el.nativeElement.querySelectorAll('img');

	}
}