import React, { Component } from 'react'
import { Link, Route, Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Layout, Menu, Icon, Row, Col, Card, Tag } from 'antd'
import ReplicaMembers from './screens/ReplicaMembers'
import { TransitionGroup } from 'react-transition-group'
import Operations from './screens/Operations'
import Databases from './screens/DBExplorer'
import { connect } from 'react-redux'
import Collections from './screens/Collections'

const { Header, Content, Footer, Sider } = Layout

const history = createBrowserHistory()


class Main extends Component {
  renderStatusTag() {
    const { status } = this.props.socket
    if (status === 'connected') {
      return <Tag color="green">connected</Tag>
    }
    else if (status === 'connecting') {
      return <Tag color='yellow'>connecting</Tag>
    }
    else if (status === 'disconnected') {
      return <Tag color='red'>disconnected</Tag>
    }
    else {
      return <Tag color='grey'>unknown</Tag>
    }
  }

  render() {
    return (
      <div className='App'>
        <Router history={history}>
          <Layout style={{height: '100%'}}>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type)
              }}
            >
              <div className="App-title">
                MongoStick
              </div>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                  <Link to="/operations"><Icon type="rocket" /> Operations</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/replica_set"><Icon type="appstore" /> Replica Set</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/databases"><Icon type="database" /> Databases</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0, textAlign: 'right' }}>
                {this.renderStatusTag()}
              </Header>
              <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, minHeight: 360 }}>

                  <Route render={({ location }) => (
                    <TransitionGroup>
                      <Route key='operations' exact path='/operations' component={Operations} />
                      <Route key='replicaMembers' exact path='/replica_set' component={ReplicaMembers} />
                      <Route key='databases' exact path='/databases' component={Databases}/>
                      <Route key='collections' path='/databases/:db_name' component={Collections}/>
                    </TransitionGroup>
                  )}
                  />


                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
              </Footer>

            </Layout>
          </Layout>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    socket: store.socket
  }
}

export default connect(mapStateToProps)(Main)
