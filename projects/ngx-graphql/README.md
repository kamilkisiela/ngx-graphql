# NGX-GraphQL

Tiny GraphQL client for Angular

## Usage

First, install:

    yarn add ngx-graphql

Then, configure:

```typescript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { configureGraphQL } from "ngx-graphql"; // <-- Import configureGraphQL

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule // <-- REQUIRED
  ],
  providers: [
    configureGraphQL({
      url: "https://your-graphql.api" // <-- configure GraphQL
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Finally, use it:

```typescript
import { Component, OnInit } from "@angular/core";
import { GraphQL } from "ngx-graphql"; // <-- import `GraphQL` service
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-list",
  template: `
    <ul>
      <li *ngFor="let post of posts | async">
        {{ post.title }}
      </li>
    </ul>
  `
})
export class ListComponent implements OnInit {
  posts: Observable<Post[]>;

  constructor(private graphql: GraphQL) {} // <-- include it in a component

  ngOnInit() {
    this.posts = this.graphql
      .request( // <-- pass a query
        `
          query allPosts {
            posts {
              id
              title
            }
          }
        `
      )
      .pipe(map(result => result.data.posts));
  }
}
```
