import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Injector, Input, OnDestroy, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { BehaviorSubject, Subject, filter, fromEvent, take, takeUntil } from 'rxjs';
import { FormOption } from '../../models';

@Component({
  selector: 'app-auto-filter',
  templateUrl: './auto-filter.component.html',
  styleUrls: ['./auto-filter.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoFilterComponent),
      multi: true
    }
  ]
})
export class AutoFilterComponent<T = any> implements AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input()
  public placeholder: string = '';
  
  @Input({ required: true })
  public valueKey!: string;

  @Input({ required: true })
  public options!: FormOption[]; 
  
  @ViewChild('Search')
  public inputElementRef!: ElementRef<HTMLInputElement>;

  @ViewChild('Results')
  public resultsElementRef!: ElementRef<HTMLUListElement>;

  public control!: FormControl;
  public inputControl = new FormControl<string>('');
  public readonly ready$ = new BehaviorSubject<boolean>(false);
  private readonly destroyed$ = new Subject<void>();

  constructor(
    private injector: Injector,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.ready$.pipe(
      filter(ready => !!ready),
      take(1)
    ).subscribe(() => this.listenDOMEvents)
  }

  public ngAfterViewInit(): void {
    if (!this.control) {
      try {
        const ngControl = this.injector.get<NgControl>(NgControl, undefined);

        if (ngControl && ngControl.control) {
          this.control = ngControl.control as FormControl<T>;
        } else {
          this.control = new FormControl();
        }
      }
      catch (err) {
        this.control = new FormControl();
      }
    }

    this.ready$.next(true);
    this.changeDetectorRef.detectChanges();
    this.listenDOMEvents();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public writeValue(value: any): void { }

  public registerOnChange(fn: any): void { }

  public registerOnTouched(fn: any): void { }

  public optionSelected(option: FormOption, event: MouseEvent): void {
    if (!!event && event instanceof MouseEvent && event.button !== 0) {
      return;
    }

    this.control.setValue(option[this.valueKey as keyof FormOption]);
    this.inputControl.setValue(option.label);
  }

  private listenDOMEvents(): void {
    const events = [
      {
        name: 'focus',
        callback: () => {
          this.resultsElementRef.nativeElement.hidden = false;
        }
      },
      {
        name: 'blur',
        callback: () => {
          this.resultsElementRef.nativeElement.hidden = true;
        }
      }
    ];

    events.forEach(event => this.addEventListener(event.name, event.callback));
  }

  private addEventListener(name: string, callback: (...args: any) => void): void {
    fromEvent(this.inputElementRef.nativeElement, name).pipe(
      takeUntil(this.destroyed$)
    ).subscribe(callback);
  }
}
