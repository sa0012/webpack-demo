function selfApply (context) {
  context = typeof context === 'object' ? context : window;
  let fn = Symbol(this);
  context[fn] = this;
  let args = [...arguments].slice(1);
  // 判断是否有第二个参数
  if (!args) {
    return context[fn]()
  }
  context[fn](args)
  delete context[fn];
}

Function.prototype.selfApply || (Object.defineProperty(Function.prototype, 'selfApply', {
  value: selfApply,
  enumerable: false,
  configurable: true,
  writable: true
}))

var obj = {
  name: '张三',
  age: 23,
  getName: function () {
    console.log(this.name, ...arguments)
  }
}

var person = {
  name: '李四',
  age: 24,
  getName: function () {
    console.log(this.name, ...arguments)
  }
}

console.log(obj.getName.selfApply(person, ['王五']))
