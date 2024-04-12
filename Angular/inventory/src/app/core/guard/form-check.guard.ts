import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface FormComponent {
  hasUnsavedChanges(): boolean;
}

@Injectable({ providedIn: 'root' })
export class formCheckGuard implements CanDeactivate<FormComponent> {
  canDeactivate(
    component: FormComponent,
    currentRoute: any,
    currentState: any,
    nextState: any
  ): boolean | Observable<boolean> | Promise<boolean> {
    console.log(currentRoute);
    console.log(currentState);
    console.log(nextState);

    if (component.hasUnsavedChanges()) {
      return confirm(
        'Are you sure you want to leave? You have unsaved changes.'
      );
    }
    return true;
  }
}
