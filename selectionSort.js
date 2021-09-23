let arr = [3, 0, 1];

const sort = (arr) => {
  for (let current = 0; current < arr.length; current++) {
    console.log(arr);
    // console.log(findLowestAndSwap(currentIndex));
    // gothrough find lowest and swap
    let lowest = arr[current];
    let lowestIndex = current;
    console.log("start at index ", current);
    console.log("start in lowest ", lowest);
    // find lowest element in the 'inner array'
    for (let innerIndex = current; innerIndex < arr.length; innerIndex++) {
      if (arr[innerIndex] < lowest) {
        console.log("mew lowest found", arr[innerIndex]);
        lowest = arr[innerIndex];
        lowestIndex = innerIndex;
      }
    }
    console.log("the actuall lowest", lowest);
    // swap
    let temp = arr[current];
    arr[current] = lowest;
    arr[lowestIndex] = temp;
  }
};

sort(arr);
