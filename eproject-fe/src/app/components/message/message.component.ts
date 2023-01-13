import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  data1!: DataService;
  constructor(public data: DataService) {
    console.log({ data: data });
  }

  ngOnInit(): void {}
}
