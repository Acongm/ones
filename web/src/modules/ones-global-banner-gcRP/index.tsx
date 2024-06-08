import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from '@ones-design/core'
import { lifecycle, OPProvider } from '@ones-op/bridge'
import { OPFetch } from '@ones-op/fetch'

const fetchProject = OPFetch.create({ baseURL: '/project/api/project' })

import './index.css'

const NoticeView = () => {
  const [info, setInfo] = useState()
  useEffect(() => {
    fetchProject('/helloAcong', { method: 'POST' }).then((response) => {
      console.log('hello: ', response.data)
      setInfo(response.data.data.noticeConfigKey)
    })
  }, [])

  return <div className="notice">{info}</div>
}

ReactDOM.render(
  <ConfigProvider>
    <OPProvider>
      <NoticeView />
    </OPProvider>
  </ConfigProvider>,
  document.getElementById('ones-mf-root')
)

lifecycle.onDestroy(() => {
  ReactDOM.unmountComponentAtNode(document.getElementById('ones-mf-root'))
})
