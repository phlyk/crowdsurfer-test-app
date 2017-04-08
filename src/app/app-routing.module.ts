/*import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';


const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'display', component: DisplayComponent }
    /*{ path: 'home', component: HomeComponent },
    { path: 'start', component: StartComponent },
    { path: 'courses', loadChildren: 'app/courses/courses.module#CoursesModule' },
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
    { path: 'test-rest', loadChildren: 'app/test-rest/test-rest.module#TestRestModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }/*