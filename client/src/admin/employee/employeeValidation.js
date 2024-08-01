export const validateForm = (key, value) => {
    switch (key) {
        case "name":
            return (value.length === 0) ? "Name equired" : false;
        case 'email':
            if (value && value.length !== 0) {
                const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                return !regex.test(value) ? 'Email is not valid' : false
            } else {
                return false
                
            }
        case 'company_id':
            console.log("company_id", value);
            if (value && value.length === 0) {
                return "Company required"
            } else {
                return false
                
            }
        default:
            return false;
    }
}

export const validateFormLogo = (key, value) => {
    switch (key) {
        default:
            return false;
    }
}