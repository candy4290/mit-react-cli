import { useSafeState } from 'ahooks';
import {
  Button,
  Row,
  Col,
  Radio,
  Pagination,
  Divider,
  Tabs,
  DatePicker,
  Breadcrumb,
  Menu,
  Dropdown,
  Checkbox,
  Switch,
  Input,
  InputNumber,
  Select,
  List,
  Avatar,
  Collapse,
  Tag,
  Space,
  Table,
  Alert,
  message,
  Popconfirm,
  Popover,
  Modal,
  Progress,
} from 'antd';
import Block from '@components/block';
import './index.less';
import {
  HomeOutlined,
  UserOutlined,
  DownOutlined,
  SearchOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import {useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;
const { SubMenu } = Menu;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;

const text1 = <span>Title</span>;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const buttonWidth = 70;

function LightTheme() {
  const [btnSize, setBtnSize] = useSafeState();
  const [inputDisabled, setInputDisabled] = useSafeState();
  const [isModalVisible, setIsModalVisible] = useSafeState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log('light theme init');
    return () => {
      console.log('light theme destory');
    };
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function handleSizeChange(e) {
    setBtnSize(e.target.value);
  }

  function showTotal(total) {
    return `共 ${total} 条`;
  }

  const text = 'Are you sure to delete this task?';

  function confirm() {
    message.info('Clicked on Yes.');
  }

  return (
    <>
      {console.log('light theme 渲染')}
      <Button onClick={() => navigate('/demo2')}>跳转demo2</Button>
      <div className="page-content">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Block title="按钮">
              <Radio.Group value={btnSize} onChange={handleSizeChange}>
                <Radio.Button value="large">Large</Radio.Button>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
              </Radio.Group>

              <div style={{ display: 'flex', flexWrap: 'wrap' }} className="content">
                <Button type="primary" size={btnSize}>
                  Primary Button
                </Button>
                <Button type="primary" size={btnSize} danger>
                  Danger Primary
                </Button>
                <Button type="primary" size={btnSize} disabled>
                  Disabled Primary Button
                </Button>

                <Button size={btnSize}>Default Button</Button>
                <Button size={btnSize} danger>
                  Danger Default
                </Button>
                <Button size={btnSize} disabled>
                  Disabled Default Button
                </Button>

                <Button type="dashed" size={btnSize}>
                  Dashed Button
                </Button>
                <Button type="dashed" danger size={btnSize}>
                  Danger Dashed
                </Button>
                <Button type="dashed" size={btnSize} disabled>
                  Disabled Dashed Button
                </Button>

                <Button type="text" size={btnSize}>
                  Text Button
                </Button>
                <Button danger type="text" size={btnSize}>
                  Danger Text
                </Button>
                <Button type="text" size={btnSize} disabled>
                  Disabled Text Button
                </Button>

                <Button type="link" size={btnSize}>
                  Link Button
                </Button>
                <Button type="link" size={btnSize} danger>
                  Danger Link
                </Button>
                <Button type="link" size={btnSize} disabled>
                  Disabled Link Button
                </Button>

                <div className="site-button-ghost-wrapper">
                  <Button type="primary" ghost size={btnSize}>
                    Primary
                  </Button>
                  <Button ghost size={btnSize}>
                    Default
                  </Button>
                  <Button type="dashed" size={btnSize} ghost>
                    Dashed
                  </Button>
                  <Button type="primary" danger ghost size={btnSize}>
                    Danger
                  </Button>
                </div>
              </div>
            </Block>
          </Col>
          <Col span={8}>
            <Block title="分页器">
              <Divider plain>常规版</Divider>
              <Pagination defaultCurrent={1} total={50} />
              <Pagination defaultCurrent={6} total={500} />
              <Pagination showQuickJumper defaultCurrent={2} total={500} />

              <Divider plain>迷你版</Divider>
              <Pagination size="small" total={50} />
              <Pagination size="small" total={50} showSizeChanger showQuickJumper />
              <Pagination size="small" total={50} showTotal={showTotal} />
            </Block>
          </Col>
          <Col span={8}>
            <Block title="标签页">
              <Divider plain>常规版</Divider>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Tab 1" key="1">
                  Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Tab 2" key="2" disabled>
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>

              <Divider plain>卡片版</Divider>
              <Tabs type="card" defaultActiveKey="1">
                <TabPane tab="Tab 1" key="1">
                  Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Tab 2" key="2" disabled>
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
            </Block>
          </Col>

          <Col span={8}>
            <Block title="面包屑">
              <Divider plain>常规版</Divider>
              <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="">Application Center</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="">Application List</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>An Application</Breadcrumb.Item>
              </Breadcrumb>
              <Divider plain>下拉menu</Divider>
              <Breadcrumb>
                <Breadcrumb.Item>Ant Design</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="">Component</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                          General
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                          Layout
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                          Navigation
                        </a>
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <a href="">General</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Button</Breadcrumb.Item>
              </Breadcrumb>
              <Divider plain>带icon</Divider>
              <Breadcrumb>
                <Breadcrumb.Item href="">
                  <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="">
                  <UserOutlined />
                  <span>Application List</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Application</Breadcrumb.Item>
              </Breadcrumb>
            </Block>
          </Col>
          <Col span={8}>
            <Block title="下拉菜单">
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.ItemGroup title="Group title">
                      <Menu.Item>1st menu item</Menu.Item>
                      <Menu.Item>2nd menu item</Menu.Item>
                    </Menu.ItemGroup>
                    <SubMenu title="sub menu">
                      <Menu.Item>3rd menu item</Menu.Item>
                      <Menu.Item>4th menu item</Menu.Item>
                    </SubMenu>
                    <SubMenu title="disabled sub menu" disabled>
                      <Menu.Item>5d menu item</Menu.Item>
                      <Menu.Item>6th menu item</Menu.Item>
                    </SubMenu>
                  </Menu>
                }
              >
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  下拉菜单 <DownOutlined />
                </a>
              </Dropdown>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.ItemGroup title="Group title">
                      <Menu.Item>1st menu item</Menu.Item>
                      <Menu.Item>2nd menu item</Menu.Item>
                    </Menu.ItemGroup>
                    <SubMenu title="sub menu">
                      <Menu.Item>3rd menu item</Menu.Item>
                      <Menu.Item>4th menu item</Menu.Item>
                    </SubMenu>
                    <SubMenu title="disabled sub menu" disabled>
                      <Menu.Item>5d menu item</Menu.Item>
                      <Menu.Item>6th menu item</Menu.Item>
                    </SubMenu>
                  </Menu>
                }
              >
                <Button type="primary">
                  下拉菜单
                  <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.ItemGroup title="Group title">
                      <Menu.Item>1st menu item</Menu.Item>
                      <Menu.Item>2nd menu item</Menu.Item>
                    </Menu.ItemGroup>
                    <SubMenu title="sub menu">
                      <Menu.Item>3rd menu item</Menu.Item>
                      <Menu.Item>4th menu item</Menu.Item>
                    </SubMenu>
                    <SubMenu title="disabled sub menu" disabled>
                      <Menu.Item>5d menu item</Menu.Item>
                      <Menu.Item>6th menu item</Menu.Item>
                    </SubMenu>
                  </Menu>
                }
              >
                <Button>
                  下拉菜单
                  <DownOutlined />
                </Button>
              </Dropdown>
              <div style={{ width: '100%' }}></div>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="1">1st menu item</Menu.Item>
                    <Menu.Item key="2">2nd menu item</Menu.Item>
                    <Menu.Item key="3">3rd menu item</Menu.Item>
                  </Menu>
                }
                trigger={['contextMenu']}
              >
                <div
                  className="site-dropdown-context-menu"
                  style={{
                    textAlign: 'center',
                    height: 200,
                    lineHeight: '200px',
                    flex: 1,
                  }}
                >
                  鼠标右键触发
                </div>
              </Dropdown>
            </Block>
          </Col>

          <Col span={8}>
            <Block title="导航菜单">
              <Menu
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
              >
                <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                  <Menu.ItemGroup key="g1" title="Item 1">
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup key="g2" title="Item 2">
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>
                <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                  <Menu.Item key="5">Option 5</Menu.Item>
                  <Menu.Item key="6">Option 6</Menu.Item>
                  <SubMenu key="sub3" title="Submenu">
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                  </SubMenu>
                </SubMenu>
                <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
                  <Menu.Item key="9">Option 9</Menu.Item>
                  <Menu.Item key="10">Option 10</Menu.Item>
                  <Menu.Item key="11">Option 11</Menu.Item>
                  <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
              </Menu>
            </Block>
          </Col>

          <Col span={8}>
            <Block title="数据录入">
              <Button
                type="primary"
                onClick={() => setInputDisabled(i => !i)}
                style={{ marginTop: 16 }}
              >
                禁用开关
              </Button>
              <Divider plain>单选</Divider>
              <Radio.Group disabled={inputDisabled}>
                <Radio value={1}>A</Radio>
                <Radio value={2}>B</Radio>
                <Radio value={3}>C</Radio>
                <Radio value={4}>D</Radio>
              </Radio.Group>
              <Divider plain>多选</Divider>
              <Checkbox.Group
                disabled={inputDisabled}
                options={['Apple', 'Pear', 'Orange']}
                defaultValue={['Apple']}
              />
              <Divider plain>开关</Divider>
              <Switch disabled={inputDisabled} defaultChecked />
              <Switch
                disabled={inputDisabled}
                checkedChildren="开"
                unCheckedChildren="关"
                defaultChecked
              />
              <Divider plain>文本 输入框</Divider>
              <Input placeholder="请输入" disabled={inputDisabled} />
              <Input placeholder="请输入" prefix={<UserOutlined />} disabled={inputDisabled} />
              <Input placeholder="请输入" suffix={<SearchOutlined />} disabled={inputDisabled} />
              <TextArea
                showCount
                maxLength={100}
                style={{ height: 120 }}
                disabled={inputDisabled}
              />
              <Divider plain>数字 输入框</Divider>
              <InputNumber min={1} max={10} defaultValue={3} disabled={inputDisabled} />
            </Block>
          </Col>
          <Col span={8}>
            <Block title="数据录入2">
              <Button
                type="primary"
                onClick={() => setInputDisabled(i => !i)}
                style={{ marginTop: 16 }}
              >
                禁用开关
              </Button>
              <Divider plain>选择器</Divider>
              <Select defaultValue="lucy" style={{ width: 120 }} disabled={inputDisabled}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
              <Select
                disabled={inputDisabled}
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                // filterOption={(input, option) => {
                //     if (option) {
                //         return (option.children || '').toLowerCase().indexOf(input.toLowerCase()) >= 0
                //     }
                //     return false
                // }
                // }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="select one country"
                defaultValue={['china']}
                optionLabelProp="label"
                allowClear
                disabled={inputDisabled}
              >
                <Option value="china" label="China">
                  <div className="demo-option-label-item">
                    <span role="img" aria-label="China">
                      🇨🇳
                    </span>
                    China (中国)
                  </div>
                </Option>
                <Option value="usa" label="USA">
                  <div className="demo-option-label-item">
                    <span role="img" aria-label="USA">
                      🇺🇸
                    </span>
                    USA (美国)
                  </div>
                </Option>
                <Option value="japan" label="Japan">
                  <div className="demo-option-label-item">
                    <span role="img" aria-label="Japan">
                      🇯🇵
                    </span>
                    Japan (日本)
                  </div>
                </Option>
                <Option value="korea" label="Korea">
                  <div className="demo-option-label-item">
                    <span role="img" aria-label="Korea">
                      🇰🇷
                    </span>
                    Korea (韩国)
                  </div>
                </Option>
              </Select>
              <Divider plain>日期选择框</Divider>
              <DatePicker disabled={inputDisabled} />
              <DatePicker disabled={inputDisabled} picker="time" />
              <DatePicker disabled={inputDisabled} picker="week" />
              <DatePicker disabled={inputDisabled} picker="month" />
              <DatePicker disabled={inputDisabled} picker="quarter" />
              <DatePicker disabled={inputDisabled} picker="year" />

              <RangePicker
                disabled={inputDisabled}
                ranges={{
                  今天: [moment(), moment()],
                  当月: [moment().startOf('month'), moment().endOf('month')],
                }}
              />
              <RangePicker
                disabled={inputDisabled}
                ranges={{
                  今天: [moment(), moment()],
                  当月: [moment().startOf('month'), moment().endOf('month')],
                }}
                showTime
                format="YYYY/MM/DD HH:mm:ss"
              />
            </Block>
          </Col>

          <Col span={8}>
            <Block title="数据展示">
              <Divider plain>列表</Divider>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={[
                  {
                    gender: 'male',
                    name: {
                      title: 'Mr',
                      first: 'Miguel',
                      last: 'Gallego',
                    },
                    email: 'miguel.gallego@example.com',
                    picture: {
                      large: 'https://randomuser.me/api/portraits/men/91.jpg',
                      medium: 'https://randomuser.me/api/portraits/med/men/91.jpg',
                      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/91.jpg',
                    },
                    nat: 'ES',
                  },
                  {
                    gender: 'female',
                    name: {
                      title: 'Ms',
                      first: 'Diane',
                      last: 'Holland',
                    },
                    email: 'diane.holland@example.com',
                    picture: {
                      large: 'https://randomuser.me/api/portraits/women/68.jpg',
                      medium: 'https://randomuser.me/api/portraits/med/women/68.jpg',
                      thumbnail: 'https://randomuser.me/api/portraits/thumb/women/68.jpg',
                    },
                    nat: 'GB',
                  },
                  {
                    gender: 'female',
                    name: {
                      title: 'Ms',
                      first: 'Maayke',
                      last: 'Oranje',
                    },
                    email: 'maayke.oranje@example.com',
                    picture: {
                      large: 'https://randomuser.me/api/portraits/women/96.jpg',
                      medium: 'https://randomuser.me/api/portraits/med/women/96.jpg',
                      thumbnail: 'https://randomuser.me/api/portraits/thumb/women/96.jpg',
                    },
                    nat: 'NL',
                  },
                ]}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <a key="list-loadmore-edit">edit</a>,
                      <a key="list-loadmore-more">more</a>,
                    ]}
                  >
                    {/* <Skeleton avatar title={false} active> */}
                    <List.Item.Meta
                      avatar={<Avatar src={item.picture.large} />}
                      title={<a href="https://ant.design">{item.name.last}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                    <div>content</div>
                    {/* </Skeleton> */}
                  </List.Item>
                )}
              />
              <Divider plain>折叠面板</Divider>
              <Collapse defaultActiveKey={['1']} style={{ flex: 1 }}>
                <Panel header="This is panel header 1" key="1">
                  <p>1</p>
                </Panel>
                <Panel header="This is panel header 2" key="2">
                  <p>2</p>
                </Panel>
                <Panel collapsible="disabled" header="This is panel header 3" key="3">
                  <p>3</p>
                </Panel>
              </Collapse>
            </Block>
          </Col>
          <Col span={8}>
            <Block title="数据展示2">
              <Divider plain>标签</Divider>
              <Tag>Tag 1</Tag>
              <Tag>
                <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
              </Tag>
              <Tag closable>Tag 2</Tag>
              <Tag closable>Prevent Default</Tag>
              <Tag color="magenta">magenta</Tag>
              <Tag color="red">red</Tag>
              <Tag color="volcano">volcano</Tag>
              <Tag color="orange">orange</Tag>
              <Tag color="gold">gold</Tag>
              <Tag color="lime">lime</Tag>
              <Tag color="green">green</Tag>
              <Tag color="cyan">cyan</Tag>
              <Tag color="blue">blue</Tag>
              <Tag color="geekblue">geekblue</Tag>
              <Tag color="purple">purple</Tag>
              <Tag color="#f50">#f50</Tag>
              <Tag color="#2db7f5">#2db7f5</Tag>
              <Tag color="#87d068">#87d068</Tag>
              <Tag color="#108ee9">#108ee9</Tag>
              <Divider plain>表格</Divider>
              <Table
                columns={[
                  {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    render: (
                      text
                    ) => <a>{text}</a>,
                  },
                  {
                    title: 'Age',
                    dataIndex: 'age',
                    key: 'age',
                  },
                  {
                    title: 'Address',
                    dataIndex: 'address',
                    key: 'address',
                  },
                  {
                    title: 'Tags',
                    key: 'tags',
                    dataIndex: 'tags',
                    render: (tags) => (
                      <>
                        {tags.map(tag => {
                          let color = tag.length > 5 ? 'geekblue' : 'green';
                          if (tag === 'loser') {
                            color = 'volcano';
                          }
                          return (
                            <Tag color={color} key={tag}>
                              {tag.toUpperCase()}
                            </Tag>
                          );
                        })}
                      </>
                    ),
                  },
                  {
                    title: 'Action',
                    key: 'action',
                    render: (
                      text,
                      record
                    ) => (
                      <Space size="middle">
                        <a>Invite {record.name}</a>
                        <a>Delete</a>
                      </Space>
                    ),
                  },
                ]}
                dataSource={[
                  {
                    key: '1',
                    name: 'John Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park',
                    tags: ['nice', 'developer'],
                  },
                  {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 1 Lake Park',
                    tags: ['loser'],
                  },
                  {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park',
                    tags: ['cool', 'teacher'],
                  },
                ]}
              />
            </Block>
          </Col>

          <Col span={8}>
            <Block title="反馈列表">
              <Divider plain>警告提示</Divider>
              <Alert message="Success Tips" type="success" showIcon />
              <Alert message="Informational Notes" type="info" showIcon />
              <Alert message="Warning" type="warning" showIcon closable />
              <Alert message="Error" type="error" showIcon />
              <Alert
                message="Success Tips"
                description="Detailed description and advice about successful copywriting."
                type="success"
                showIcon
              />
              <Alert
                message="Informational Notes"
                description="Additional description and information about copywriting."
                type="info"
                showIcon
              />
              <Alert
                message="Warning"
                description="This is a warning notice about copywriting."
                type="warning"
                showIcon
                closable
              />
              <Alert
                message="Error"
                description="This is an error message about copywriting."
                type="error"
                showIcon
              />
              <Divider plain>全局提示</Divider>
              <Button onClick={() => message.success('This is a success message')}>Success</Button>
              <Button onClick={() => message.error('This is a success message')}>Error</Button>
              <Button onClick={() => message.warning('This is a success message')}>Warning</Button>
            </Block>
          </Col>

          <Col span={8}>
            <Block title="反馈列表2">
              <Divider plain>气泡确认框</Divider>
              <div className="demo">
                <div style={{ marginLeft: 70, whiteSpace: 'nowrap' }}>
                  <Popconfirm
                    placement="topLeft"
                    title={text}
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button>TL</Button>
                  </Popconfirm>
                  <Popconfirm
                    placement="top"
                    title={text}
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button>Top</Button>
                  </Popconfirm>
                  <Popconfirm
                    placement="topRight"
                    title={text}
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button>TR</Button>
                  </Popconfirm>
                </div>
                <div style={{ width: 70, float: 'left' }}>
                  <Popconfirm
                    placement="leftTop"
                    title={text}
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button>LT</Button>
                  </Popconfirm>
                  <Popconfirm
                    placement="left"
                    title={text}
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button>Left</Button>
                  </Popconfirm>
                  <Popconfirm
                    placement="leftBottom"
                    title={text}
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button>LB</Button>
                  </Popconfirm>
                </div>
                <div style={{ width: 70, marginLeft: 304 }}>
                  <Popconfirm
                    placement="rightTop"
                    title={text}
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button>RT</Button>
                  </Popconfirm>
                  <Popconfirm
                    placement="right"
                    title={text}
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button>Right</Button>
                  </Popconfirm>
                  <Popconfirm
                    placement="rightBottom"
                    title={text}
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button>RB</Button>
                  </Popconfirm>
                </div>
                <div style={{ marginLeft: 70, clear: 'both', whiteSpace: 'nowrap' }}>
                  <Popconfirm
                    placement="bottomLeft"
                    title={text}
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button>BL</Button>
                  </Popconfirm>
                  <Popconfirm
                    placement="bottom"
                    title={text}
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button>Bottom</Button>
                  </Popconfirm>
                  <Popconfirm
                    placement="bottomRight"
                    title={text}
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button>BR</Button>
                  </Popconfirm>
                </div>
              </div>
              <Divider plain>气泡卡片</Divider>
              <div className="demo">
                <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
                  <Popover placement="topLeft" title={text1} content={content} trigger="click">
                    <Button>TL</Button>
                  </Popover>
                  <Popover placement="top" title={text1} content={content} trigger="click">
                    <Button>Top</Button>
                  </Popover>
                  <Popover placement="topRight" title={text1} content={content} trigger="click">
                    <Button>TR</Button>
                  </Popover>
                </div>
                <div style={{ width: buttonWidth, float: 'left' }}>
                  <Popover placement="leftTop" title={text1} content={content} trigger="click">
                    <Button>LT</Button>
                  </Popover>
                  <Popover placement="left" title={text1} content={content} trigger="click">
                    <Button>Left</Button>
                  </Popover>
                  <Popover placement="leftBottom" title={text1} content={content} trigger="click">
                    <Button>LB</Button>
                  </Popover>
                </div>
                <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
                  <Popover placement="rightTop" title={text1} content={content} trigger="click">
                    <Button>RT</Button>
                  </Popover>
                  <Popover placement="right" title={text1} content={content} trigger="click">
                    <Button>Right</Button>
                  </Popover>
                  <Popover placement="rightBottom" title={text1} content={content} trigger="click">
                    <Button>RB</Button>
                  </Popover>
                </div>
                <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
                  <Popover placement="bottomLeft" title={text1} content={content} trigger="click">
                    <Button>BL</Button>
                  </Popover>
                  <Popover placement="bottom" title={text1} content={content} trigger="click">
                    <Button>Bottom</Button>
                  </Popover>
                  <Popover placement="bottomRight" title={text1} content={content} trigger="click">
                    <Button>BR</Button>
                  </Popover>
                </div>
              </div>
              <Divider plain>对话框</Divider>
              <>
                <Button type="primary" onClick={showModal}>
                  Open Modal
                </Button>
                <Modal
                  title="Basic Modal"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </Modal>
                <Button
                  onClick={() => {
                    Modal.confirm({
                      title: 'Confirm',
                      icon: <ExclamationCircleOutlined />,
                      content: 'Bla bla ...',
                      okText: '确认',
                      cancelText: '取消',
                    });
                  }}
                >
                  Confirm
                </Button>
              </>
            </Block>
          </Col>
          <Col span={24}>
            <Block title="反馈列表3">
              <Divider plain>进度条</Divider>
              <Progress percent={30} />
              <Progress percent={50} status="active" />
              <Progress percent={70} status="exception" />
              <Progress percent={100} />
              <Progress percent={50} showInfo={false} />
              <Progress type="circle" percent={75} />
              <Progress type="circle" percent={70} status="exception" />
              <Progress type="circle" percent={100} />
            </Block>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default LightTheme;
