import { Component, OnInit } from '@angular/core';

import { postData } from './../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts = null;

  constructor() {
    this.posts = postData;
  }

  ngOnInit(): void {}
}
