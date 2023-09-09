import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, defer, from, throwError } from 'rxjs';
import { IReview } from '../Interfaces/Review';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewserviceService {

constructor(private http:HttpClient) { }
  api = "http://tariqreda308-001-site1.etempurl.com/api/"
  AddReview(obj:any)
{
    return defer(() => from(this.http.post("http://tariqreda308-001-site1.etempurl.com/api/ReviewRoom",obj))
    .pipe(catchError((err) => {
      return throwError(() => err.message || "server error");
    })));
}
DeleteReview(Id:any)
{
  return defer(() => from( this.http.delete<IReview>(`${this.api}ReviewRoom/Id?Id=${Id}`)).pipe(catchError((err) => {
    return throwError(() => err.message || "server error");
  })));
}
EditReview(editreview:any):Observable<IReview>
{
  return this.http.put<IReview>("${environment.apiUrl}ReviewRoom",editreview).pipe(catchError((err)=>{
    return throwError(()=>err.errorMessage || "server error")
  }))
}

// GetAllReviews():Observable<IReview[]>
// {
//   return this.http.get<IReview[]>(`http://localhost:7189/api/ReviewRoom`)
// }
// GetThreeReviews():Observable<IReview[]>
// {
//   return this.http.get<IReview[]>(`http://localhost:7189/api/ReviewRoom/display`)
// }


}
