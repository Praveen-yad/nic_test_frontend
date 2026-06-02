import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-farmer-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './farmer-register.html',
  styleUrl: './farmer-register.css',
})
export class FarmerRegister implements OnInit {

  states: any[] = [];
  districts: any[] = [];

  farmer = {
    name: '',
    fatherName: '',
    mobileNo: '',
    familyId: '',
    gender: '',
    dateOfBirth: '',
    state: '',
    district: '',
    pinCode: null as number | null,
    landArea: null as number | null,
    mainCrop: ''
  };

  message = '';

  resetForm() {
    this.farmer = {
      name: '',
      fatherName: '',
      mobileNo: '',
      familyId: '',
      gender: '',
      dateOfBirth: '',
      state: '',
      district: '',
      pinCode: null,
      landArea: null,
      mainCrop: ''
    };

    this.districts = [];
  }

  constructor(private http: HttpClient) {}
  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loadStates();
  }

  loadStates() {
    this.http
      .get<any[]>('http://localhost:8080/states')
      .subscribe({
        next: (data) => {
          this.states = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  onStateChange() {

    const selectedState = this.states.find(
      state => state.stateName === this.farmer.state
    );

    if (!selectedState) {
      this.districts = [];
      return;
    }

    this.http
      .get<any[]>(
        `http://localhost:8080/districts/${selectedState.stateCode}`
      )
      .subscribe({
        next: (data) => {
          this.districts = data;
          this.farmer.district = '';
          this.cdr.detectChanges()
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  registerFarmer() {
    this.http
      .post(
        'http://localhost:8080/register-farmer',
        this.farmer,
        { responseType: 'text' }
      )
      .subscribe({
        next: (response) => {
          this.message = "Registered Successfully";
          this.resetForm();
          this.cdr.detectChanges();
        },
        error: () => {
          this.message = 'Registration Failed';
        }
      });
  }
}