import React from 'react'
import { Col, Row, Table } from 'antd'
import { connect } from 'react-redux'
import { formatBytes } from '../lib/mongodb'


class Collections extends React.Component {
  getColumns = () => {
    return [
      {
        title: 'Name',
        dataIndex: 'ns',
        key: 'ns',
      },
      {
        title: 'storageSize',
        dataIndex: 'storageSize',
        key:'storageSize',
        render: text => formatBytes(text),
        sorter: (a, b) => a.storageSize - b.storageSize,
      },
      {
        title:'Size',
        dataIndex: 'size',
        key:'size',
        render: text => formatBytes(text),
        sorter: (a, b) => a.size - b.size,
      },
      {
        title:'count',
        dataIndex: 'count',
        key:'count',
        render: text => text.toLocaleString(),
        sorter: (a, b) => a.count - b.count,
      },
      {
        title:'totalIndexSize',
        dataIndex: 'totalIndexSize',
        key:'totalIndexSize',
        render: text => formatBytes(text),
        sorter: (a, b) => a.totalIndexSize - b.totalIndexSize,
      },
      {
        title:'nIndexes',
        dataIndex: 'nIndexes',
        key:'nIndexes',
      },
      {
        title:'avgObjSize',
        dataIndex: 'avgObjSize',
        key:'avgObjSize',
        render: text => formatBytes(text),
        sorter: (a, b) => a.avgObjSize - b.avgObjSize,
      },
      {
        title:'capped',
        dataIndex: 'capped',
        key:'capped',
        render: text => text.toString(),
      },
    ]
  }

  getDataSource = () => {
    const { databases } = this.props
    const { db_name } = this.props.match.params

    const database = databases[db_name]

    if (database === undefined) {
      return []
    }

    return Object.keys(database.collections).map((index) => database.collections[index])
  }

  render() {
    return (
      <div>
        {this.props.children}
        <Row style={{ background: '#fff' }}>
          <Col span={24}>
            <Table
              dataSource={this.getDataSource()}
              columns={this.getColumns()}
              rowKey={record => record.ns}
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

export default connect(mapStateToProps)(Collections)
