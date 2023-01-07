import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Asset } from 'src/app/_models/asset';
import { AssetService } from 'src/app/_services/asset.service';

@Injectable({
  providedIn: 'root'
})
export class AssetResolver implements Resolve<Asset[]> {
  constructor(private assets: AssetService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Asset[]> {
    return this.assets.getAssets();
  }
}
