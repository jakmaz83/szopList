import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: 'post/:id',
    component: PostComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostComponent,
    AdminComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
