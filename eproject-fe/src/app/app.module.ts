import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './components/message/message.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from './services/rest-api.service';
import { DataService } from './services/data.service';
import { HomeComponent } from './components/home/home.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';

@NgModule({
  declarations: [AppComponent, MessageComponent, EmployeeAddComponent, HomeComponent, EmployeeListComponent, EmployeeEditComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [RestApiService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
