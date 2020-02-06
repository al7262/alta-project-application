import createStore from 'unistore';
import axios from 'axios';
import swal from 'sweetalert2';

const initialState = {
    search: '',
    data: undefined,
    error: undefined,
    isOwner: false,
    isLogin: false,
    baseUrl: 'https://api.easy.my.id/',
    claims: undefined,
    outletList: undefined,
    categoryList: undefined,
    itemList: undefined,
    outlet: undefined,
    cashierName: undefined,
};

export const store = createStore(initialState);

export const actions = (store) => ({
    handleOnChange: (state,event) => {
        console.log(event.target.name, event.target.value)
        store.setState({[event.target.name]: event.target.value})
    },
    handleInput: (state, key, value) => {
        store.setState({[key]: value})
    },
    handleManyInput: (state, dict) => {
        store.setState({dict})
    },

    handleTogglerNavbar: () => {
        const toggler = document.getElementById('navbarToggler')
        const headerLocation = document.getElementById('header-location')
        if(toggler.innerHTML==='menu'){
            toggler.innerHTML='close'
            headerLocation.style.visibility='hidden'
        } else{
            toggler.innerHTML='menu'
            headerLocation.style.visibility='visible'
        }
    },

    handleVisibilityPassword: () => {
        const password = document.getElementById('password')
        const visibilityPassword = document.getElementById('visibilityPassword')
        if(visibilityPassword.innerHTML==='visibility'){
            password.type='text';
            visibilityPassword.innerHTML='visibility_off';
        } else{
            password.type='password';
            visibilityPassword.innerHTML='visibility';
        }
    },
    /**
     * Handling API to post, put, get, and delete action through AXIOS.
     * @param {dict} input the object containing detail of axios input.
    */
    handleApi: async (state, input) => {
        await axios(input)
        .then(async (response) => {
            if (response.status === 200) {
            await store.setState({ data: response.data });
            } else {
            await store.setState({ error: response });
            }
        })
        .catch((error) => {
            console.warn(error);
        });
    },

    /**
     * Checking login status of the user everytime page was mounted
     */
    checkLoginStatus: async (state) => {
        const input = {
            method: 'get',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            url: state.baseUrl+'login/apps',
        };
        await axios(input)
        .then(async (response) => {
            if(response.data!==''||response.data!==undefined){
                if (response.data.hasOwnProperty('claims')) {
                    if (response.data.claims.email) {
                        await store.setState({ isOwner: true });
                    }
                    await store.setState({ isLogin: true });
                    console.log('check check', state.isLogin, state.isOwner)
                    await store.setState({ claims: response.data.claims });
                } else {
                    await store.setState({ isLogin: false });
                }
            }
        })
        .catch((error) => {
            console.warn(error);
        });
    },

    /**
     * Handling logout when user click log out butten
     */
    handleLogout: async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('cart')
        await store.setState({ isLogin: false });
        await store.setState({ isAdmin: false });
        swal.fire({
        title: 'Good bye!',
        text: 'You have successfully logged out!',
        icon: 'success',
        timer: 2000,
        confirmButtonText: 'understood',
        });
    },

    /**
     * Handle reset data in global state everytime page will unmount
     */
    handleReset: async () => {
        await store.setState({data:undefined, error:undefined})
    },

    /**
     * get list category from database
     * response was saved in store.data
     */
    getCategory: async (state) => {
        const input = {
        method: 'get',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        url: state.baseUrl+'category/list',
        };
        await axios(input)
        .then(async (response) => {
            await store.setState({ categoryList: response.data.result });
        })
        .catch((error) => {
            console.warn(error);
        });
    },

    /**
     * get list outlet from database
     * response was saved in store.data
     */
    getOutlet: async (state) => {
        const input = {
        method: 'get',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        url: state.baseUrl+'outlet',
        };
        await axios(input)
        .then(async (response) => {
            await store.setState({ outletList: response.data });
        })
        .catch((error) => {
            console.warn(error);
        });
    },

    getOwnerInformation: async(state) => {
        const input = {
            method: 'get',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            url: state.baseUrl+'user/profile',
        };
        await axios(input)
        .then(async (response) => {
            const name = response.data.fullname.split(" ")
            await store.setState({ cashierName: name[0] });
        })
        .catch((error) => {
            console.warn(error);
        });
    },

    getEmployeeInformation: async(state) => {
        const input = {
            method: 'get',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            url: state.baseUrl+'employee',
        };
        await axios(input)
        .then(async (response) => {
            const name = response.data.fullname.split(" ")
            await store.setState({ cashierName: name[0] });
        })
        .catch((error) => {
            console.warn(error);
        });
    },

    handleError: async (state) => {
        if(state.error!==undefined){
          await swal.fire({
            title: 'Error!',
            text: state.error.data.message,
            icon: 'error',
            timer: 1500,
            confirmButtonText: 'understood',
            confirmButtonColor: '#b36232',
          });
          await store.setState({error: undefined})
        }
    },
});