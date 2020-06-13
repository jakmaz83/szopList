import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  title = '';
  shortContent = '';
  longContent = '';

  constructor(private location: Location) {}

  ngOnInit(): void {}

  handleSave() {
    console.warn({
      title: this.title,
      shortContent: this.shortContent,
      longContent: this.longContent,
    });
  }
  goBack(): void {
    this.location.back();
  }
}
