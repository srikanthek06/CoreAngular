import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;

  formErrors = {
    'fullName': '',
    'email': ''
  }

  validationMessages = {
    'fullName': {
      'required': 'Full Name is required',
      'minlength': 'Full Name must be greater than 2 characters',
      'maxlength': 'Full Name must be less than 10 characters'
    },
    'email': {
      'required': 'Email Address is required'
    }
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: ['', Validators.required]
    })

    this.employeeForm.valueChanges.subscribe(data => {
      this.loadValidationErrors(this.employeeForm);
    })
  }

  loadValidationErrors(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.loadValidationErrors(abstractControl);
      }
      else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid) {
          const messages = this.validationMessages[key];
          //console.log(messages);
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              //console.log(messages[errorKey]);
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    })
  }




  onLoadDataClick(): void {
    this.loadValidationErrors(this.employeeForm);
    console.log(this.formErrors);
  }

}
