import { create } from 'zustand';
import axios from 'axios';
import config from '../../config';

const useCompanyStore = create((set) => ({
    items: [],
    item: {},
    perPage: 0,
    total: 0,
    loading: false,
    success: '',
    error: '',
    index: async (data = {}) => {
        set({ loading: true });
        try {
            const response = await axios.get(`${config.api}/companies`, {
                params: data,
                headers: config.header().headers,
            });
            set({ 
                loading: false, 
                items: response.data.data, 
                perPage: response.data.per_page, 
                total: response.data.total 
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response ? error.response.data.message : 'Server Error',
                success: '',
            });
        }
    },
    show: async (id) => {
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.get(`${config.api}/companies/${id}`, config.header());
            set({
                loading: false,
                item: response.data,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response ? error.response.data.message : 'Server Error',
                success: '',
            });
        }
    },
    store: async (data) => {
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.post(`${config.api}/companies`, data, config.header())
            set({
                loading: false,
                item: response.data,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response ? error.response.data.message : 'Server Error',
                success: '',
            });
            throw error;
        }
    },
    update: async (data) => {
        const id = (typeof data.id === 'undefined') ? data.get('id') : data.id;

        try {
            set({ loading: true, success: '', error: '' });
            const response = await axios.post(`${config.api}/companies/${id}`, data, config.header())
            set({ loading: false })
        } catch (error) {
            set({
                loading: false,
                error: error.response ? error.response.data.message : 'Server Error',
                success: '',
            });
            throw error;
        }

    },
    updateLogo: async (data) => {
        const id = (typeof data.id === 'undefined') ? data.get('id') : data.id;

        try {
            set({ loading: true, success: '', error: '' });
            const response = await axios.post(`${config.api}/update-company-logo/${id}`, data, config.header())
            set({ loading: false })
        } catch (error) {
            set({
                loading: false,
                error: error.response ? error.response.data.message : 'Server Error',
                success: '',
            });
            throw error;
        }

    },
    destroy: async (data) => {
        console.log('data');
        console.log(data);
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.delete(`${config.api}/companies/${data.id}`, config.header())
        } catch (error) {
            set({
                loading: false,
                error: error.response ? error.response.data.message : 'Server Error',
                success: '',
            });
        }
    },
    remove: (data) => set((state) => ({
        items: state.items.filter(item => item.id !== data.id)
    })),
    reset: () => set({
        error: '',
        success: '',
        loading: false
    })
}));

export default useCompanyStore;