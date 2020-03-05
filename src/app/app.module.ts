import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from "@angular/material";
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { Ng5SliderModule } from 'ng5-slider';
import { ReactiveFormsModule } from '@angular/forms';
import { appRoutingModule } from './app.routing';


import { AppComponent } from './app.component';
import { ArticleListComponent } from 'src/articles/article-list.component';
import { DialogContentComponent } from 'src/articles/dialogComponent';
import { LoginComponent } from 'src/login/login.component';
import { RegisterComponent } from 'src/register/register.component';
import { HomeComponent } from 'src/loginhome/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    DialogContentComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatTabsModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule,
    MatFormFieldModule,
    MatSelectModule,
    Ng5SliderModule,
    ReactiveFormsModule,
    appRoutingModule
  ],
  entryComponents: [
    DialogContentComponent
  ],

  providers: [DialogContentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
