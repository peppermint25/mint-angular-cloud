import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintAngularCloudComponent } from './mint-angular-cloud.component';

describe('MintAngularCloudComponent', () => {
  let component: MintAngularCloudComponent;
  let fixture: ComponentFixture<MintAngularCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MintAngularCloudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MintAngularCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
