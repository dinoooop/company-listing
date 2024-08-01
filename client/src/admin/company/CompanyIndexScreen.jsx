import AppIcon from '../components/AppIcon'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProtectedLayout from '../layouts/ProtectedLayout'
import useCompanyStore from './useCompanyStore'
import Pagination from "react-js-pagination"

export default function () {

    const { index, perPage, total, remove, destroy, items } = useCompanyStore()
    const [formValues, setFormValues] = useState({ page: 1 })

    useEffect(() => {
        const data = Object.fromEntries(
            Object.entries(formValues)
                .filter(([key, value]) => value !== "")
                .map(([key, value]) => [key, value])
        );
        index(data)

    }, [formValues])

    const handleDelete = (company) => {
        remove(company)
        destroy(company)
    }

    const handlePagination = number => {
        setFormValues(prev => ({ ...prev, page: number }))
    }

    return (
        <ProtectedLayout roles="admin">
            <div className="page-header">
                <h1>Companies</h1>
                <div className="other-actions">
                    <AppIcon to="create" icon="add" />
                </div>
            </div>

            <div className="row">
                <div className='cardbody'>
                    <div className="index-table-container">

                        <table className="index-table">
                            <thead>
                                <tr>
                                    <th>Logo</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map((item) => (
                                        <tr key={item.id}>
                                            <td><img src={item.logo} className='company-logo' /></td>
                                            <td><Link to={`/admin/companies/${item.id}`}>{item.name}</Link></td>
                                            <td className='action'>
                                                <AppIcon onClick={handleDelete} item={item} icon="trash" />
                                                <AppIcon to={`/admin/companies/${item.id}`} icon="edit" />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>


                    </div>
                    <Pagination
                        activePage={formValues.page}
                        itemsCountPerPage={perPage}
                        totalItemsCount={total}
                        pageRangeDisplayed={5}
                        onChange={handlePagination}
                    />

                </div>
            </div>

        </ProtectedLayout>


    )
}