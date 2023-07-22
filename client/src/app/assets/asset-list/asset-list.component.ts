import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Asset } from 'src/app/_models/asset';
import { AssetService } from 'src/app/_services/asset.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {
  assets: Asset[];
  assetForm: UntypedFormGroup;

  constructor(private assetService: AssetService, private toastr: ToastrService, private fb: UntypedFormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAssetsOnInit();
  }

  initializeForm() {
    this.assetForm = this.fb.group({
      name: ['', Validators.required],
      codeName: ['', Validators.required],
    })
  }

  loadAssetsOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.assets = data?.assets;
    });
  }

  loadAssets() {
    this.assetService.getAssets().subscribe(assets => {
      this.assets = assets;
    })
  }

  createAsset() {
    this.assetService.createAsset(this.assetForm.value).subscribe(response => {
      console.log(response);
      this.loadAssets();
      this.toastr.success("Asset added!", "Success!")
    })
  }

  deleteAsset(id: number) {
    this.assetService.deleteAsset(id).subscribe(() => {
      this.loadAssets();
      this.toastr.success("Asset removed!", "Success!")
    });
  }

}
