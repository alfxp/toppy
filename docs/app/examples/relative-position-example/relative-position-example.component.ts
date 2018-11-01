import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OutsidePlacement, RelativePosition, Toppy, ToppyRef } from 'toppy';

@Component({
  selector: 'app-relative-position-example',
  templateUrl: './relative-position-example.component.html',
  styles: []
})
export class RelativePositionExampleComponent implements OnInit {
  @ViewChild('targetEl', { read: ElementRef })
  targetEl: ElementRef;
  @ViewChild('content', { read: TemplateRef })
  content: TemplateRef<any>;
  placements: { name: string; value: OutsidePlacement }[] = [
    { name: 'Bottom', value: OutsidePlacement.BOTTOM },
    { name: 'Bottom left', value: OutsidePlacement.BOTTOM_LEFT },
    { name: 'Bottom right', value: OutsidePlacement.BOTTOM_RIGHT },
    { name: 'Left', value: OutsidePlacement.LEFT },
    { name: 'Left bottom', value: OutsidePlacement.LEFT_BOTTOM },
    { name: 'Left top', value: OutsidePlacement.LEFT_TOP },
    { name: 'Right', value: OutsidePlacement.RIGHT },
    { name: 'Right bottom', value: OutsidePlacement.RIGHT_BOTTOM },
    { name: 'Right top', value: OutsidePlacement.RIGHT_TOP },
    { name: 'Top', value: OutsidePlacement.TOP },
    { name: 'Top left', value: OutsidePlacement.TOP_LEFT },
    { name: 'Top right', value: OutsidePlacement.TOP_RIGHT }
  ];
  selectedPlacement = null;
  private _toppyRef: ToppyRef;
  destroy$ = new Subject();
  constructor(private toppy: Toppy) {}

  ngOnInit() {}

  onOptionChange() {
    console.log('option changed');
    this.destroy$.next('');
    if (this._toppyRef) {
      this._toppyRef.close();
    }
    this._toppyRef = this.toppy
      .overlay(
        new RelativePosition({
          placement: this.selectedPlacement,
          src: this.targetEl.nativeElement,
          hostWidth: 'auto',
          autoUpdate: true
        })
      )
      .host(this.content)
      // .textContent('lokesh__')
      // .htmlContent(`Hello <b>Lokesh</b>!`)
      .create();
    this._toppyRef.open();
    this._toppyRef
      .events()
      .pipe(takeUntil(this.destroy$))
      .subscribe(a => {
        console.log('events=>', a);
      });
  }
}