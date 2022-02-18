import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from './shared/interfaces/weather.interface';
import { WeaterService } from './pages/weather/services/weather.service';
import { GeoLocationService } from './shared/services/geo-location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public weather$!: Observable<WeatherData>;
  constructor(
    private readonly weatherSvc: WeaterService,
    private readonly geoLocationSvc: GeoLocationService
  ) {
    if(navigator?.geolocation){
      this.getLocation();
    }
  }

  public onSearch(city: string): void {
    this.weather$ = this.weatherSvc.getWeatherByName(city);
  }

  private async getLocation(): Promise<void> {
    try {
      const { coords } = await this.geoLocationSvc.getCurrentPosition();
      this.weather$ = this.weatherSvc.getWeatherByCoords(coords);
    } catch (error) {
      console.log(error);
    }
  }
}

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
