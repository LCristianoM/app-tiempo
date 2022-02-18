import { Injectable } from "@angular/core";
import { WeatherData } from "@app/shared/interfaces/weather.interface";
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Coord } from '../../../shared/interfaces/weather.interface';

@Injectable({ providedIn: 'root' })
export class WeaterService {
  private readonly API_URL = environment.opneWeather.url;
  constructor(private readonly http: HttpClient) {}

  public getWeatherByName(city: string): Observable<WeatherData> {
    const params = new HttpParams()
      .set('q', city)

    return this.http.get<WeatherData>(`${this.API_URL}/weather`, {
      params: params,
    });
  }

  public getWeatherByCoords(coord: Coord): Observable<WeatherData> {
    const params = new HttpParams()
      .set('lat', coord.latitude)
      .set('lon', coord.longitude)
    return this.http.get<WeatherData>(`${this.API_URL}/weather`, {params})
  }

}
