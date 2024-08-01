import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validateForm, validateFormLogo } from './companyValidation';
import { vr } from '../../helpers/vr';
import ProtectedLayout from '../layouts/ProtectedLayout';
import { useRef } from 'react';
import useCompanyStore from './useCompanyStore';
import InputField from '../../formc/InputField';
import Submit from '../../formc/Submit';
import InputFile from '../../formc/InputFile';

export default function () {

    const navigate = useNavigate()
    const fileInputRef = useRef()
    const params = useParams()

    const { show, item, update, updateLogo, error } = useCompanyStore()
    const [formValues, setFormValues] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        show(params.id)
    }, [params.id])

    useEffect(() => {
        setFormValues({
            id: params.id,
            name: item.name,
            email: item.email ?? "",
            logo: item.logo ?? "",
            logo_url: item.logo ?? "",
            website: item.website ?? "",
        })
    }, [item, params])

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
                await update(newFormData)
                // navigate('/admin/companies')
            } catch (error) {
                console.error(error)
            }
        }
    }


    return (

        <ProtectedLayout roles="admin">
            <div className="page-header">
                <h1>Edit Company</h1>
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
