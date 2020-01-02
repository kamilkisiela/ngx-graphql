import {
  Injectable,
  Inject,
  InjectionToken,
  ValueProvider
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ExecutionResult } from "graphql";
import { Observable } from "rxjs";

export const GRAPHQL_OPTIONS = new InjectionToken<GraphQLOptions>(
  "[ngx-graphql] options"
);

export interface GraphQLOptions {
  url: string;
  withCredentials?: boolean;
}

export function configureGraphQL(options: GraphQLOptions): ValueProvider {
  return {
    provide: GRAPHQL_OPTIONS,
    useValue: options
  };
}

@Injectable({
  providedIn: "root"
})
export class GraphQL {
  private options: Required<GraphQLOptions>;

  constructor(
    private http: HttpClient,
    @Inject(GRAPHQL_OPTIONS) options: GraphQLOptions
  ) {
    this.options = {
      withCredentials: false,
      ...options
    };
  }

  request<TData = any>(
    operation: string,
    variables?: Record<string, any>
  ): Observable<ExecutionResult<TData>> {
    return this.http.post<ExecutionResult<TData>>(
      this.options.url,
      {
        query: operation,
        variables: variables || undefined
      },
      {
        observe: "body",
        responseType: "json",
        reportProgress: false,
        withCredentials: this.options.withCredentials
      }
    );
  }
}
