import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  template: `
    <input type="text" placeholder="Search breeds" (input)="onInputChange($event)">
  `,
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() searchEvent = new EventEmitter<string>();

  // Event handler for input change event
  onInputChange(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    // Emit the search event with the entered search term
    this.searchEvent.emit(searchTerm);
  }
}
