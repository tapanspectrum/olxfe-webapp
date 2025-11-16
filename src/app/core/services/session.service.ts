import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
/**
 * Session storage service
 * Provides methods to get, set, remove, clear session storage items.
 */
export class SessionService {

    constructor(private http: HttpClient) { }

    /**
     * set session storage item
     * @param key
     * @param value
     */
    setItem(key: string, value: any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * get session storage item
     * @param key
     */
    getItem(key: string): any {
        var value = sessionStorage.getItem(key) || '{}';
        if (value === '{}' || value === undefined || !value) { return null; } else {
            return value
        }
    }

    /**
     * get API from aip
     * @param key
     */

    async getClientIp(): Promise<{ ip: string }> {
        return firstValueFrom(
            this.http.get<{ ip: string }>('https://api.ipify.org?format=json')
        );
    }


    /**
     * remove session storage item
     * @param key
     */
    removeItem(key: string) {
        sessionStorage.removeItem(key);
    }

    /**
     * remove all session storage items
     */
    clear() {
        sessionStorage.clear();
    }

}
