import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

@Injectable({
    providedIn:"root",
})
export class ErrorHandlingService{
    
    public handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'Incorrect Email or Password';
        return throwError(errorMessage);
      }
}