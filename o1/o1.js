/**
 * 用 promise 实现红绿灯效果：
 * 红灯亮3s后换成绿灯亮3s，最后换成黄灯亮3s
 * 循环往复
 */

class RGYLoop {
    constructor(rt, gt, yt) {
        const red = () => {
            console.log('red');
        }
        const green = () => {
            console.log('green');
        }
        const yellow = () => {
            console.log('yellow');
        }
        this.lights = [red, green, yellow];
        this.times = [rt, gt, yt];
    }
    promiseWrap(fn, t) {
        return new Promise((res) => {
            fn();
            setTimeout(() => {
                res();
            }, t);
        });
    }
    run() {
        let p = Promise.resolve();
        for (let i = 0; i < 3; i++) {
            p = p.then(() => {
                return this.promiseWrap(this.lights[i], this.times[i]);
            });
        }
    }
    runAsync
}

var instance = new RGYLoop(3000, 3000, 3000);

instance.run();
