const timeoutPromise = (ms) => {
  return new Promise((res, rej) => {
    // waiting to seconds to resolve
    setTimeout(() => {
      res("yo");
    }, ms);
  });
};

let getNum = new Promise((resolve, reject) => {
  let num = Math.floor(Math.random() * 100);
  if (num % 2 == 0) {
    resolve({ number: num, message: "resolve data here" });
  } else {
    reject({ number: num, message: "reject data here" });
  }
});

const axiosMock = (url) => {
  return new Promise((resolve, reject) => {
    if (url !== "badurl") {
      resolve({ data: [{ x: 1 }, { x: 2 }], status: 200 });
    } else {
      reject({ data: "error", status: 500 });
    }
  });
};

const getData = async () => {
  try {
    let number = await getNum;
    console.log("Success");
    console.log(number);
  } catch (err) {
    console.log("Error occured");
    console.log(err);
  }
};

const getData1 = async () => {
  try {
    console.log("getData1 called");
    // this is going to pause for 2 seconds
    let x = await timeoutPromise(5000);
    console.log(x); // what is x going to be 'yo'
    let data = await axiosMock("badurl");
    console.log("Success");
    console.log(data);
  } catch (err) {
    console.log("Error occured");
    console.log(err);
  }
};

getData1();
