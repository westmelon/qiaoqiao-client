import React from 'react';
import { Button,Layout } from 'element-react';
import 'element-theme-default';

function Login() {
  return (
    <div>
      <Layout.Row>
        <Layout.Col span="24"><div className="grid-content bg-purple-dark"></div></Layout.Col>
      </Layout.Row>
      <Layout.Row>
        <Layout.Col span="12"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="12"><div className="grid-content bg-purple-light"></div></Layout.Col>
      </Layout.Row>
      <Layout.Row>
        <Layout.Col span="8"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="8"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="8"><div className="grid-content bg-purple"></div></Layout.Col>
      </Layout.Row>
      <Layout.Row>
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="6"><div className="grid-content bg-purple-light"></div></Layout.Col>
      </Layout.Row>
      <Layout.Row>
        <Layout.Col span="4"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple-light"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple"></div></Layout.Col>
        <Layout.Col span="4"><div className="grid-content bg-purple-light"></div></Layout.Col>
      </Layout.Row>
    </div>
  );
}

export default Login;
