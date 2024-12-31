import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableUserManageComponent } from './table-user-manage.component';

describe('TableUserManageComponent', () => {
  let component: TableUserManageComponent;
  let fixture: ComponentFixture<TableUserManageComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableUserManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableUserManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
