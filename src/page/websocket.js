import React from 'react';
import { Button, Form, Input, Checkbox } from 'antd';
import websocketClient from "../components/websocket/websocketClient.js";
import qiaoqiaohua from "../protobuf/qiaoqiaohua";
// const socket = null;
console.log(websocketClient);
function OJBK() {
    return <WSFrame />
}


class WSFrame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: "ws://127.0.0.1:8800/ws",
            account:"",
            receiver:"",
            token:"",
            msg: "哈哈干就完事了 奥利给",
            
        }
    }

    handleConnectClick() {
        let url = this.state.url;
        let instance = websocketClient.getInstance();
        instance.createClient(url); 
        this.socket = instance.getClient();
        console.log(this.socket);

        instance.addEventListener(this.ppEvent);
    }

    ppEvent(msg){
        console.log('啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊');
    }


    handleSubmitClick() {
        console.log(this.state.msg);
        var param = qiaoqiaohua.Model.create();
        param.cmd = 5;
        param.msgType = 0;
        param.timestamp = 121242313;
        param.groupId = "";
        param.sender = this.state.account;
        param.receiver = this.state.receiver;
        param.token= this.state.token;
        console.log('send msg')
        console.log(param)
        var buf = qiaoqiaohua.Model.encode(param).finish();
        this.socket.sendMessage(buf);
    }

    handleLoginClick() {
        console.log(this.state.msg);
        //先试验一下登录吧= =
        var param = qiaoqiaohua.Model.create();
        param.cmd = 0;
        param.msgType = 0;
        param.timestamp = 121242313;
        param.groupId = "";
        param.sender = this.state.account;
        param.receiver = this.state.receiver;
        param.token= this.state.token;
        console.log('login......')
        console.log(param)
        var buf = qiaoqiaohua.Model.encode(param).finish();
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
    handleChange3(event) {
        this.setState({
            account: event.target.value
        })
    }
    handleChange4(event) {
        this.setState({
            token: event.target.value
        })
    }
    handleChange5(event) {
        this.setState({
            receiver: event.target.value
        })
    }
    render() {
        return (

            <div>
                <Input placeholder="输入ws地址" value={this.state.url} onChange={this.handleChange.bind(this)}></Input>
                <div>{this.state.url}</div>
                <Button type="primary" onClick={() => this.handleConnectClick()}>连接</Button>
                <Input placeholder="登录账号" value={this.state.account} onChange={this.handleChange3.bind(this)}></Input>
                <Input placeholder="token" value={this.state.token} onChange={this.handleChange4.bind(this)}></Input>
                <Button type="primary" onClick={() => this.handleLoginClick()}>登录</Button>
                
                <Input placeholder="选择要发送的内容" value={this.state.msg} onChange={this.handleChange2.bind(this)}></Input>
                <Input placeholder="发送给谁" value={this.state.receiver} onChange={this.handleChange5.bind(this)}></Input>
                <Button type="primary" onClick={() => this.handleSubmitClick()}>发送</Button>
            </div>
        );

    }

}

export default OJBK;