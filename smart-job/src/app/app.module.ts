import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { CadastroComponent } from './home/cadastro/cadastro.component';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './home/login/login.component';
import { RedefinirSenhaComponent } from './home/redefinir-senha/redefinir-senha.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { JwtInterceptor } from './services/interceptors/jwt.interceptor';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CadastroComponent,
    LoginComponent,
    RedefinirSenhaComponent,
    PageNotFoundComponent,
  ],
  imports: [SharedModule, BrowserAnimationsModule, AppRoutingModule],
  exports: [],
  providers: [
    MessageService,
    HttpClient,
    DatePipe,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
