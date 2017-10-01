import React from 'react'
import { Col, Row } from 'antd'


export default (props) => {
  const { title, text } = props

  return (
    <Row>
      <Col span={10}>
        <strong>{title}:</strong>
      </Col>
      <Col span={14}>
        {text}
      </Col>
    </Row>
  )
}
