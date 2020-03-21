import React from 'react';
import { Button,Form,Input,Checkbox } from 'antd';

import './Login.css'
const electron = window.require('electron')
const {ipcRenderer} = electron;



const layout = {
  wrapperCol: {  },
};
const tailLayout = {
  wrapperCol: {  },
};


class LoginForm extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      form: {
        mihao : "",
        password : ""
      }
    }

  }

  onFinish = values => {
    console.log('Success:', values);
    ipcRenderer.send('login');
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };


  render(){
    return (
      <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={this.onFinish}
      onFinishFailed={this.onFinishFailed}
    >
      <Form.Item
        
        name="username"
        rules={[{ required: true, message: '请输入账号!' }]}
      >
        <Input placeholder="请输入账号"/>
      </Form.Item>

      <Form.Item
        
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input.Password placeholder="请输入密码"/>
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

class TitleButon extends React.Component{

  closeClickHandle(){
    ipcRenderer.send('closed');
  }

  minimizeClickHandle(){
    ipcRenderer.send('min');
  }
  render(){
    return (<div className="site-button-ghost-wrapper"> 
    <Button type="link" ghost onClick={()=>this.minimizeClickHandle()}>
      -
    </Button>
    <Button type="link" ghost onClick={()=>this.closeClickHandle()}>
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
            <TitleButon/>
        </div>
      </div>
      <div class="form">
        <LoginForm/>
      </div>
    </div>
  );
}

export default Login;
