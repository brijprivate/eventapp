import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactpickerPage } from './contactpicker.page';

describe('ContactpickerPage', () => {
  let component: ContactpickerPage;
  let fixture: ComponentFixture<ContactpickerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactpickerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactpickerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
