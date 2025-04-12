本 Demo 演示一行文字的用法。

````jsx
import React, { Component } from 'react'
import { BalloonConfirm, Button } from 'fat-design';

class App extends Component {
  render() {
    return (
      <div>
        <BalloonConfirm trigger={<Button>确定</Button>}>是否确定删除订单呢？</BalloonConfirm>
      </div>
    )
  }
}

````
