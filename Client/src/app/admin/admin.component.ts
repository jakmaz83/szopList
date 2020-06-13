import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  title = '';
  shortContent = '';
  longContent = '';

  constructor() {}

  ngOnInit(): void {}

  handleSave() {
    console.warn({
      title: this.title,
      shortContent: this.shortContent,
      longContent: this.longContent,
    });
  }
}
