import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FetchTaskComponent } from './components/fetch-task/fetch-task.component';
import { authGuard } from '../../core/guard/auth.guard';
import { TaskBulkSaveComponent } from './components/task-bulk-save/task-bulk-save.component';

const routes: Routes = [
  {
    path: '',
    component: FetchTaskComponent,
    canActivate: [authGuard],
  },
  {
    path: 'save',
    component: TaskBulkSaveComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
