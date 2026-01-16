import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
@Injectable({ providedIn: 'root' })
export class App {
  private http = inject(HttpClient);

  private readonly apiUrl = "http://localhost:8080/sample";
  protected readonly title = signal('QuantumMart');

  springText = "";

  fetchText(): void {
    console.log("Clicked.");

    this.http.get(this.apiUrl, { responseType: 'text' as const }).subscribe(data => {
      this.springText = data

      console.log("Data is " + data);
    });
  } 
}
