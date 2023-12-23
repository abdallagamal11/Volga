import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'vg-carousel',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent implements AfterViewInit, AfterViewChecked, OnDestroy
{
	@Input('items') carouselItems: ElementRef[] | undefined;
	numVisible = 3;
	numScroll = 3;
	@ViewChild('carouselWrapper') carouselWrapper!: ElementRef;
	@ViewChild('carouselMainLine') carouselMainLine!: ElementRef;
	tranlateXValue: number = 0;
	private itemWidth = 0;
	index: number = 0;
	numPages: number = 0;
	loop: boolean = true;
	loaded: boolean = false;
	gap: number = 10;
	imagesLoaded: number = 0;
	responsiveOptions: { [k: number]: { [k: string]: number } } | undefined;
	images: HTMLImageElement[] | undefined;
	@Input() rtl: boolean = false;

	constructor(private el: ElementRef)
	{
		this.responsiveOptions = {
			400: {
				numVisible: 1,
				numScroll: 1
			},
			500: {
				numVisible: 2,
				numScroll: 2
			},
			600: {
				numVisible: 3,
				numScroll: 3
			},
			800: {
				numVisible: 4,
				numScroll: 4
			},
		}
		window.addEventListener('load', e => this.onLoad(e));
	}

	onLoad(e: Event)
	{
		e.stopPropagation();

		this.images = this.el.nativeElement.querySelectorAll('img');
		this.images?.forEach(e => e.addEventListener('load', this.handleImageLoad));

		this.updateResponsive();
		this.updateUi();
		this.calculatePosition();
	}

	ngAfterViewInit()
	{
		this.updateUi();
		this.calculatePosition();
	}

	ngAfterViewChecked()
	{
		this.updateUi();
		this.calculatePosition();
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

		this.loaded = true;
		this.calculatePosition();
	}

	handleImageLoad(elm: Event)
	{
		this.imagesLoaded++;
		elm.target?.removeEventListener('load', this.handleImageLoad)
		if (this.imagesLoaded == this.images?.length)
		{
			this.calculatePosition();
			this.images = undefined;
		}
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
		this.resizeAction = setTimeout(() => this.updateResize(), 200);

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
				})
		}
	}

	updateResize()
	{
		this.updateResponsive();
		if (this.index > this.numPages - 1) this.index = this.numPages;
		this.updateUi(false);
		this.calculatePosition(false);
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
		images.forEach((e) => e.removeEventListener('load', this.handleImageLoad));
	}
}