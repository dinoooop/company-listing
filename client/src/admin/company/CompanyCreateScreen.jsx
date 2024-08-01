import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateForm } from './companyValidation'
import { vr } from '../../helpers/vr'
import ProtectedLayout from '../layouts/ProtectedLayout'
import useCompanyStore from './useCompanyStore'
import InputField from '../../formc/InputField'
import Submit from '../../formc/Submit'
import InputFile from '../../formc/InputFile'

export default function () {

    const navigate = useNavigate()
    const { reset, store, error } = useCompanyStore()
    const [errors, setErrors] = useState({})
    const [formValues, setFormValues] = useState({})

    useEffect(() => {
        reset()
    }, [])

    const onChangeForm = (e) => {
        const validated = vr.validate(e, validateForm, formValues)
        setFormValues(prev => ({ ...prev, ...validated.formValues }))
        setErrors(prev => ({ ...prev, ...validated.error }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newFormData = vr.submitFile(formValues, validateForm)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            try {
                await store(newFormData)
                // navigate('/admin/companies')
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <ProtectedLayout roles="admin">

            <div className="page-header">
                <h1>Create Company</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        {error && <p className='red-alert'>{error}</p>}

                        <InputField name="name" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="email" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputFile name="logo" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="website" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Submit cto="/admin/companies" />

                    </form>

                </div>
            </div>
        </ProtectedLayout>
    )
}
