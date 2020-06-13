import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, postData } from './../post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  postId = null;

  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      this.postId = params.id;
    });
  }

  getPost(): Post {
    if (this.postId === null) {
      return null;
    } else {
      return postData.find((post) => post.id === this.postId);
    }
  }
}
