import { Component, Input } from "@angular/core";
import { GraphQL } from "ngx-graphql";

@Component({
  selector: "app-upvoter",
  template: `
    <button (click)="upvote()">
      Upvote
    </button>
  `
})
export class UpvoterComponent {
  @Input() postId: number;

  constructor(private graphql: GraphQL) {}

  upvote() {
    this.graphql
      .request(
        /* GraphQL */ `
          mutation upvotePost($postId: Int!) {
            upvotePost(postId: $postId) {
              id
              votes
            }
          }
        `,
        {
          postId: this.postId
        }
      )
      .subscribe();
  }
}
