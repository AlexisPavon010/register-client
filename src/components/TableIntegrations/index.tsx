import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useState } from 'react'
import { Table, Typography, Menu, Dropdown, Row, Col, Button, Modal, notification, } from 'antd'
import axios from 'axios'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
// import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import classNames from 'classnames'
import styles from './TableIntegrations.module.css'
// import { DELIVERY_PROVIDERS } from '../../const/deliveryProviders'
// import { bookingsToCSV, bookingsToXLS } from '../../functions/bookingsToCSV'
// import AssignDriver from '../AssignDriver'
// import * as gtag from '../../lib/gtag'
// import { FINSHED, STATUSES } from '../../const/bookingStatus'
// import { diffTimeInMinutes } from '../../functions/utils'
// import { BASE_SMR_URL, BASE_URL, routes } from '../../api'



const { Title } = Typography
const { confirm } = Modal

// const ACTIVE: any = [
//   STATUSES.READY_FOR_PICKUP, STATUSES.ACCEPTED,
//   STATUSES.ARRIVED_AT_PICKUP, STATUSES.WAY_TO_DELIVER,
//   STATUSES.ARRIVED_AT_DELIVERY
// ]

export interface TableIntegrationsProps {
  title?: string;
  data: any;
  pages?: number;
  currentPage?: number;
  actions: boolean;
  showBusiness?: any;
  isLoading: boolean;
  onPageChange?: any;
  onPageSizeChange?: any;
  pageSize?: number;
  refreshData?: any;
}


export default function TableIntegrations({
  title = '',
  data = [],
  pages = 0,
  currentPage = 1,
  actions = false,
  showBusiness = true,
  isLoading,
  onPageChange,
  onPageSizeChange,
  pageSize = 0,
  refreshData
}: TableIntegrationsProps) {
  // const { t } = useTranslation('shared', { keyPrefix: 'TABLE' })
  // const { t: ts } = useTranslation('shared', { keyPrefix: 'STATUS' })
  const navigate = useNavigate();
  const [bookingToAssign, setBookingToAssing] = useState<any>()

  // const getMinutes = (booking: any) => {
  //   let end
  //   if (
  //     (booking.statusText === 'COMPLETED' && !booking.bookingCompletionDateTime) ||
  //     FINSHED.includes(booking.statusText)
  //   ) {
  //     end = booking.updatedAt
  //   } else {
  //     end = booking.bookingCompletionDateTime
  //   }
  //   return diffTimeInMinutes(booking.createdAt, end)
  // }

  const openDriverAssign = setBookingToAssing
  const closeDriverAssign = () => {
    setBookingToAssing(true)
    refreshData()
  }

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      // eslint-disable-next-line react/display-name
      render: (name: any) => {
        return (
          <div>
            {name}
          </div>
        )
      }
    },
    {
      title: 'Appellido',
      dataIndex: 'lastName',
      key: 'lastName',
      width: 130,
      // eslint-disable-next-line react/display-name
      render: (lastName: any) => (
        <span className="table-id">
          {lastName}
        </span>
      )
    },
    {
      title: 'Correo',
      dataIndex: 'email',
      key: 'email',
      width: 120,
      // eslint-disable-next-line react/display-name
      render: (email: any) => (
        <div className="table-created-at">
          {email}
        </div>
      )
    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
      key: 'description',
      width: 120,
      // eslint-disable-next-line react/display-name
      render: (description: any) => (
        <div className="table-created-at">
          {description}
        </div>
      )
    },
    // {
    //   title: 'PROVIDER',
    //   dataIndex: 'deliveryProvider',
    //   key: 'deliveryProvider',
    //   width: 170,
    //   // eslint-disable-next-line react/display-name
    //   render: (deliveryProvider = 'PICKER') => {
    //     const deliveryInfo = {
    //       logo: 'logo'
    //     }
    //     return (
    //       <List.Item.Meta
    //         avatar={<Avatar src={deliveryInfo?.logo} />}
    //         className="provider-name"
    //         title={true ? 'deliveryProvider' : ''}
    //       />
    //     )
    //   }
    // },
    // {
    //   title: 'DRIVER',
    //   dataIndex: 'driverName',
    //   key: 'driverName',
    //   // eslint-disable-next-line react/display-name
    //   render: (driverName: any) => driverName || <span className="table-driver-unassigned">{'NOT_ASSIGNED'}</span>,
    //   width: 170
    // },
    // {
    //   title: 'BUSINESS',
    //   dataIndex: 'businessName',
    //   key: 'businessName',
    //   width: 200
    // },
    // {
    //   title: 'STATUS',
    //   dataIndex: 'statusText',
    //   key: 'statusText',
    //   width: 190,
    //   // eslint-disable-next-line react/display-name
    //   render: (statusText: any) => <div className={classNames('table-status', statusText)}>{'statusText'}</div>
    // },
    {
      title: '',
      dataIndex: 'statusText',
      key: 'actions',
      width: 50,
      fixed: 'right' as 'right',
      // eslint-disable-next-line react/display-name
      render: (_statusText: any, record: any) => (
        <Dropdown
          placement="bottomRight"
          overlay={
            <BookingMenu
              data={record}
              refreshData={refreshData}
              openDriverAssign={openDriverAssign}
            />
          }
          trigger={['click']}
        // onClick={(e: any) => e.stopPropagation()}
        >
          <div style={{ textAlign: 'center' }}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <BiDotsVerticalRounded size={25} />
            </a>
          </div>
        </Dropdown>
      )
    }
  ]


  // const downloadReport = (item: any) => {
  //   if (item.key === 'csv') {
  //     const formatBooking = data.map((b: any) =>
  //       `${getMinutes(b)} min,${b.bookingNumericId},${moment(b.createdAt).format('HH:mm A - DD/MM/YY')},${b.deliveryProvider || 'PICKER'},${b.driverName || t('NOT_ASSIGNED')},${b.businessName},${ts(b.statusText)}`)

  //     bookingsToCSV(
  //       [t('TIME'), t('SERVICE_ID'), t('DATE'), t('PROVIDER'), t('DRIVER'), t('BUSINESS'), t('STATUS')],
  //       formatBooking
  //     )
  //   } else if (item.key === 'xls') {
  //     const formatBookings = data.map((b: any) =>
  //       [`${getMinutes(b)} min`, `${b.bookingNumericId}`, `${moment(b.createdAt).format('HH:mm A - DD/MM/YY')}`, `${b.deliveryProvider || 'PICKER'}`, `${b.driverName || t('NOT_ASSIGNED')}`, `${b.businessName}`, `${ts(b.statusText)}`]
  //     )
  //     bookingsToXLS(
  //       [t('TIME'), t('SERVICE_ID'), t('DATE'), t('PROVIDER'), t('DRIVER'), t('BUSINESS'), t('STATUS')],
  //       formatBookings
  //     )
  //   }
  // }

  const menu = (
    <Menu onClick={() => { }}>
      <Menu.Item key="csv">CSV</Menu.Item>
      <Menu.Item key="xls">Excel (XLS)</Menu.Item>
    </Menu>
  )

  return (
    <div className={styles.tableWrapper} style={{ padding: '0 20px' }}>
      {/* <AssignDriver
        visible={bookingToAssign}
        booking={bookingToAssign}
        title={t('ASSIGN_DELIVERY_MAN')}
        onCancel={closeDriverAssign}
      /> */}
      <Row>
        <Col flex={1}>
          <Title level={2}>{'Registros'}</Title>
        </Col>
        <Col>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="link">{'DOWNLOAD_TABLE'}</Button>
          </Dropdown>
        </Col>

        {true && (
          <Col>
            <Button type="link" onClick={refreshData}>{'REFRESH'}</Button>
          </Col>
        )}
      </Row>
      <Table
        className={'mp-table-card'}
        dataSource={data}
        columns={columns}
        scroll={{ x: 1000 }}
        rowClassName={(row) => false ? 'tr-new' : ''}
        pagination={{
          total: pageSize * pages,
          current: currentPage,
          pageSize: pageSize,
          onChange: onPageChange,
          onShowSizeChange: onPageSizeChange,
          showSizeChanger: true
        }}
        rowKey="_id"
        loading={isLoading}
        onRow={(record, rowIndex) => ({
          onClick: event => {
            // navigate(`/integrations/orders/${record._id}`)
          }
        })}
      />
    </div>
  )
}

