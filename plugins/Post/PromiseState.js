class PromiseState {
  constructor() {
    this.o = false; // 执行成功 ok 标志, promise resolved
    this.m = ''; // message 调用结果说明，通常出错时给出
    this.d = {}; // data 调用结果响应，初始化为空对象
    this.s = 0; // sequence 第几次调用
    this.b = undefined; // begin time
    this.f = undefined; // finish time
    this.t = ''; // type
    this.u = ''; // url, path
    this.r = {}; // request
  }

  bind(promise, {
    t,
    u,
    r,
  } = {}) { // 绑定 promise
    const ts = this;
    ts.t = 'promise';
    ts.o = false;
    ts.b = new Date();
    ts.s += 1;
    ts.m = '';
    ts.d = {};
    if (t)(ts.t = t);// 记录下调用类型，路径，参数
    if (u)(ts.u = u);
    if (r)(ts.r = r);

    promise.then((v) => {
      ts.o = true;
      ts.d = v.data;
      ts.m = '';
      ts.f = new Date();
    }).catch((e) => {
      ts.o = false;
      ts.m = e.toString();
      ts.f = new Date();
    });

    return promise;
  }
}
export default PromiseState;
