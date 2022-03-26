import React, { useEffect, useState } from 'react'
import getRegisters from '../api/getRegisters'
import TableIntegrations from '../components/TableIntegrations'


export const Home = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState<any>(1)
    const [pageSize, setPageSize] = useState<any>(6)
    const [urlFetch, setUrlFetch] = useState<any>({ page: currentPage, onlyActives: true, limit: pageSize })

    const onPageChange = (page: number) => {
        setCurrentPage(page)
    }
    const onPageSizeChange = (current: any, size: any) => {
        setPageSize(size)
    }

    const fetchData = async () => {
        setLoading(true)
        try {
            const { data }: any = await getRegisters()
            setData(data)
        } catch (error) {
            console.log(error)
            alert('Hubo un error al hacer el fetch al server')
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchData()
    }, [pageSize])


    return (
        <TableIntegrations
            actions={true}
            currentPage={currentPage}
            data={data}
            onPageSizeChange={onPageSizeChange}
            isLoading={loading}
            onPageChange={onPageChange}
            pageSize={pageSize}
            refreshData={fetchData}
        />
        // <h1>home</h1>
    )
}
