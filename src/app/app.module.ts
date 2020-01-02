import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { configureGraphQL } from "ngx-graphql";

import { AppComponent } from "./app.component";
import { ListComponent } from "./list.component";
import { UpvoterComponent } from "./upvoter.component";

@NgModule({
  declarations: [AppComponent, ListComponent, UpvoterComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    configureGraphQL({
      url: "https://graphql-voter-app.herokuapp.com"
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
