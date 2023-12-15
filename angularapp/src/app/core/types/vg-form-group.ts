import { FormControl, FormGroup } from "@angular/forms";


export type VgFormControls<T> = { [K in keyof T]: FormControl<T[K]> };
export type VgFormGroup<T> = FormGroup<VgFormControls<T>>;