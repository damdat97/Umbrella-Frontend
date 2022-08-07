import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/component/shop-cart/shop-cart.component.spec.ts
import { ShopCartComponent } from './shop-cart.component';

describe('ShopCartComponent', () => {
  let component: ShopCartComponent;
  let fixture: ComponentFixture<ShopCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopCartComponent);
========
import { ImageComponent } from './image.component';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageComponent);
>>>>>>>> origin/dev:src/app/component/blocks/image/image.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
