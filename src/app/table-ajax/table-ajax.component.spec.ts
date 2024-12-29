import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableAjaxComponent } from './table-ajax.component';

describe('TableAjaxComponent', () => {
  let component: TableAjaxComponent;
  let fixture: ComponentFixture<TableAjaxComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAjaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableAjaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
