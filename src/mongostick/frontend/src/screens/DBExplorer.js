import React from 'react'
import { Col, Row, Table } from 'antd'
import { connect } from 'react-redux'
import { formatBytes } from '../lib/mongodb'
import { Link } from 'react-router-dom'


class Databases extends React.Component {
  getColumns = () => {
    return [
      {
        title: 'Name',
        dataIndex: 'stats.db',
        key: 'db',
        render: text => <Link to={`/databases/${text}`}>{text}</Link>
      },
      {
        title: 'Collections',
        dataIndex: 'stats.collections',
        key: 'collections',
        sorter: (a, b) => a.stats.collections - b.stats.collections,
      },
      {
        title: 'Storage Size',
        dataIndex: 'stats.storageSize',
        key: 'storageSize',
        render: text => formatBytes(text),
        sorter: (a, b) => a.stats.storageSize - b.stats.storageSize,
      },
      {
        title: 'Data Size',
        dataIndex: 'stats.dataSize',
        key: 'dataSize',
        render: text => formatBytes(text),
        sorter: (a, b) => a.stats.dataSize - b.stats.dataSize,
      },
      {
        title: 'AVG Obj Size',
        dataIndex: 'stats.avgObjSize',
        key: 'avgObjSize',
        render: text => formatBytes(text),
        sorter: (a, b) => a.stats.avgObjSize - b.stats.avgObjSize,
      },
      {
        title: 'objects',
        dataIndex: 'stats.objects',
        key: 'objects',
        render: text => text.toLocaleString(),
        sorter: (a, b) => a.stats.objects - b.stats.objects,
      },
      {
        title: 'Indexes',
        dataIndex: 'stats.indexes',
        key: 'indexes',
        sorter: (a, b) => a.stats.indexes - b.stats.indexes,
      },
      {
        title: 'Indexes',
        dataIndex: 'stats.indexSize',
        key: 'indexSize',
        render: text => formatBytes(text),
        sorter: (a, b) => a.stats.indexSize - b.stats.indexSize,
      },
    ]
  }

  getDataSource = () => {
    const { databases } = this.props

    return Object.keys(databases).map((index) => databases[index])
  }

  render() {
    return (
      <div>
        <Row style={{ background: '#fff' }}>
          <Col span={24}>
            <Table
              dataSource={this.getDataSource()}
              columns={this.getColumns()}
              rowKey={record => record.stats.db}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    databases: store.databases,
  }
}

export default connect(mapStateToProps)(Databases)
