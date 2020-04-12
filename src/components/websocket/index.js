/**
 * 参数：[socketOpen|socketClose|socketMessage|socketError] = func，[socket连接成功时触发|连接关闭|发送消息|连接错误]
 * timeout：连接超时时间
 * @type {module.webSocket}
 */
module.exports = class webSocket {
  constructor(param = {}) {
    this.param = param;
    this.reconnectCount = 0;
    this.socket = null;
    this.taskRemindInterval = null;
    this.isSucces = false;
    this.eventListeners = new Array();
  }
  addEventListener = (listener) => {
    console.log(this.eventListeners);
    this.eventListeners.concat(listener);
  }
  connection = (times, delay) => {
    //使用promise封装一下
    return new Promise((resolve, reject) => {

      let _private = this;
      console.log('_private')
      console.log(_private.param)
      let { socketUrl, timeout = 0 } = _private.param;
      if ('WebSocket' in window) {
        console.log('WebSocket');
        _private.socket = new WebSocket(socketUrl);
      }     

      
      _private.onopen = () => {
        console.log('open')
        console.log(_private.param)
        let { socketOpen } = _private.param;
        _private.isSucces = true;
        socketOpen && socketOpen();
        resolve(true);
      };

      // 后端向前端推得数据
      _private.onmessage = (msg) => {
        let { socketMessage } = _private.param;
        socketMessage && socketMessage(msg);

        //TODO 事件监听器处理事件 消息 心跳包等
        let listeners = _private.eventListeners;
        listeners.forEach((listener) => {
          listener.invoke(msg);
        });
      };
      // 关闭连接触发
      _private.onclose = (e) => {
        _private.isSucces = false;
        _private.socket.close();
        let { socketClose } = _private.param;
        socketClose && socketClose(e);
      };
      _private.onerror = (e) => {
        // socket连接报错触发
        let { socketError } = _private.param;
        _private.socket = null;
        socketError && socketError(e);
      };
      
      _private.closeSocket = () => {
        _private.socket.close();
      };
      //获得状态
      _private.readyState = () => {
        return _private.socket.readyState;
      }

      _private.socket.onopen = _private.onopen;
      _private.socket.onmessage = _private.onmessage;
      _private.socket.onclose = _private.onclose;
      _private.socket.onerror = _private.onerror;
      _private.socket.sendMessage = _private.sendMessage;
      _private.socket.closeSocket = _private.closeSocket;
  
    })



  };
  sendMessage = (value) => {
    // 向后端发送数据
    if (this.socket) {
      this.socket.send(value);
    }
  };

 
};