import React from 'react'
import { Card, Col, Row } from 'antd'
import moment from 'moment'
import DataRow from './DataRow'
import StateTag from './StateTag'

class ReplicaMember extends React.Component {
  render() {
    const { member } = this.props

    return (
      <Card title={member.name} bordered={true} extra={<StateTag state={member.state} />}>
        <DataRow title='Host' text={member.host} />
        <DataRow title='Priority' text={member.priority} />
        <DataRow title='Votes' text={member.votes} />
        <DataRow title='Build Indexes' text={member.buildIndexes.toString()} />
        <DataRow title='Arbiter Only' text={member.arbiterOnly.toString()} />
        <DataRow title='Uptime' text={moment.duration(member.uptime, 'seconds').humanize()} />
        <DataRow title='Health' text={member.health} />
        <DataRow title='State' text={member.state} />
        <DataRow title='Syncing To' text={member.syncingTo} />
        <DataRow title='pingMs' text={member.pingMs} />
        <DataRow title='Hidden' text={member.hidden.toString()} />
        <Row>
          <Col>
            <h3 style={{fontWeight: 'bold', marginTop: '5px'}}>Dates</h3>
          </Col>
        </Row>
        <DataRow title='Election Time' text={moment(member.electionTime).format()} />
        <DataRow title='Last Heartbeat' text={moment(member.lastHeartbeatRecv).format()} />
        <DataRow title='Optime Date' text={moment(member.optimeDate).format()} />
      </Card>
    )
  }
}

export default ReplicaMember
