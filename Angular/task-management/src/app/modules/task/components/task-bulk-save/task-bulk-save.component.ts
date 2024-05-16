import { Component, OnInit } from '@angular/core';
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
import * as XLSX from 'xlsx';

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
export class TaskBulkSaveComponent implements OnInit {
  importForm: FormGroup;
  selectedFile: File | null = null;

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

    this.importForm = this.fb.group({
      fileInput: ['', Validators.required],
    });
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

  exportTasks() {
    const tasksData: any[][] = this.fetchTasks.data.map((task) => [
      task.taskForm.value.title,
      task.taskForm.value.description,
      task.taskForm.value.dueDate,
      task.taskForm.value.priority,
      task.taskForm.value.assignedTo,
    ]);

    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      ['Title', 'Description', 'Due Date', 'Priority', 'Assigned To'],
      ...tasksData,
    ]);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
    XLSX.writeFile(workbook, 'tasks.xlsx');
  }

  onFileInputChange(event: any) {
    const fileInput = event.target.files[0];
    if (!fileInput) {
      console.log('Invalid file or file not selected.');
      return;
    }
    this.selectedFile = fileInput;
  }

  importTasks() {
    if (!this.selectedFile) {
      console.log('Invalid file or file not selected.');
      return;
    }

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const binaryString: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryString, {
        type: 'binary',
      });
      const worksheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
      const tasks: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const tasksDataWithoutHeader = tasks.slice(1);
      console.log(tasksDataWithoutHeader);

      this.fetchTasks.data = tasksDataWithoutHeader.map((task) => ({
        isNew: false,
        isEdited: false,
        taskForm: this.fb.group({
          title: [task[0], Validators.required],
          description: [task[1], Validators.required],
          dueDate: [task[2], Validators.required],
          priority: [task[3], Validators.required],
          assignedTo: [task[4], Validators.required],
        }),
      }));

      const fetchTask = JSON.parse(localStorage.getItem('tasks')!) || [];

      this.fetchTasks.data = this.fetchTasks.data.map((task: any) => ({
        ...task,
        id: fetchTask.length + 1,
      }));

      localStorage.setItem('task', JSON.stringify(this.fetchTasks.data));
    };
    reader.readAsBinaryString(this.selectedFile);
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
