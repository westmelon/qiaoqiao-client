import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import axios from '../components/axios/axios';
import QiaoqiaoConst from '../components/constant/QiaoqiaoConst';
import websocketClient from "../components/websocket/websocketClient.js";
import qiaoqiaohua from "../protobuf/qiaoqiaohua";
import './MainPage.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: "ws://127.0.0.1:8800/ws",
            token: "",
            socket: null
        }
    }

    //组件渲染完成
    componentDidMount() {
        //初始化
        this.init();


    }


    async init() {
        //TODO 转移到登录页面处理
        //获取token
        try{
            const data = await this.getUserToken();
            console.log(data)
            this.state.token = data.token;
            //开启websocket通道
            this.getSocketConnection();

            //获取好友列表
            this.getFriendList();
            //获取系统参数
            this.getSystemConfig();
        }catch(error){
            console.log(error);
        }


    }

    async getSocketConnection() {
        let url = this.state.url;
        let instance = websocketClient.getInstance();
        instance.createClient(url);
        //当连接失败如何重试
        this.socket = await instance.getClient();
        this.shankeHandWithSocket();



        //挂载各类监听器
        // instance.addEventListener(this.ppEvent);
    }

    //发送握手请求
    shankeHandWithSocket() {
        var param = qiaoqiaohua.Model.create();
        param.cmd = QiaoqiaoConst.Command.CONNECT;
        param.msgType = QiaoqiaoConst.MessageType.SEND;
        param.timestamp = new Date().getTime();
        param.sender = 'tutu'; //todo
        // param.receiver = this.state.receiver;
        param.token = this.state.token;
        console.log('shake hands......')
        console.log(param)
        console.log(this.socket)
        var buf = qiaoqiaohua.Model.encode(param).finish();
        this.socket.sendMessage(buf);
    }

    async getUserToken() {
            var url = "http://127.0.0.1:8080/auth/token";
            const result = await axios.post(url, "");
            return result;

    }

    //获取好友列表
    async getFriendList() {
        console.log("获取好友列表！")
    }
    //获取系统参数
    async getSystemConfig() {
        console.log("获取系统参数")
    }

    render() {
        return (
            <SiderDemo />
        );
    }
}

class SiderDemo extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={true} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <PieChartOutlined />
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <DesktopOutlined />
                            <span>Option 2</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <UserOutlined />
                                    <span>User</span>
                                </span>
                            }
                        >
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <TeamOutlined />
                                    <span>Team</span>
                                </span>
                            }
                        >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9">
                            <FileOutlined />
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout className="site-layout" >
                    <Layout className="list-layout" >这里是好友列表</Layout>
                    <Layout className="chat-layout"><Content style={{ margin: '0 16px' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            这里是聊天框
            </div>
                    </Content></Layout>


                </Layout>
            </Layout>
        );
    }
}

function MainPage() {
    return (
        <Main />
    );
}


export default MainPage;