import React from 'react'
import { Row, Col, Table } from 'antd'
import { connect } from 'react-redux'


class Operations extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  getColumns() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columns = [
      {
        title: 'Name',
        dataIndex: 'desc',
        key: 'desc',
        sorter: (a, b) => a.desc.length - b.desc.length,
        sortOrder: sortedInfo.columnKey === 'desc' && sortedInfo.order,
      },
      { title: 'App Name', dataIndex: 'appName', key: 'appName' },
      { title: 'Client', dataIndex: 'client', key: 'client' },
      {
        title: 'Active',
        dataIndex: 'active',
        key: 'active',
        render: text => {
          if (text === false) {
            return 'Nope'
          }
          else {
            return 'Yep'
          }
        },
      },
    ]

    return columns
  }

  render() {
    const columns = this.getColumns()

    return (
      <div>
        <Row>
          <Col span={24}>
            <Table
              style={{ background: '#fff' }}
              dataSource={this.props.operations}
              columns={columns}
              pagination={{ pageSize: 50 }}
              size="small"
              onChange={this.handleChange}
              rowKey={record => record.threadId}
              expandedRowRender={record => <p>{record.desc}</p>}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    operations: store.operations
  }
}

export default connect(mapStateToProps)(Operations)
