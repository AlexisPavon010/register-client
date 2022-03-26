import { Row, Col, Button } from 'antd'
import { useSelector } from 'react-redux'
import { MdNotificationsActive } from 'react-icons/md'
import { RiQuestionFill } from 'react-icons/ri'
import { CgMenu } from 'react-icons/cg'
import { Header } from 'antd/lib/layout/layout'

interface NavbarProps {
  openMenu: () => any;
}

const Navbar = ({ openMenu }: NavbarProps) => {
  const { active } = useSelector((state: any) => state.workspace);

  return (
    <Header style={{ backgroundColor: 'white' }}>
      <div className="header__wrapper">
        <Row align="middle" gutter={16}>
          <Col className="ant-col-xs" lg={0}>
            <Button className="header__menu" type="link" onClick={openMenu} icon={<CgMenu size={24} color="#525F7F" />} />
          </Col>
          <Col className="ant-col-xs" lg={0}>
            <img alt='picker' src='https://yt3.ggpht.com/ytc/AKedOLQ_uCj3n_tR_DqijTwPkevsHilK4rf6AKAWfdsfog=s48-c-k-c0x00ffffff-no-rj' width={29} />
          </Col>
          {/* <Col flex={1} xl={0}> */}
          <Col xs={0} md={{ span: 'auto' }}>
            {/* <SelectWorkspace /> */}
          </Col>
          <Col flex={1} md={0}>
          </Col>
          {active?.planID && (
            <Col xs={0} lg={{ span: 'auto' }}>
              {/* <PlanBadge /> */}
            </Col>
          )}
          <Col xs={0} flex={1} md={{ span: 'auto' }}>
          </Col>
          {/*
          <Col xs={0} flex={1} xl={{ span: 'auto' }}>
            <div className="header__text">
              <MdTimer size={15} />
              {t('TIME_LEFT')}
            </div>
          </Col> */}
          {/* <Col xs={0} md={{ span: 'auto' }}> */}
          <Col>
            {/* <SelectLanguage /> */}
          </Col>
          <Col>
            <div className="avatar">
              <MdNotificationsActive size={16} color="#3F4D70" />
            </div>
          </Col>
          <Col xs={0} md={{ span: 'auto' }}>
            <div className="avatar">
              <span style={{ lineHeight: '12px' }}>
                <RiQuestionFill size={16} color="#3F4D70" />
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </Header>
  )
}

export default Navbar
