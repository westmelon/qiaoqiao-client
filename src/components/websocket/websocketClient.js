import websocket from ".";
import qiaoqiaohua from "../../protobuf/qiaoqiaohua";
class websocketClient {
    constructor() {
        this.socket = null;
        
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new websocketClient();
        }
        return this.instance;
    }

    createClient = (url) => {
        if (!this.socket) {
            this.socket = new websocket({
                socketUrl: url,
                socketMessage: (event) => {
                    var result = event.data;  //blob对象
                    var reader = new FileReader();
                    reader.readAsArrayBuffer(result);
                    reader.onload = function (e) {
                        var buf = new Uint8Array(reader.result);
                        var decode = qiaoqiaohua.Model.decode(buf, buf.length);
                        console.log(decode)
                    }                   

                },
                socketClose: (event) => {
                    console.info("关闭");
                },
                socketError: () => {
                    console.info("连接建立失败");
                },
                socketOpen: () => {
                    console.info("连接建立成功");
                }
            });
        }
    }

    getClient = async() => {
        if (this.socket.isSucces) {
            return this.socket;
        } else {
            try {
                await this.socket.connection();
            } catch (e) {
                // 捕获异常，防止js error
                console.log('连不上啊！！');
            }
        }
        return this.socket;
    }

    //判断客户端是否已连接

    //

    addEventListener = (method)=>{
        let listener = new EventListener(method);
        this.socket.addEventListener(listener);
    }

}


class EventListener {

    //回调方法
    constructor(fc){
        this.method = fc;
    }

    invoke = (data)=>{
        this.method(data);
    }


}
export default websocketClient;