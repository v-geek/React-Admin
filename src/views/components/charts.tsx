import React, { useEffect, useRef } from 'react'
import { Divider, FormProps } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

const App: React.FC = () => {
  const testRef = useRef()

  useEffect(() => {
    console.log('testRef', testRef)
  }, [])

  return (
    <div className="h-[600px] overflow-y-scroll" style={{ border: '1px solid red' }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <div>12135555</div>

        <div ref={testRef}>
          {Array(100)
            .fill('')
            .map((item, index) => (
              <div key={index + Math.random()}>{index}</div>
            ))}
        </div>
      </Form>
    </div>
  )
}

export default App
