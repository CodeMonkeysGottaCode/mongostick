import React from 'react'
import { Card, Col, Row } from 'antd'
import ReplicaMember from '../components/ReplicaMember'
import { connect } from 'react-redux'
import DataRow from '../components/DataRow'


class ReplicaMembers extends React.Component {
  render() {
    const { replica_set } = this.props
    const { members, conf } = replica_set

    return (
      <div>
        <Row gutter={16}>
          <Col span={6}>
            <Card title={<strong>{conf.set}</strong>} className='text-center' bordered={false} style={{ border: '1px rgba(0, 0, 0, 0.65) solid' }}>
              <Row>
                <DataRow title='Replica Set' text={conf.set} />
                <DataRow title='Last Update' text={conf.date} />
                <DataRow title='Members' text={members.length} />
                <DataRow title='Heartbeat Interval' text={members.length} />
                <DataRow title='Heartbeat Timeout' text={`${conf.heartbeatTimeoutSecs}s`} />
                <DataRow title='Chaining Allowed' text={conf.chainingAllowed.toString()} />
                <DataRow title='Election Timeout' text={`${conf.electionTimeoutMillis}ms`} />
                <DataRow title='CatchUp Timeout' text={`${conf.catchUpTimeoutMillis}ms`} />
              </Row>
            </Card>
          </Col>
          <Col span={18}>
            <Row gutter={16}>
              {members.map((member, index) => (
                <Col span={8} key={index}>
                  <ReplicaMember member={member} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    replica_set: store.replica_set
  }
}

export default connect(mapStateToProps)(ReplicaMembers)
