import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-farmer-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './farmer-dashboard.html',
  styleUrl: './farmer-dashboard.css'
})
export class FarmerDashboard implements OnInit {

  farmers: any[] = [];
  allFarmers: any[] = [];
  states: any[] = [];
  districts: any[] = [];
  selectedState = '';
  selectedDistrict = '';
  searchName = '';

  constructor(private http: HttpClient) {}

  cdr = inject(ChangeDetectorRef);
  ngOnInit(): void {
    this.loadFarmers();
    this.loadStates();
  }

  searchFarmers() {

    const request = {
      name: this.searchName || null,
      stateName: this.selectedState || null,
      districtName: this.selectedDistrict || null
    };
  
    this.http
      .post<any[]>(
        'http://localhost:8080/search-farmers',
        request
      )
      .subscribe({
        next: (data) => {
          this.farmers = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Search failed', err);
        }
      });
  }
  resetFilters() {

    this.searchName = '';
    this.selectedState = '';
    this.selectedDistrict = '';
    this.districts = [];
  
    this.loadFarmers();
  }
  loadStates() {
    this.http
      .get<any[]>('http://localhost:8080/states')
      .subscribe(data => {
        this.states = data;
        this.cdr.detectChanges();
      });
  }

  onStateChange() {

    this.selectedDistrict = '';

    const state = this.states.find(
      s => s.stateName === this.selectedState
    );

    if (!state) {
      this.districts = [];
      this.searchFarmers();
            return;
    }

    this.http
      .get<any[]>(`http://localhost:8080/districts/${state.stateCode}`)
      .subscribe(data => {
        this.districts = data;
        this.searchFarmers();
        this.cdr.detectChanges();
      });
  }


  loadFarmers() {
    this.http
      .get<any[]>('http://localhost:8080/all-farmers')
      .subscribe({
        next: (data) => {
          this.allFarmers = data;
          this.farmers = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error loading farmers', err);
        }
      });
  }
}