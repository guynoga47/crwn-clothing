function* countAppleSales() {
  let saleList = [3, 7, 5];
  for (let i = 0; i < saleList.length; i++) {
    saleList[i] = yield saleList[i];
  }
  yield console.log(saleList);
}

let appleStore = countAppleSales(); // Generator { }
console.log(appleStore);
console.log(appleStore.next());
console.log(appleStore.next(7));
console.log(appleStore.next(5));
console.log(appleStore.next(3));
console.log(appleStore.next());

/* 
  Generator explanation:
  
  first we need to instantiate the generator, we do it by
  calling the function as we do in line 9.
  in order to actually run the generator we need to invoke
  the next method of the generator. what next does it running
  the function until the first yield and the value we get back
  is the value yielded. we can also send in next a value for 
  the generator, which will be assigned to the LAST yield command
  assignment operator. meaning, we can never invoke next with a value
  if it's our first next invocation on the generator, since we haven't
  yielded anything yet, so the value we pass doesn't have any "container"
  waiting to get it. */
