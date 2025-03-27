import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'discount',
  standalone: true,
})
export class DiscountPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: number, discount: number): any {
    const discountedPrice = value - value * (discount / 100);
    const html = `<div class="new-price">
     <span style="
        display: inline-block;
        background: transparent;
        color: var(--accent-color);
        font-size: var(--font-small);
        font-weight: 500;">
        $${discountedPrice.toFixed(2)}
      </span>   
      <span style="text-decoration: line-through; color: grey;
        font-size: var(--font-xx-small);
        font-weight: 300; ">
        $${value.toFixed(2)}
      </span>
      </div>`;

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
