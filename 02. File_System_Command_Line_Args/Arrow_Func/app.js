// 숫자 하나를 받아서 그 숫자를 제곱하는 일반적인 함수
const square = function (x) {
  return x * x;
};

// Arrow Function Version #1 - return 키워드 O
const arrow_square_ver1 = (x) => {
  return x * x;
};

// Arrow Function Version #2 - return 키워드 X
const arrow_square_ver2 = (x) => x * x;

// Object의 Method를 정의
const event_ver1 = {
  name: "Testcase",
  printName: function () {
    console.log("Test Name for " + this.name);
  },
};

/* 
 Object의 Method를 정의할 때 Arrow Function 사용
 event_ver2.printName() 실행시
 Test Name for undefined 출력
 object에서 method를 정의할 때는 다음과 같이 Arrow Function이 아닌
 일반 함수형태로 사용해야 같은 object내의 다른 property의 값을 가져올 수 있다.
*/
const event_ver2 = {
  name: "Testcase",
  printName: () => {
    console.log("Test Name for " + this.name);
  },
};

/*
object에서 method를 정의할 때는 다음과 같이 Arrow Function이 아닌 
일반 함수형태로 사용해야 같은 object내의 다른 property의 값을 가져올 수 있다.
*/
const event_ver3 = {
  name: "Testcase",
  printName() {
    console.log("Test Name for " + this.name);
  },
};

/*
event_ver4.printName() 함수 출력시, 다음과 같이 출력된다.
one is attending undefined
two is attending undefined
three is attending undefined

이유는, this의 scope이 forEach 함수 안에 국한되기 때문이다.
*/
const event_ver4 = {
  name: "Testcase",
  guestList: ["one", "two", "three"],
  printName() {
    console.log("Test Name for " + this.name);
    this.guestList.forEach(function (guest) {
      console.log(guest + " is attending " + this.name);
    });
  },
};

/*
위 문제를 바로잡기 위해서 Arrow Function을 사용하면 
this의 scope이 printName 함수까지 적용되어 
정상적으로 this.name을 인식하는 것을 확인할 수 있습니다.
*/
const event_ver5 = {
  name: "Testcase",
  guestList: ["one", "two", "three"],
  printName() {
    console.log("Test Name for " + this.name);
    this.guestList.forEach((guest) => {
      console.log(guest + " is attending " + this.name);
    });
  },
};

/* 
Tasks Objects에서 method를 정의하면서 Arrow Function을 사용하는 방법
method를 정의할때는 Arrow Function을 사용하지 않는다.
*/
const tasks_ver1 = {
  tasks: [
    {
      text: "One",
      completed: true,
    },
    {
      text: "Two",
      completed: true,
    },
    {
      text: "Three",
      completed: true,
    },
  ],
  getTaskTodo: function () {
    const tasksToDo = this.tasks.filter((task) => {
      return task.completed === false;
    });
    return tasksToDo;
  },
};

const tasks_ver2 = {
  tasks: [
    {
      text: "One",
      completed: true,
    },
    {
      text: "Two",
      completed: true,
    },
    {
      text: "Three",
      completed: true,
    },
  ],
  getTaskTodo() {
    const tasksToDo = this.tasks.filter((task) => {
      return task.completed === false;
    });
    return tasksToDo;
  },
};

/* 
method를 정의하는 것은 Arrow Function을 사용하지 못하지만,
그 내부에서 Arrow Function을 사용하는 것이 가능하다.
그래서 위 코드를 다음과 같이 Arrow Function을 이용해서
축약해 사용할 수 있다.
*/
const tasks_ver3 = {
  tasks: [
    {
      text: "One",
      completed: true,
    },
    {
      text: "Two",
      completed: true,
    },
    {
      text: "Three",
      completed: true,
    },
  ],
  getTaskTodo() {
    return this.tasks.filter((task) => task.completed === false);
  },
};
