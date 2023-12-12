import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagingService {

  calculateStartIndex(page: number, pageSize: number): number {
    return (page - 1) * pageSize;
  }

  calculateEndIndex(page: number, pageSize: number, totalItems: number): number {
    const endIndex = this.calculateStartIndex(page, pageSize) + pageSize -1;
    return endIndex < totalItems ? endIndex : totalItems -1;
  } 

  constructor() { }
}
