import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPagesCount]',
  standalone: true
})
export class PagesCountDirective {
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  @Input() set PagesCount(count : number) {
    this.viewContainerRef.clear();
    for (let i = 0; i < count; i++) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  } 
  constructor() { }

}
