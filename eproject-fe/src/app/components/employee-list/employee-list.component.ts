import { Component } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { RestApiService } from '../../services/rest-api.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent {
  employees!: Employee[];
  btnDisablied = false;

  url = 'http://localhost:3030/v1/api/accounts';
  constructor(private rest: RestApiService, private data: DataService) {}

  ngOnInit(): void {
    this.btnDisablied = true;
    this.rest
      .get(this.url)
      .then((data) => {
        console.log(data);
        this.employees = (data as { employees: Employee[] }).employees;
        this.btnDisablied = false;
      })
      .catch((error) => {
        this.data.error(error['messsage']);
        this.btnDisablied = false;
      });
  }

  delete(id: string) {
    this.rest
      .delete(this.url, id)
      .then((data) => {
        this.data.success((data as { message: string }).message);
        this.btnDisablied = false;
        this.ngOnInit();
      })
      .catch((error) => {
        this.data.error(error['message']);
        this.btnDisablied = false;
      });
  }
}
