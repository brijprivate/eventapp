import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard.page';
import { ContactpickerPage } from './contactpicker/contactpicker.page';

const routes: Routes = [
    {
        path: '',
        component: DashboardPage,
        children: [
            {
                path: 'tab1',
                children: [
                    {
                        path: '',
                        loadChildren: './tab1/tab1.module#Tab1PageModule'
                    }
                ]
            },
            {
                path: 'picker',
                children: [
                    {
                        path: '',
                        loadChildren: './contactpicker/contactpicker.module#ContactpickerPageModule'
                    }
                ]
            },

            {
                path: 'tab2',
                children: [
                    {
                        path: '',
                        loadChildren: './tab2/tab2.module#Tab2PageModule'
                    }
                ]
            },
            {
                path: 'tab3',
                children: [
                    {
                        path: '',
                        loadChildren: './tab3/tab3.module#Tab3PageModule'
                    }
                ]
            },
            {
              path: '',
              redirectTo: '/dashboard/tab1',
              pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/dashboard/tab1',
        pathMatch: 'full'
        // component: DashboardPage,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class dashboardRoutingModule { }
//aasdasasd