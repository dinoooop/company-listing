export const validateForm = (key, value) => {
    switch (key) {
        case "name":
            return (value.length === 0) ? "Name equired" : false;
        case 'email':
            if (value?.length === 0) {
                return false
            } else {
                const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                return !regex.test(value) ? 'Email is not valid' : false
            }
        case 'website':
            if (value && value.length !== 0) {
                try {
                    new URL(value);
                    return false;
                } catch (_) {
                    return "Invalid URL";
                }
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