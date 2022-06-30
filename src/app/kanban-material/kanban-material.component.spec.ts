import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanMaterialComponent } from './kanban-material.component';

describe('KanbanMaterialComponent', () => {
  let component: KanbanMaterialComponent;
  let fixture: ComponentFixture<KanbanMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
