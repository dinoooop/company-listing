// validator
export class vr {

	static validate(e, validateForm, formValues = null) {

		const { name, value, type, checked, files, options, multiple, dataset } = e.target;
		
		if(dataset.customField == "single-select"){
			const {customValue, customName} = dataset;
			
			return {
				formValues: { [customName]: customValue },
				error: { [customName]: validateForm(customName, customValue) }
			}
		}

		if (type === 'file') {

			const file = files[0]
			const error = validateForm(name, file)

			if(name === 'logo'){
				const fileUrl = URL.createObjectURL(file);
				return {
					formValues: { [name]: file, [name + '_url']: fileUrl },
					error: { [name]: error }
				}

			}
			return {
				formValues: { [name]: file },
				error: { [name]: error }
			}
		} else {
			const error = validateForm(name, value, formValues)
			return {
				formValues: { [name]: value },
				error: { [name]: error }
			}
		}
	}

	static submit(formValues, validateForm) {
		const updatedErrors = {}
		Object.entries(formValues).forEach(([key, value]) => {
			updatedErrors[key] = validateForm(key, value, formValues)
		})
		const allErrorsFalse = Object.values(updatedErrors).every(error => error === false)

		if (allErrorsFalse) {
			return formValues
		}

		return { errors: updatedErrors }
	}

	static submitFile(formValues, validateField) {

		const updatedErrors = Object.fromEntries(
			Object.entries(formValues).map(([key, value]) => [key, validateField(key, value)])
		)

		const allErrorsFalse = Object.values(updatedErrors).every((error) => error === false)

		if (allErrorsFalse) {
			const newFormData = new FormData()
			Object.entries(formValues).forEach(([key, value]) => {
				newFormData.append(key, value)
			});

			return newFormData
		}

		return { errors: updatedErrors }
	}

	

}