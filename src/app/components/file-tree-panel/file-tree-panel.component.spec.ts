import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTreePanelComponent } from './file-tree-panel.component';

describe('FileTreePanelComponent', () => {
  let component: FileTreePanelComponent;
  let fixture: ComponentFixture<FileTreePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileTreePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTreePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
