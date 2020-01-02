import { TestBed } from "@angular/core/testing";

import { GraphQL } from "./graphql.service";

describe("GraphQL", () => {
  let service: GraphQL;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphQL);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
