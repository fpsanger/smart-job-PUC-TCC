import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DateFormatUTCPipe } from '../pipes/date-format.pipe';
import { StatusPipe, TrabalhadorStatusPipe } from '../pipes/status.pipe';
import { TabelaVagasComponent } from '../componentes/tabela-vagas/tabela-vagas.component';

@NgModule({
  declarations: [
    DateFormatUTCPipe,
    StatusPipe,
    TrabalhadorStatusPipe,
    TabelaVagasComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    HttpClientModule,
    RadioButtonModule,
    FormsModule,
    ToastModule,
    TableModule,
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
  exports: [
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    HttpClientModule,
    RadioButtonModule,
    FormsModule,
    ToastModule,

    TableModule,
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
    DateFormatUTCPipe,
    StatusPipe,
    TrabalhadorStatusPipe,
    TabelaVagasComponent,
  ],
})
export class SharedModule {}
