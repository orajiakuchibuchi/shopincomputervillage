
import { TranslateModule } from '@ngx-translate/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { I18nModule } from '../i18n/i18n.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {WebcamModule} from 'ngx-webcam';
import {RangeSliderModule} from 'ngx-range-slider';
import {NgxPaginationModule} from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { FileUploadAngularModule } from 'file-upload-angular';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { NavHeaderTopComponent } from './nav-header-top/nav-header-top.component';
import { NavHeaderCenterComponent } from './nav-header-center/nav-header-center.component';
import { NavHeaderBottomComponent } from './nav-header-bottom/nav-header-bottom.component';
import { NavHeaderBottomLeftComponent } from './nav-header-bottom-left/nav-header-bottom-left.component';
import { NavHeaderBottomCenterComponent } from './nav-header-bottom-center/nav-header-bottom-center.component';
import { NavHeaderBottomRightComponent } from './nav-header-bottom-right/nav-header-bottom-right.component';
import { FooterComponent } from './footer/footer.component';
import { AuthBarComponent } from './auth-bar/auth-bar.component';
import { AuthBarLoginComponent } from './auth-bar-login/auth-bar-login.component';
import { AuthBarRegisterComponent } from './auth-bar-register/auth-bar-register.component';
import { AuthBarRecoverPasswordComponent } from './auth-bar-recover-password/auth-bar-recover-password.component';
import { AuthBarStatusComponent } from './auth-bar-status/auth-bar-status.component';

import { AuthSocialAuthComponent } from './auth-social-auth/auth-social-auth.component';
import { LivechatComponent } from './livechat/livechat.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BecomeAVendorComponent } from './become-a-vendor/become-a-vendor.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { AngularEditorModule } from '@kolkov/angular-editor';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatTreeModule} from '@angular/material/tree';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Angular4PaystackModule } from 'angular4-paystack';
import { environment } from 'src/environments/environment';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CompareComponent } from './compare/compare.component';

@NgModule({
  declarations: [


    NavHeaderComponent,
        NavHeaderTopComponent,
        NavHeaderCenterComponent,
        NavHeaderBottomComponent,
        NavHeaderBottomLeftComponent,
        NavHeaderBottomCenterComponent,
        NavHeaderBottomRightComponent,
        FooterComponent,
        AuthBarComponent,
        AuthBarLoginComponent,
        AuthBarRegisterComponent,
        AuthBarRecoverPasswordComponent,
        AuthBarStatusComponent,
        AuthSocialAuthComponent,
        LivechatComponent,
        ResetPasswordComponent,
        BecomeAVendorComponent,
        WishlistComponent,
        CompareComponent,
  ],
  imports: [
    MatAutocompleteModule,
    CommonModule,
    I18nModule,
    ChartsModule,
    TranslateModule,
    FormsModule,
    AngularEditorModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    RouterModule,
    NgxSpinnerModule,
    WebcamModule,
    IvyCarouselModule,
    FileUploadAngularModule,
    RangeSliderModule,
    NgxPaginationModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.chasingDots,
        backdropBackgroundColour: 'rgb(8 0 0 / 45%)',
        backdropBorderRadius: '4px',
        primaryColour: '#ffffff',
        secondaryColour: '#000000',
        tertiaryColour: '#ffffff'
    }),
    Angular4PaystackModule.forRoot(environment.PAYSTACK_PUBLIC_KEY),
    DragDropModule,ScrollingModule,CdkTableModule,CdkTreeModule,
    MatBadgeModule,MatBottomSheetModule,MatButtonModule,MatButtonToggleModule,
    MatCardModule,MatCheckboxModule,MatChipsModule,MatDatepickerModule,
    MatProgressBarModule,MatMenuModule,MatPaginatorModule,MatListModule,MatInputModule,MatIconModule,MatDialogModule,MatDividerModule,MatExpansionModule,MatGridListModule,
    MatSidenavModule,MatSliderModule,MatSlideToggleModule,MatSnackBarModule,MatSortModule,MatStepperModule,MatTableModule,MatTabsModule,MatToolbarModule,MatTooltipModule,MatTreeModule,MatProgressSpinnerModule,MatRadioModule,MatSelectModule
  ],
  exports: [
    I18nModule,
    CommonModule,
    TranslateModule,

    SelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    // OrdersModule,
    RouterModule,
    Angular4PaystackModule,
    NgxSpinnerModule,
    AngularEditorModule,
    WebcamModule,
    NgxPaginationModule,
    // ProductModule,
    NgxLoadingModule,
    IvyCarouselModule,
    FileUploadAngularModule,
    NavHeaderComponent,
    NavHeaderTopComponent,
    NavHeaderCenterComponent,
    NavHeaderBottomComponent,
    FooterComponent,
    AuthBarComponent,
    AuthBarLoginComponent,
    AuthBarRegisterComponent,
    RangeSliderModule,
    AuthBarRecoverPasswordComponent,
    ResetPasswordComponent,
    WishlistComponent,
    CompareComponent,
    DragDropModule,ScrollingModule,CdkTableModule,CdkTreeModule,
    MatBadgeModule,MatBottomSheetModule,MatButtonModule,MatButtonToggleModule,
    MatCardModule,MatCheckboxModule,MatChipsModule,MatDatepickerModule,
    MatProgressBarModule,MatMenuModule,MatPaginatorModule,MatListModule,MatInputModule,MatIconModule,MatDialogModule,MatDividerModule,MatExpansionModule,MatGridListModule,
    MatSidenavModule,MatSliderModule,MatSlideToggleModule,MatSnackBarModule,MatSortModule,MatStepperModule,MatTableModule,MatTabsModule,MatToolbarModule,MatTooltipModule,MatTreeModule,MatProgressSpinnerModule,MatRadioModule,MatSelectModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
