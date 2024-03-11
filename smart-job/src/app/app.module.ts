import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrabalhadorComponent } from './usuario/trabalhador/trabalhador.component';
import { TableModule } from 'primeng/table';
import { CommonModule, DatePipe } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { LoginComponent } from './login/login.component';
import { VagaComponent } from './vaga/vaga.component';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { VagaListComponent } from './vaga-list/vaga-list.component';
import { CarouselModule } from 'primeng/carousel';
import { CadastroVagaComponent } from './cadastro-vaga/cadastro-vaga.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RedefinirSenhaComponent } from './redefinir-senha/redefinir-senha.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TabelaVagasComponent } from './tabela-vagas/tabela-vagas.component';
import { EmpresaComponent } from './usuario/empresa/empresa.component';
import { VagaListEmpresaComponent } from './vaga-list-empresa/vaga-list-empresa.component';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CadastroComponent,
    TrabalhadorComponent,
    LoginComponent,
    VagaComponent,
    VagaListComponent,
    CadastroVagaComponent,
    RedefinirSenhaComponent,
    PageNotFoundComponent,
    TabelaVagasComponent,
    EmpresaComponent,
    VagaListEmpresaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    HttpClientModule,
    RadioButtonModule,
    FormsModule,
    ToastModule,
    BrowserAnimationsModule,
    TableModule,
    CommonModule,
    DropdownModule,
    MultiSelectModule,
    CalendarModule,
    FieldsetModule,
    PanelModule,
    CarouselModule,
    InputTextareaModule,
    InputNumberModule,
    CalendarModule,
    DialogModule,
    ConfirmDialogModule,
    BreadcrumbModule,
  ],
  exports: [],
  providers: [MessageService, HttpClient, DatePipe, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
