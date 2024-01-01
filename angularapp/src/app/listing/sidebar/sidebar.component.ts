import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CategoryModel } from 'src/app/core/models/category-model';
import { ProductListingFiltersModel } from 'src/app/core/models/product-listing-filters';
import { IForm } from 'src/app/core/types/vg-form-group';
import { NumberUtility } from 'src/app/core/utilities/number.utility';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnChanges
{
	@Input() category: CategoryModel | undefined;
	@Input() sellers: [string, string][] | undefined;
	filtersForm!: FormGroup;
	@Input() filters: IForm<ProductListingFiltersModel> | undefined = undefined;
	@Output() filterApplyEvent = new EventEmitter<object>();
	sellersFormArr!: FormArray;

	constructor(private formBuilder: FormBuilder)
	{
		this.setFiltersFormData();
	}

	ngOnChanges(changes: SimpleChanges): void
	{
		if (changes['filters'] != undefined && changes['filters'].previousValue != changes['filters'].currentValue)
		{
			this.filters = Object.assign({}, changes['filters'].currentValue);
			this.setFiltersFormData();
		}
	}

	setFiltersFormData()
	{
		if (!this.filters) return;
		this.filtersForm = this.formBuilder.group({
			discount: this.formBuilder.group(this.filters.discount),
			rating: this.formBuilder.group(this.filters.rating),
			//seller: this.formBuilder.group(this.filters.seller),
			stock: this.formBuilder.group(this.filters.stock),
		});

		Object.entries(this.filtersForm.controls).forEach(element =>
		{
			element[1].valueChanges
				.pipe(debounceTime(400))
				.subscribe((data) =>
				{
					let key = element[0];
					let filterObject = { [key]: data };

					this.applyGroup(filterObject);
				});
		});

		this.sellersFormArr = this.formBuilder.array([]);
		this.filtersForm.addControl('seller', this.formBuilder.group({ sellers: this.sellersFormArr }));

		this.filtersForm.addControl('price', this.formBuilder.group(this.filters.price));
	}

	applyGroup(group: object)
	{
		this.filterApplyEvent.emit(group);
	}
	applyGroupByGroupName(groupName: string)
	{
		if (!groupName) return;
		let formGroup: FormGroup = this.filtersForm?.get(groupName) as FormGroup;

		let filterObject = { [groupName]: formGroup.value };

		this.applyGroup(filterObject);
	}

	preventNegativeFloat(e: Event)
	{
		NumberUtility.preventNegativeFloatOnInput(e);
	}

	onSellerCheckChanged(e: Event)
	{
		let elm = e.target as HTMLInputElement;

		if (!this.sellersFormArr) return;
		if (elm.checked)
		{
			this.sellersFormArr.push(this.formBuilder.control(elm.value));
		}
		else
		{
			for (let i = 0; i < this.sellersFormArr.controls.length; i++)
			{
				const ctrl = this.sellersFormArr.controls[i];
				if (ctrl.value == elm.value)
				{
					this.sellersFormArr.removeAt(i);
					return;
				}
			}
		}
	}

	createRange(value: number): number[]
	{
		return new Array(value).fill(0).map((n, index) => index + 1);
	}

	getSellerFormControl(sellerId: string): AbstractControl | null
	{
		return this.sellersFormArr?.controls.find((control) => control.value === sellerId) || null;
	}
}
