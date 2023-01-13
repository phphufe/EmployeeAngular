import { Component } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { DataService } from '../../services/data.service';
import { Employee } from '../../models/employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
})
export class EmployeeEditComponent {
  employee!: Employee;
  btnDisablied = false;
  id: string;

  url = 'http://localhost:3030/v1/api/accounts';
  constructor(
    private rest: RestApiService,
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.rest
      .getOne(this.url, this.id)
      .then((data) => {
        this.employee = (data as { employee: Employee }).employee;
      })
      .catch((error) => {
        this.data.error(error['messsage']);
        this.btnDisablied = false;
      });
  }

  validate() {
    return true;
  }

  update() {
    console.log(this.employee);
    this.btnDisablied = true;
    if (this.validate()) {
      this.rest
        .put(this.url, this.id, this.employee)
        .then((data) => {
          console.log(data);
          this.data.success('Employee is updated');
          this.btnDisablied = false;
          this.router.navigate(['/employee-list']);
        })
        .catch((error) => {
          this.data.error(error['messsage']);
          this.btnDisablied = false;
        });
    }
  }
}
