import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-farmer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './farmer-dashboard.html',
  styleUrl: './farmer-dashboard.css'
})
export class FarmerDashboard implements OnInit {

  farmers: any[] = [];

  constructor(private http: HttpClient) {}

  cdr = inject(ChangeDetectorRef);
  ngOnInit(): void {
    this.loadFarmers();
  }

  loadFarmers() {
    this.http
      .get<any[]>('http://localhost:8080/all-farmers')
      .subscribe({
        next: (data) => {
          this.farmers = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error loading farmers', err);
        }
      });
  }
}