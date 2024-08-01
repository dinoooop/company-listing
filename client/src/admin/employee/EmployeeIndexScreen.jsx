import AppIcon from '../components/AppIcon'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProtectedLayout from '../layouts/ProtectedLayout'
import useEmployeeStore from './useEmployeeStore'
import Pagination from "react-js-pagination"

export default function () {

    const { index, perPage, total, remove, destroy, items } = useEmployeeStore()
    const [formValues, setFormValues] = useState({ page: 1 })

    useEffect(() => {
        const data = Object.fromEntries(
            Object.entries(formValues)
                .filter(([key, value]) => value !== "")
                .map(([key, value]) => [key, value])
        );
        index(data)

    }, [formValues])


    const handleDelete = (employee) => {
        remove(employee)
        destroy(employee)
    }

    const handlePagination = number => {
        setFormValues(prev => ({ ...prev, page: number }))
    }

    return (
        <ProtectedLayout roles="admin">
            <div className="page-header">
                <h1>Employees</h1>
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
                                    <th>Name</th>
                                    <th>Company</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map((item) => (
                                        <tr key={item.id}>
                                            <td><Link to={`/admin/employees/${item.id}`}>{`${item.first_name} ${item.last_name}`}</Link></td>
                                            <td>{item.company?.name}</td>
                                            <td className='action'>
                                                <AppIcon onClick={handleDelete} item={item} icon="trash" />
                                                <AppIcon to={`/admin/employees/${item.id}`} icon="edit" />
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