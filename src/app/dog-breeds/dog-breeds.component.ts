import { Component, OnInit } from '@angular/core';
import axios from 'axios';

export interface Breed {
  id: number;
  name: string;
  image: string;
  weight: string;
  height: string;
  life_span: string;
  bred_for: string;
  breed_group: string;
}

@Component({
  selector: 'app-dog-breeds',
  templateUrl: './dog-breeds.component.html',
  styleUrls: ['./dog-breeds.component.css']
})

// Add array to store all/filtered/current breeds and obtained API Key
export class DogBreedsComponent implements OnInit {
  breeds: Breed[] = [];
  filteredBreeds: Breed[] = [];
  selectedBreed: Breed | null = null;
  loading: boolean = false;
  error: string = '';
  endpoint: string = 'https://api.thedogapi.com/v1';
  apiKey: string = 'live_WRCzcNpoWUhxO7orPHuVfdKoGaNPMUpnpdRi1kfsmssNJ1NCqvUJ14ew0UsiN358';

  constructor() { }

  async ngOnInit() {
    this.loading = true;
    this.error = '';

    try {
      // Fetch breeds from the API
      const response = await axios.get(`${this.endpoint}/breeds`, {
        headers: {
          'x-api-key': this.apiKey
        },
        params: {
          limit: 10,
          page: 0
        }
      });

      // Map the response data to Breed objects and initialize the breed properties
      this.breeds = response.data.map((breed: any) => ({
        id: breed.id,
        name: breed.name,
        image: '',
        weight: '',
        height: '',
        life_span: '',
        bred_for: '',
        breed_group: ''
      }));
      this.filteredBreeds = this.breeds.slice();
      this.loading = false;

      // Fetch image and details for each breed
      for (const breed of this.breeds) {
        await this.fetchBreedImage(breed);
        await this.fetchBreedDetails(breed);
      }
    } catch (error) {
      this.error = 'Failed to load breeds.';
      this.loading = false;
    }
  }

  async fetchBreedImage(breed: Breed) {
    try {
      // Fetch breed image from the API
      const imageResponse = await axios.get(`${this.endpoint}/images/search?breed_ids=${breed.id}&include_breeds=true&size=small&format=json`, {
        headers: {
          'x-api-key': this.apiKey
        }
      });
      const images = imageResponse.data;
      breed.image = images[0]?.url;
    } catch (error) {
      console.error(`Failed to fetch image for breed ${breed.name}.`);
    }
  }

  async fetchBreedDetails(breed: Breed) {
    try {
      // Fetch breed details from the API
      const response = await axios.get(`${this.endpoint}/breeds/${breed.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey
        }
      });
      const breedData = response.data;
      breed.weight = breedData.weight.metric;
      breed.height = breedData.height.metric;
      breed.life_span = breedData.life_span;
      breed.bred_for = breedData.bred_for;
      breed.breed_group = breedData.breed_group;
    } catch (error) {
      console.error(`Failed to fetch breed details for ${breed.name}.`);
    }
  }

  openModal(breed: Breed): void {
    this.selectedBreed = breed;
  }

  closeModal(): void {
    this.selectedBreed = null;
  }

  async filterBreeds(searchTerm: string): Promise<void> {
    if (searchTerm.trim() === '') {
      this.filteredBreeds = this.breeds.slice(0, 10); // Show the first 10 breeds if search term is empty
    } else {
      try {
        // Fetch breeds based on the search term from the API
        const response = await axios.get(`${this.endpoint}/breeds/search?q=${searchTerm}`, {
          headers: {
            'x-api-key': this.apiKey
          }
        });

         // Map the response data to Breed objects and initialize the breed properties
      const filteredBreeds = response.data.map((breed: any) => ({
        id: breed.id,
        name: breed.name,
        image: '',
        weight: '',
        height: '',
        life_span: '',
        bred_for: '',
        breed_group: ''
      }));

      // Fetch image and details for each filtered breed
      for (const breed of filteredBreeds) {
        await this.fetchBreedImage(breed);
        await this.fetchBreedDetails(breed);
      }

      this.filteredBreeds = filteredBreeds;
    } catch (error) {
      console.error('Failed to fetch breeds.');
      this.filteredBreeds = [];
    }
  }
  }}