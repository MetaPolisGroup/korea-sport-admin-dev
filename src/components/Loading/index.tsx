import React from 'react'
import { Spin } from 'antd'
import type { SpinProps } from 'antd/es/spin'

const Loading: React.FC<SpinProps> = ({ ...props }) => <Spin size='large' style={{ display: 'flex', margin: '20px auto', justifyContent: 'center', alignItems: 'center' }} {...props} />

export default Loading