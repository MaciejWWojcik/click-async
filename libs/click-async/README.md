# click-async

Are you tired of subscribing and unsubscribing when calling a service that does some asynchronous action on click?
Use the **clickAsync**!

## How does it work

Let us imagine having a function in the component which you call on button click:

```ts
save(product: Product) {
    this.apiService.saveProduct(product)
        .pipe(
            takeUntil(this.onDestroy)
        ).subscribe(
            (response) => console.log('yaaay product saved')
        );
}
```

Remember to unsusbribe!

---

Now imagine a much more readable version of the function, which simply returns the Observable:

```ts
save(product: Product): Observable<Product> {
    return this.apiService.saveProduct(product).pipe(
        tap((response) => console.log('yaaay product saved'))
    );
}
```

Now the template. To call the function use the `clickAsync` output, available for you via the `ClickAsyncDirective`.

```html
<button [clickAsync]="save(product)">Save</button>
```

Lastly, don't forget to import the directive to your module:

```ts
@NgModule({
  imports: [ClickAsyncDirective],
})
export class SomeModule {}
```

Enjoy!
