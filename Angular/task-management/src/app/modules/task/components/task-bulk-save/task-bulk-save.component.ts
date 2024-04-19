import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../../core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

interface Task {
  id?: string;
  isNew: boolean;
  isEdited: boolean;
  taskForm: FormGroup;
}

@Component({
  selector: 'app-task-bulk-save',
  templateUrl: './task-bulk-save.component.html',
  styleUrl: './task-bulk-save.component.css',
})
export class TaskBulkSaveComponent {
  fetchTasks: MatTableDataSource<Task>;
  displayedColumns: string[] = [
    'title',
    'description',
    'dueDate',
    'priority',
    'assignedTo',
    'actions',
  ];
  displayedPriority: string[] = ['Low', 'Medium', 'High'];
  fetchUsers: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 3;

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.fetchTasks = new MatTableDataSource<Task>([]);
    this.loadTasksFromLocalStorage();
  }

  ngOnInit(): void {
    this.fetchUsersRecords();
  }

  fetchUsersRecords() {
    this.userService.fetchUser().subscribe({
      next: (res) => {
        this.fetchUsers = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadTasksFromLocalStorage() {
    this.isLoading = true;
    const tasks = JSON.parse(localStorage.getItem('task') || '[]') as Task[];
    this.fetchTasks.data = tasks.map((task: any) => ({
      id: task.id,
      isNew: false,
      isEdited: false,
      taskForm: this.fb.group({
        title: [task.title, Validators.required],
        description: [task.description, Validators.required],
        dueDate: [new Date(task.dueDate), Validators.required],
        priority: [task.priority, Validators.required],
        assignedTo: [task.assignedTo, Validators.required],
      }),
    }));
    this.isLoading = false;
  }

  addTask() {
    const newTask: Task = {
      isNew: true,
      isEdited: false,
      taskForm: this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        dueDate: [new Date(), Validators.required],
        priority: ['', Validators.required],
        assignedTo: ['', Validators.required],
      }),
    };
    this.fetchTasks.data.push(newTask);
    this.fetchTasks._updateChangeSubscription();
  }

  markAsEdited(task: Task) {
    task.isEdited = true;
  }

  bulkSave() {
    const editedTasks = this.fetchTasks.data.filter((task) => task.isEdited);
    const invalidTasks = editedTasks.filter((task) => !task.taskForm.valid);
    if (invalidTasks.length > 0) {
      invalidTasks.forEach((task) => {
        Object.values(task.taskForm.controls).forEach((control) => {
          control.markAsTouched();
        });
      });
      console.log('Please fill in all required fields.');
      return;
    }
    if (editedTasks.length > 0) {
      this.saveLocalStorage(editedTasks);
    } else {
      this._snackBar.open('No changes detected!', 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
    }
  }

  saveLocalStorage(tasks: any) {
    const fetchTasks = JSON.parse(localStorage.getItem('task')!) || [];

    tasks.forEach((task: any) => {
      const existingTaskIndex = fetchTasks.findIndex(
        (t: Task) => t.id === task.id
      );

      if (existingTaskIndex !== -1) {
        fetchTasks[existingTaskIndex].title = task.taskForm.value.title;
        fetchTasks[existingTaskIndex].description =
          task.taskForm.value.description;
        fetchTasks[existingTaskIndex].dueDate = task.taskForm.value.dueDate;
        fetchTasks[existingTaskIndex].priority = task.taskForm.value.priority;
        fetchTasks[existingTaskIndex].assignedTo =
          task.taskForm.value.assignedTo;
      } else {
        let newTask = {
          id: new Date(),
          title: task.taskForm.value.title,
          description: task.taskForm.value.description,
          dueDate: task.taskForm.value.dueDate,
          priority: task.taskForm.value.priority,
          assignedTo: task.taskForm.value.assignedTo,
        };
        fetchTasks.push(newTask);
      }

      localStorage.setItem('task', JSON.stringify(fetchTasks));
      task.isNew = false;

      this._snackBar.open('bulk save successfully executed!', 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
    });
  }

  cancelTask(index: number) {
    this.fetchTasks.data.splice(index, 1);
    this.fetchTasks._updateChangeSubscription();
  }

  deleteTask(index: number) {
    const dialogRef = this.dialog.open(TaskDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        const updatedTasks = this.fetchTasks.data.filter((_, i) => i !== index);
        localStorage.setItem(
          'task',
          JSON.stringify(
            updatedTasks.map((t) => ({
              id: t.id,
              title: t.taskForm.value.title,
              description: t.taskForm.value.description,
              dueDate: t.taskForm.value.dueDate,
              priority: t.taskForm.value.priority,
              assignedTo: t.taskForm.value.assignedTo,
            }))
          )
        );
        this.fetchTasks.data = updatedTasks;
        this._snackBar.open('task deleted successfully!', 'close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        });
      }
    });
  }
}
