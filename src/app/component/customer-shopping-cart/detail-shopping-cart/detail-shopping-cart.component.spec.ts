import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailShoppingCartComponent } from './detail-shopping-cart.component';

describe('DetailShoppingCartComponent', () => {
  let component: DetailShoppingCartComponent;
  let fixture: ComponentFixture<DetailShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailShoppingCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
