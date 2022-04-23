import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent {
  @Output() submitValue = new EventEmitter<number>();
  public errorInput: boolean = false;

  constructor() { }

  public sendValue(userInches :string) {
    this.errorInput = false;
    if(Number(userInches) === parseFloat(userInches)) {
      // Send user value to parent
      this.submitValue.emit(Number(userInches));
    }
    else {
      // Send -1 to parent than represents an invalid input
      this.submitValue.emit(-1);
      this.errorInput = true;
    }
  }
}
