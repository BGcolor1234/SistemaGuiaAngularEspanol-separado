import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarCasaComponent } from './insertar-casa.component';

describe('InsertarCasaComponent', () => {
  let component: InsertarCasaComponent;
  let fixture: ComponentFixture<InsertarCasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertarCasaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsertarCasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
