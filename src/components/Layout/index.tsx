import { Drawer, Layout as LayoutAntd } from 'antd'
import { useState } from 'react'
import Navbar from './Navbar'
import SideMenu from './SideMenu'
// import GetCurrentPosition from '../GetCurrentPosition'
// import { BookingsProvider } from '../../hooks/useBookings'
// import { SearchProvider } from '../../hooks/useSearch'
// import FirebaseNotifications from '../FirebaseNotifications'
// import dynamic from 'next/dynamic'
// import { MyLocationsProvider } from '../../hooks/useMyLocations'
// import { decideIsPublicRoute } from '../../functions/decisions'
// import { useRouter } from 'next/router'
// import UpgradePlanImage from './UpgradePlanImage'

const { Content, Sider } = LayoutAntd

export default function Layout({ children }: { children: any }) {
  // if (decideIsPublicRoute(route)) return <div>{children}</div>

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const openMenu = () => setIsMenuOpen(true)
  const closeMenu = () => setIsMenuOpen(false)
  // const Zendesk = dynamic(
  //   () => import('../Zendesk'),
  //   { ssr: false }
  // )

  // const GettingStarted = dynamic(
  //   () => import('../GettingStarted').then((mod) => mod.GettingStarted),
  //   { ssr: false }
  // )
  // const BlurOnboarding = dynamic(
  //   () => import('../GettingStarted').then((mod) => mod.BlurOnboarding),
  //   { ssr: false }
  // )

  // useEffect(() => {
  //   const handleRouteChange = (page) => {
  //     const isInCreateBusiness = page.includes('/accounts/create')
  //     const isInCreateBooking = page.includes('/integrations/create-booking/')
  //     if (isInCreateBusiness || isInCreateBooking) {
  //       setShowGettingStarted(false)
  //     } else {
  //       if (!isLoading && user && !user.skipGettingStarted) setShowGettingStarted(true)
  //     }
  //   }
  //   if (!isLoading && user && !user.skipGettingStarted) {
  //     setShowGettingStarted(true)
  //     router.events.on('routeChangeComplete', handleRouteChange)
  //   }
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange)
  //   }
  // }, [user])

  return (
    // <BookingsProvider>
    //   <SearchProvider>
    //     <FirebaseNotifications>
    //       <MyLocationsProvider>
    <LayoutAntd style={{ minHeight: '100vh', flexDirection: 'row' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        className="sider"
        width={250}
        theme={'light'}
        trigger={null}
        >
        <SideMenu />
        {/* <UpgradePlanImage /> */}
      </Sider>
      <Drawer
        placement="left"
        closable={false}
        onClose={closeMenu}
        visible={isMenuOpen}
        width={300}
      // id="sidebar-drawer"
      >
        <SideMenu closeMenu={closeMenu} />
        {/* <UpgradePlanImage /> */}
      </Drawer>
      <LayoutAntd >
        <Navbar openMenu={openMenu} />
        <Content className="main-content">
          {children}
        </Content>
      </LayoutAntd>

      {/* <Zendesk />
              {showGettingStarted && (
                <>
                  <GettingStarted />
                  <BlurOnboarding />
                </>
              )} */}
      {/* <GetCurrentPosition /> */}
    </LayoutAntd>
    //       </MyLocationsProvider>
    //     </FirebaseNotifications>
    //   </SearchProvider>
    // </BookingsProvider>
  )
}
