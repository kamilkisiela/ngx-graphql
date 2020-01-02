import { Component, OnInit } from "@angular/core";
import { GraphQL } from "ngx-graphql";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Post, Query } from "./types";

@Component({
  selector: "app-list",
  template: `
    <ul>
      <li *ngFor="let post of posts | async">
        {{ post.title }} by {{ post.author.firstName }}
        {{ post.author.lastName }} ({{ post.votes }} votes)
        <app-upvoter [postId]="post.id"></app-upvoter>
      </li>
    </ul>
  `
})
export class ListComponent implements OnInit {
  posts: Observable<Post[]>;
  constructor(private graphql: GraphQL) {}

  ngOnInit() {
    this.posts = this.graphql
      .request<Query>(
        /* GraphQL */ `
          query allPosts {
            posts {
              id
              title
              votes
              author {
                id
                firstName
                lastName
              }
            }
          }
        `
      )
      .pipe(map(result => result.data!.posts));
  }
}
