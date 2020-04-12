import React from 'react';
import { Button, Form, Input, Checkbox } from 'antd';
import axios from '../../components/axios/axios';
import './Login.css'

// const electron = window.require('electron')
// const {ipcRenderer} = electron;



const layout = {
  wrapperCol: {},
};
const tailLayout = {
  wrapperCol: {},
};


class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      form: {
        account: "",
        password: ""
      }
    }

  }

  handleChange(key, event) {
    this.setState({
      [key]: event.target.value
    })
  }

  onFinish = values => {
    console.log('Success:', values);
    //执行登录操作
    var param = {
      account: this.state.account,
      password: this.state.password,
    }
    var url = "http://127.0.0.1:8080/auth/login"
    axios.post(url, param)
      .then((data)=> {
        console.log(data);
      })
      .catch((error) =>{
        console.log(error);
      });

    //获取访问令牌

    //根据令牌开启websocket连接

    // ipcRenderer.send('login');
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };


  render() {
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          name="account"
          rules={[{ required: true, message: '请输入账号!' }]}
        >
          <Input placeholder="请输入账号" value={this.state.account} onChange={val => this.handleChange('account', val)} />
        </Form.Item>

        <Form.Item

          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password placeholder="请输入密码"  value={this.state.password} onChange={val => this.handleChange('password', val)} />
        </Form.Item>

        {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>记住我</Checkbox>
      </Form.Item> */}

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" block>
            登录
        </Button>
        </Form.Item>
      </Form>
    );
  }
}

class TitleButon extends React.Component {

  closeClickHandle() {
    // ipcRenderer.send('closed');
  }

  minimizeClickHandle() {
    // ipcRenderer.send('min');
  }
  render() {
    return (<div className="site-button-ghost-wrapper">
      <Button type="link" ghost onClick={() => this.minimizeClickHandle()}>
        -
    </Button>
      <Button type="link" ghost onClick={() => this.closeClickHandle()}>
        x
    </Button>
    </div>);
  }

}

function Login() {
  return (
    <div class="Login">
      <div class="header">
        <div class="titleButton">
          <TitleButon />
        </div>
      </div>
      <div class="form">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