interface BookingMenuProps {
  data: any;
  refreshData: any;
  openDriverAssign: any;
}

const BookingMenu = ({ data, refreshData, openDriverAssign }: BookingMenuProps) => {
  const navigate = useNavigate();
  // const { t } = useTranslation('shared', { keyPrefix: 'FILTER' });
  const [loading, setLoading] = useState(false)
  const SMR_AVAILABLE = ['ON_DECK', 'ON_HOLD', 'ACCEPTED', 'READY_FOR_PICKUP', 'ARRIVED_AT_PICKUP', 'WAY_TO_DELIVER', 'ARRIVED_AT_DELIVERY']

  const menu = [
    {
      children: 'Actualizar',
      onClick: () => updateRegister(data._id),
      disabled: loading
    },
    {
      children: 'Borrar',
      onClick: () => deleteRegister(data._id),
      disabled: loading
    },

  ]

  const bookingCompletedOptions = [
    { children: 'VIEW_DETAILS', onClick: () => navigate(`/integrations/orders/${data._id}`) }
  ]

  const bookingInProgressOptions = [
    { children: 'VIEW_DETAILS', onClick: () => navigate(`/integrations/orders/${data._id}`) },
    {
      children: 'CANCEL_SERVICE',
      onClick: () => deleteRegister(data._id),
      disabled: loading
    }
  ]


  const updateRegister = (_id: any) => {
    navigate(`/update-register/${_id}`)
  }

  const deleteRegister = (registerId: any) => {
    confirm({
      title: 'Borrar Registro',
      icon: <span role="img" aria-label="exclamation-circle" className="anticon"><AiOutlineExclamationCircle color="#faad14" size={25} /></span>,
      okText: 'YES',
      onOk() {
        setLoading(true)
        axios.delete(`${process.env.REACT_APP_BASE_URL}/api/deleteRegister/${registerId}`)
          .then((resp) => {
            notification.success({
              message: 'Registro Borrado'
            })
            refreshData()
          })
          .catch(e => {
            console.log(e)
            notification.error({
              message: 'Error'
            })
          })
          .finally(() => setLoading(false))
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  const options = true ? bookingCompletedOptions : bookingInProgressOptions

  return (
    <Menu>
      <Menu.ItemGroup key="g"
      //  style={{ textAlign: 'center' }}
      >
        {menu.map((o, i) => (
          <Menu.Item key={i} {...o} />
        ))}
      </Menu.ItemGroup>
    </Menu>
  )
}
