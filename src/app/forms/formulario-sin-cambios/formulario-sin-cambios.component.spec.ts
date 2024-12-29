import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioSinCambiosComponent } from './formulario-sin-cambios.component';

describe('FormularioSinCambiosComponent', () => {
  let component: FormularioSinCambiosComponent;
  let fixture: ComponentFixture<FormularioSinCambiosComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioSinCambiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioSinCambiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
