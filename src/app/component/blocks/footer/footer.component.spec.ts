import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/component/image/image-create/image-create.component.spec.ts
import { ImageCreateComponent } from './image-create.component';

describe('ImageCreateComponent', () => {
  let component: ImageCreateComponent;
  let fixture: ComponentFixture<ImageCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageCreateComponent);
========
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
>>>>>>>> origin/dev:src/app/component/blocks/footer/footer.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
