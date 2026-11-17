import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, inject, booleanAttribute, EventEmitter, Output } from '@angular/core';
import { reflectAttributeInputs } from '../shared/attribute-inputs';

/** Angular bindings for displaying and highlighting source code. */
@Directive({
  selector: 'wa-code-highlighter',
  standalone: true,
  host: {
    '[style.--comment-color]': 'commentColor',
    '[style.--keyword-color]': 'keywordColor',
    '[style.--operator-color]': 'operatorColor',
    '[style.--string-color]': 'stringColor',
    '[style.--constant-color]': 'constantColor',
    '[style.--function-color]': 'functionColor',
    '[style.--type-color]': 'typeColor',
    '[style.--variable-color]': 'variableColor',
    '[style.--property-color]': 'propertyColor',
    '[style.--tag-color]': 'tagColor',
    '[style.--selector-color]': 'selectorColor',
    '[style.--inserted-color]': 'insertedColor',
    '[style.--deleted-color]': 'deletedColor',
    '(wa-load)': 'forward($event, waLoad)',
    '(wa-error)': 'forward($event, waError)'
  }
})
export class WaCodeHighlighterDirective implements OnChanges {
  @Input() language?: string;
  @Input() label?: string;
  @Input({ transform: booleanAttribute }) withoutCopy = false;
  @Input({ transform: booleanAttribute }) withoutDedent = false;
  @Input({ transform: booleanAttribute }) wrap = false;
  @Input() code?: string | null;
  @Input() commentColor?: string;
  @Input() keywordColor?: string;
  @Input() operatorColor?: string;
  @Input() stringColor?: string;
  @Input() constantColor?: string;
  @Input() functionColor?: string;
  @Input() typeColor?: string;
  @Input() variableColor?: string;
  @Input() propertyColor?: string;
  @Input() tagColor?: string;
  @Input() selectorColor?: string;
  @Input() insertedColor?: string;
  @Input() deletedColor?: string;

  @Output() waLoad = new EventEmitter<Event>();
  @Output() waError = new EventEmitter<Event>();
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    reflectAttributeInputs(this.renderer, this.nativeElement, changes, [
      'language', 'label', 'withoutCopy', 'withoutDedent', 'wrap'
    ]);
    if (changes['code']) this.renderer.setProperty(this.nativeElement, 'code', this.code ?? '');
  }

  forward<T extends Event>(event: T, output: EventEmitter<T>): void {
    if (event.target === this.nativeElement) output.emit(event);
  }
}
