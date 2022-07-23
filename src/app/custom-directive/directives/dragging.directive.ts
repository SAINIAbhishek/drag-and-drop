import {AfterViewInit, ContentChild, Directive, ElementRef, Inject, Input, OnDestroy} from '@angular/core';
import {fromEvent, Subject, takeUntil} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {DraggingHandleDirective} from "./dragging-handle.directive";

@Directive({
  selector: '[appDragging]'
})
export class DraggingDirective implements AfterViewInit, OnDestroy {

  get handle(): DraggingHandleDirective {
    return this._handle;
  }

  get element(): HTMLElement {
    return this._element;
  }

  private readonly _DEFAULT_DRAGGING_BOUNDARY_QUERY = "body";

  @Input() boundaryQuery = this._DEFAULT_DRAGGING_BOUNDARY_QUERY;

  @ContentChild(DraggingHandleDirective) private _handle: DraggingHandleDirective = <DraggingHandleDirective>{};

  private _element: HTMLElement = <HTMLElement>{};

  private _unSubscribe: Subject<any> = new Subject<any>();

  private _handleElement: HTMLElement = <HTMLElement>{};

  private _draggingBoundaryElement: HTMLElement | HTMLBodyElement = <HTMLElement | HTMLBodyElement>{};

  constructor(@Inject(DOCUMENT) private document: Document,
              private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    this._draggingBoundaryElement = (this.document as Document)
      .querySelector(this.boundaryQuery) as HTMLElement | HTMLBodyElement;

    if (!this._draggingBoundaryElement) {
      throw new Error(
        "Couldn't find any element with query: " + this.boundaryQuery
      );
    } else {
      this._element = this.elementRef.nativeElement as HTMLElement;
      this._handleElement = this._handle?.elementRef?.nativeElement || this._element;
      this.initDrag();
    }
  }

  ngOnDestroy(): void {
    this._unSubscribe.complete();
  }

  initDrag(): void {
    const minBoundX = this._draggingBoundaryElement.offsetLeft;
    const minBoundY = this._draggingBoundaryElement.offsetTop;
    const maxBoundX = minBoundX + this._draggingBoundaryElement.offsetWidth - this._element.offsetWidth;
    const maxBoundY = minBoundY + this._draggingBoundaryElement.offsetHeight - this._element.offsetHeight;

    const dragStart$ = fromEvent<MouseEvent>(this._handleElement, "mousedown");
    const dragEnd$ = fromEvent<MouseEvent>(this.document, "mouseup");
    const drag$ = fromEvent<MouseEvent>(this.document, "mousemove").pipe(takeUntil(dragEnd$));

    let initialX: number, initialY: number, currentX = 0, currentY = 0;

    dragStart$.pipe(takeUntil(this._unSubscribe)).subscribe((event: MouseEvent) => {
      initialX = event.clientX - currentX;
      initialY = event.clientY - currentY;
      console.log(event)
      this._element.classList.add('dragging');

      drag$.pipe(takeUntil(this._unSubscribe)).subscribe((event: MouseEvent) => {
        event.preventDefault();

        const x = event.clientX - initialX;
        const y = event.clientY - initialY;

        currentX = Math.max(minBoundX, Math.min(x, maxBoundX));
        currentY = Math.max(minBoundY, Math.min(y, maxBoundY));

        this._element.style.transform =
          "translate3d(" + currentX + "px, " + currentY + "px, 0)";
      });
    });

    dragEnd$.pipe(takeUntil(this._unSubscribe)).subscribe(() => {
      initialX = currentX;
      initialY = currentY;
      this._element.classList.remove('dragging');
    });
  }

}
