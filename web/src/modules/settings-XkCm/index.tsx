import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider, Button, Modal, Card } from '@ones-design/core'
import { lifecycle, OPProvider } from '@ones-op/bridge'

import { OPFetch } from '@ones-op/fetch'

// import { useTeamInfo } from '@ones-op/store'
// import { useProps } from '@ones-op/sdk'

import './index.css'

const fetchProject = OPFetch.create({ baseURL: '/project/api/project' })

const HelloUserView = () => {
  const [visible, setVisible] = useState(false)
  // const {uuid, name} = useTeamInfo()
  // const props = useProps('ones:global:actions')

  // console.log('useProps', props)

  const [useInfo, setUserInfo] = useState()
  const handleClick = () => {
    // 在插件前端页面请求 ONES 接口
    fetchProject('/users/me').then((response) => {
      setUserInfo(response.data.name)
      setVisible(true)
    })
    console.log('globalThis: ', { ...globalThis })
  }

  const handleCancel = () => {
    console.log('handleCancel')
    setVisible(false)
  }

  const handleMaximizeChange = () => {
    console.log('handleMaximizeChange')
    // setVisible(false)
  }
  const handleOk = () => {
    console.log('handleOk')
    setVisible(false)
  }

  return (
    <Card title="hello view">
      <Button onClick={handleClick} type="primary">
        Hello world
      </Button>
      <Modal
        visible={visible}
        // onBack={handlBack}
        onCancel={handleCancel}
        onMaximizeChange={handleMaximizeChange}
        onOk={handleOk}
        title="Modal 对话框"
        footer={null}
      >
        {`Hello ${useInfo}`}
      </Modal>
    </Card>
  )
}

ReactDOM.render(
  <ConfigProvider>
    <OPProvider>
      <HelloUserView />
    </OPProvider>
  </ConfigProvider>,
  document.getElementById('ones-mf-root')
)

lifecycle.onDestroy(() => {
  ReactDOM.unmountComponentAtNode(document.getElementById('ones-mf-root'))
})
