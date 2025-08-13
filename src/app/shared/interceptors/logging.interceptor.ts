import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log(
          `%c${req.method} ${req.url} returned a response with status %c${event.status}`,
          'color: #798d3aff;',
          'color: #3f8628;'
        );
      }
    })
  );
}
