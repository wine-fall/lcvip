// 原题不是会员题，这是根据原题的一个扩展：自己实现一个 async await， 思路类似
function foo(num) {
    // console.log(num);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(num * 2);
      }, 1000);
    })
}
  
function* gen() {
    const num1 = yield foo(1);
    const num2 = yield foo(num1);
    const num3 = yield foo(num2);
    return num3;
}

/**
 * 
 * @param {GeneratorFunction} gen 
 */
const createAsync = (gen) => {
    const g = gen();
    return new Promise((resolve) => {
        const loop = (val) => {
            const {value, done} = g.next(val);
            if (done) {
                resolve(value);
            } else {
                value.then((val) => {
                    loop(val);
                })
            }
        }
        loop();
    })
}

const asyncFn = createAsync(gen);
