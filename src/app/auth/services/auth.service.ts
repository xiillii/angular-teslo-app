import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthMapper } from '@auth/interfaces/auth.mapper';
import { LoginDto } from '@auth/interfaces/login.dto';
import { LoginResponse } from '@auth/interfaces/login.response.interface';
import { UserDto } from '@auth/interfaces/user.dto';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;
type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<UserDto | null>(null);
  private _token = signal<string | null>(null);

  private http = inject(HttpClient);

  checkAuthStatusResource = rxResource({
    loader: () => this.checkAuthStatus(),
  });

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';

    if (this._user()) return 'authenticated';

    return 'unauthenticated';
  });

  user = computed<UserDto | null>(() => this._user());
  token = computed<string | null>(() => this._token());

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<LoginResponse>(`${baseUrl}/auth/login`, { email, password })
      .pipe(
        map((response) => AuthMapper.toLoginDto(response)),
        tap((dto) => {
          this.handleAuthSuccess(dto);
        }),
        map(() => true),
        catchError((error) => {
          this.logout();

          return of(false);
        })
      );
  }

  checkAuthStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();

      return of(false);
    }

    return this.http
      .get<LoginResponse>(`${baseUrl}/auth/check-status`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        map((response) => {
          const dto = AuthMapper.toLoginDto(response);

          this.handleAuthSuccess(dto);

          return true;
        }),
        catchError((error) => {
          this.logout();

          return of(false);
        })
      );
  }

  logout(): void {
    this._authStatus.set('unauthenticated');
    this._user.set(null);
    this._token.set(null);
    localStorage.removeItem('token');
  }

  private handleAuthSuccess(dto: LoginDto): void {
    this._user.set(dto.user);
    this._token.set(dto.token);
    this._authStatus.set('authenticated');

    localStorage.setItem('token', dto.token);
  }
}
