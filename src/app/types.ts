export interface Author {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Post {
  id: number;
  title: string;
  votes: number;
  author: Author;
}

export interface Query {
  posts: Post[];
}

export interface Mutation {
  upvotePost: Post;
}
