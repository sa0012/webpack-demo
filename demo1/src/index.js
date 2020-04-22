import './assets/style/reset.scss';
class Person {
  constructor (name, age) {
    this.name = name;
    this.age = age;
  }

  getName () {
    return this.name
  }
}

let boy = new Person('Tom', 23)
boy.getName()
