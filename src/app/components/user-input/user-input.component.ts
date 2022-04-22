import { Component, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent {
  @Output() submitValue = new EventEmitter<number>();
  public errorInput: boolean = false;

  constructor(private _translateService: TranslateService) { }

  public sendValue(userInches :string) {
    this.errorInput = false;
    if(Number(userInches) === parseFloat(userInches)) {
      this.submitValue.emit(Number(userInches));
    }
    else {
      this.submitValue.emit(-1);
      this.errorInput = true;
    }
  }
}
