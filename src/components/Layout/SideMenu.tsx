import { useEffect, useState } from 'react'
import { Menu, Avatar, Badge, Space } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BiBox, BiCodeBlock, BiHomeAlt, BiLeftArrowAlt, BiStore } from 'react-icons/bi'
import { IoIosSettings } from 'react-icons/io'

const { SubMenu } = Menu

interface SideMenuProps {
  closeMenu?: () => void;
}

export default function SideMenu({ closeMenu }: SideMenuProps) {
  // const { t } = useTranslation('shared', { keyPrefix: 'PAGES' })
  const location = useLocation()

  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch()
  const [showBookingBadge, setShowBookingBadge] = useState(false)

  const pages = [
    { title: 'Home', icon: <BiHomeAlt size={20} />, href: '/' },
    {
      title: <Space>Registros<Badge dot={showBookingBadge} /></Space>,
      icon: <BiBox size={20} />,
      href: '/integrations',
      children: [
        {
          title: <Space>Crear Nuevo Registro {false && <div className="badge"><BiLeftArrowAlt color="white" size={20} /></div>}</Space>,
          href: '/create-register'
        },
        { title: 'Registros', href: '/' },
        { title: 'configuraciones', href: '/integrations/settings' }
      ]
    }
  ]

  return (
    <Menu
      mode="inline"
      // selectedKeys={getSelectedKeys()}
      // defaultOpenKeys={[`/${location.pathname.split('/')[1]}`]}
      id="menu-sidebar"
    >
      <SubMenu
        className="user-menu"
        key="user-menu"
        icon={
          <Avatar style={{ backgroundColor: '#1890ff', verticalAlign: 'middle' }}>
            {'A'}
          </Avatar>
        }
        title={'Alexis'}
      >
        <Menu.Item
          key="logout"
          onClick={() => console.log('logout')}
        >
          Logout
        </Menu.Item>
      </SubMenu>
      <div className="header__tag--container">
        {/* <PlanBadge /> */}
      </div>
      <div style={{ height: 25 }} />
      {/* <SelectWorkspaceSideMenu /> */}
      {pages.map((p) => (
        p.children ? (
          <SubMenu
            key={p.href}
            icon={p.icon}
            title={p.title}
          >
            {p.children.map((c) => (
              <Menu.Item
                key={c.href}
                onClick={closeMenu}
              >
                <Link to={c.href}>
                  {c.title}
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ) : (
          <Menu.Item
            key={p.href}
            icon={p.icon}
            title={p.title}
            onClick={closeMenu}
          >
            <Link to={p.href}>
              {p.title}
            </Link>
          </Menu.Item>
        )))}
      <div style={{ height: 25 }} />
      <Menu.Item
        key="developers"
        icon={<BiCodeBlock />}
        title='DEVELOPERS'
        onClick={closeMenu}
      >
        <a href="https://www.facebook.com/alexispavon010/" target="_blank" rel="noreferrer">
          DEVELOPERS
        </a>
      </Menu.Item>
      <Menu.Item
        key="settings"
        icon={<IoIosSettings />}
        title='SETTINGS'
        onClick={closeMenu}
      >
        <Link to='/settings'>
          settings
        </Link>
      </Menu.Item>
    </Menu>
  )
}
