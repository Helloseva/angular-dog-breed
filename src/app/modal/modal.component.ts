import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Breed } from '../dog-breeds/dog-breeds.component';
import axios from 'axios';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() selectedBreed: Breed | null = null; // Input property to receive the selected breed from the parent component
  @Output() closeModal = new EventEmitter<void>(); // Output event to emit when the modal is closed

  constructor() { }

  async fetchBreedDetails(breed: Breed): Promise<void> {
    try {
      const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${breed.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'live_WRCzcNpoWUhxO7orPHuVfdKoGaNPMUpnpdRi1kfsmssNJ1NCqvUJ14ew0UsiN358'
        }
      }); 
      const breedData = response.data;

      // Update the breed object with fetched details
      breed.weight = breedData.weight.metric;
      breed.height = breedData.height.metric;
      breed.life_span = breedData.life_span;
      breed.bred_for = breedData.bred_for;
      breed.breed_group = breedData.breed_group;
    } catch (error) {
      console.error(`Failed to fetch breed details for ${breed.name}.`);
    }
  }

  onCloseModal(): void {
    this.closeModal.emit(); // Emit the closeModal event when the modal is closed
  }
}
