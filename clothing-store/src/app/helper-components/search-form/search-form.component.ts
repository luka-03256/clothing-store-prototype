import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ClothesService } from 'src/app/services/clothes.service';
import { SharedService } from 'src/app/services/shared.service';
import { Clothes } from 'src/models/clothes.model';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
    @ViewChild('searchBox') searchBoxRef!: ElementRef;
  @ViewChild('searchResults') searchResultsRef!: ElementRef;

  term!: string;
  clothes$!: Observable<Clothes[]>;

  private searchTerms = new Subject<string>();

  // When ElementRef is injected this way in the constructor, Angular injects in the HTML native element that this component is drawn into, which is perfect for us because now we know in plain javascript/html, what our element is referenced as
  constructor(
    private clothesService: ClothesService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private elementRef: ElementRef
  ) {
    this.sharedService.pageComponentDestroyed.subscribe((data: any) => {
      if (data.value === 'searchComponent') {
        this.resetSearchBox();
      }

      this.blurSearchBox();
    });
  }

  ngOnInit(): void {
    this.clothes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.clothesService.searchClothes(term))
    );

    this.route.queryParams.subscribe((params) => {
      this.term = params['term'];
    });
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
    this.searchResultsRef.nativeElement.classList.remove('d-none');
  }

  // add a HostListener that listens for any document:click.
  @HostListener('document:click', ['$event.target'])
  public onPageClick(targetElement: any) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.blurSearchBox();
    }
  }

  handleOnSearchResultClick() {
    this.resetSearchBox();
    this.blurSearchBox();
  }

  handleKeydownEnterSubmit(e: Event) {
    e.preventDefault();

    this.term = this.searchBoxRef.nativeElement.value;

    this.router.navigate(['/search'], {
      queryParams: { term: this.term },
      queryParamsHandling: '',
    });
    this.sharedService.searchChanged.emit({ type: 'term', value: this.term });
    this.blurSearchBox();
  }

  handleSearchButtonClick() {
    this.term = this.searchBoxRef.nativeElement.value;

    this.router.navigate(['/search'], {
      queryParams: { term: this.term },
      queryParamsHandling: '',
    });
    this.sharedService.searchChanged.emit({ type: 'term', value: this.term });
    this.blurSearchBox();
  }

  blurSearchBox() {
    if (this.searchResultsRef.nativeElement) {
      this.searchResultsRef.nativeElement.classList.add('d-none');
    }
    if (this.searchBoxRef.nativeElement) {
      this.searchBoxRef.nativeElement.blur();
    }
  }

  resetSearchBox() {
    if (this.searchBoxRef.nativeElement) {
      this.searchBoxRef.nativeElement.value = '';
    }
  }

}
