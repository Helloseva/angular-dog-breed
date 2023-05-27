import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppComponent } from './app.component';
import { ModalComponent } from './modal/modal.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { DogBreedsComponent } from './dog-breeds/dog-breeds.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    SearchBarComponent,
    DogBreedsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add FormsModule
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
