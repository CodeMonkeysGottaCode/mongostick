import React from 'react'
import { Tag } from 'antd'
import { stateColors, stateMap } from '../lib/mongodb'

export default (props) => {
  const { state } = props

  return <Tag color={stateColors[state]} style={{ marginRight: 0 }}>{stateMap[state]}</Tag>
}
