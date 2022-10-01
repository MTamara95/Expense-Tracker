import { Component, forwardRef, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true,
  }]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() options: any[];

  selectedOption: any;
  value: number;

  onChange: (_: any) => {};

  constructor() { }
  ngOnInit(): void {
    this.selectedOption = this.options[0];
  }

  writeValue(value: any): void {
    this.selectedOption = value;
    this.value = value.id;
  }

  registerOnChange(fn: (_: any) => {}) {
    this.onChange = fn;
  }

  changeSelectedOption(option: any) {
    this.selectedOption = option;
    this.onChange(option.id);
  }

  registerOnTouched(fn: any): void {
  }

}
