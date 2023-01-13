import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { DataService } from '../../services/data.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
})
export class EmployeeAddComponent implements OnInit {
  employee: Employee;
  btnDisablied = false;

  url = 'http://localhost:3030/v1/api/accounts';
  constructor(private rest: RestApiService, private data: DataService) {
    this.employee = new Employee();
  }

  ngOnInit(): void {}

  validate() {
    return true;
  }

  save() {
    console.log(this.employee);
    this.btnDisablied = true;
    if (this.validate()) {
      this.rest
        .post(this.url, this.employee)
        .then((data) => {
          console.log(data);
          this.data.success('Employee is saved');
          this.btnDisablied = false;
        })
        .catch((error) => {
          this.data.error(error['messsage']);
          this.btnDisablied = false;
        });
    }
  }
}
