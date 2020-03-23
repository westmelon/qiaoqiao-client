import React from 'react';
import { Button, Form, Input, Checkbox } from 'antd';
import websocket from "../components/websocket";
import qiaoqiaohua from "../protobuf/qiaoqiaohua";
console.log(qiaoqiaohua)
const socket = null;

function OJBK() {
    return <WSFrame />
}


class WSFrame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: "111",
            msg: "111"
        }
    }

    handleConnectClick() {
        console.log(this.state.url);

        this.socket = new websocket({
            socketUrl: this.state.url,
            socketMessage: (msg) => {
                console.log(msg)
            },
            socketClose: (msg) => {
                console.info("关闭");
            },
            socketError: () => {
                console.info("连接建立失败");

            },
            socketOpen: () => {
                console.info("开始订单监控");
            }
        });
        try {
            this.socket.connection();
        } catch (e) {
            // 捕获异常，防止js error
            console.log(e);
        }
    }
    

    handleSubmitClick() {
        console.log(this.state.msg);
        console.log(qiaoqiaohua);
        var param = qiaoqiaohua.Model.create();
        param.cmd=0;
        console.log(param)
        var buf = qiaoqiaohua.Model.encode(param).finish();
        console.log(buf)
        this.socket.sendMessage(buf);
    }
    handleChange(event) {
        this.setState({
            url: event.target.value
        })
    }
    handleChange2(event) {
        this.setState({
            msg: event.target.value
        })
    }
    render() {
        return (

            <div>
                <Input placeholder="输入ws地址" value={this.state.url} onChange={this.handleChange.bind(this)}></Input>
                <div>{this.state.url}</div>
                <Button type="primary" onClick={() => this.handleConnectClick()}>连接</Button>

                <Input placeholder="选择要发送的内容" value={this.state.msg} onChange={this.handleChange2.bind(this)}></Input>
                <Button type="primary" onClick={() => this.handleSubmitClick()}>发送</Button>
            </div>
        );

    }

}

export default OJBK;