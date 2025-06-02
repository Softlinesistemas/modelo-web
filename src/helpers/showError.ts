import { toast } from 'react-toastify';

const showError = (error: any) => {
    if (error.response?.data?.errors) {
        toast.error(error.response.data?.errors[0])
    } else if (error?.response?.data.message) {
        toast.error(error.response.data.message)
    } else if (error?.response?.data.mensagem) {
        toast.error(error.response.data.mensagem)
    };
}

export default showError;
