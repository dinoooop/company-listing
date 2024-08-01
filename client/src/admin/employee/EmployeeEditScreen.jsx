import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validateForm, validateFormLogo } from './employeeValidation';
import { vr } from '../../helpers/vr';
import ProtectedLayout from '../layouts/ProtectedLayout';
import useEmployeeStore from './useEmployeeStore';
import InputField from '../../formc/InputField';
import Submit from '../../formc/Submit';
import SingleSelectAuto from '../../formc/SingleSelectAuto';

export default function () {

    const navigate = useNavigate()
    const params = useParams()

    const { show, item, update, updateLogo, error } = useEmployeeStore()
    const [formValues, setFormValues] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        show(params.id)
    }, [params.id])

    useEffect(() => {
        setFormValues({
            id: params.id,
            first_name: item.first_name,
            last_name: item.last_name,
            company_id: item.company_id,
            email: item.email,
            phone: item.phone,
        })
    }, [item, params])

    const onChangeForm = (e) => {
        const validated = vr.validate(e, validateForm, formValues)
        setFormValues(prev => ({ ...prev, ...validated.formValues }))
        setErrors(prev => ({ ...prev, ...validated.error }))

        if (e.target.name === 'logo') {
            validated.formValues.id = params.id
            const newFormData = vr.submitFile(validated.formValues, validateFormLogo)
            if (typeof newFormData.errors != 'undefined') {
                setErrors(newFormData.errors)
            } else {
                try {
                    updateLogo(newFormData)
                } catch (error) {
                    console.error(error)
                }
            }
        }
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newFormData = vr.submit(formValues, validateForm)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            try {
                await update(newFormData)
                navigate('/admin/employees')
            } catch (error) {
                console.error(error)
            }
        }
    }


    return (

        <ProtectedLayout roles="admin">
            <div className="page-header">
                <h1>Edit Employee</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        {error && <p className='red-alert'>{error}</p>}

                        <InputField name="first_name" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="last_name" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <SingleSelectAuto name="company_id" label="Company" endpoint="companies" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="email" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="phone" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Submit cto="/admin/employees" />

                    </form>
                </div>
            </div>
        </ProtectedLayout>

    )
}
