import createStore from 'unistore';
import axios from 'axios';
import swal from 'sweetalert2';

const initialState = {
    search: '',
    data: undefined,
    error: undefined,
    isOwner: false,
    isLogin: false,
    // baseUrl: 'http://0.0.0.0:5000/',
    baseUrl: 'https://api.easy.my.id/',
    claims: undefined,
    outletList: undefined,
    outletDetails: undefined,
    categoryList: undefined,
    customerList: undefined,
    itemList: undefined,
    outlet: undefined,
    cashierName: undefined,
    orderDetails: undefined,
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
                    await store.setState({ claims: response.data.claims });
                    if (response.data.claims.email) {
                        await store.setState({ isOwner: true });
                    }
                    await store.setState({ isLogin: true });
                    console.log(store.getState().claims)
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
    handleLogout: async (state) => {
        await localStorage.removeItem('token');
        await localStorage.removeItem('cart');
        await store.setState(initialState);
        swal.fire({
            title: 'Good bye!',
            text: 'You have successfully logged out!',
            icon: 'success',
            timer: 2000,
            confirmButtonText: 'understood',
        });
    },

    /**
     * Handle reset data and error in global state everytime page will unmount
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
        url: state.baseUrl+'product/category',
        };
        await axios(input)
        .then(async (response) => {
            await store.setState({ categoryList: response.data });
        })
        .catch((error) => {
            console.warn(error);
        });
    },
    
    /**
     * get list item based on category from database
     * response was saved in store.data
     */
    getItem: async (state, category) => {
        const input = {
            method: 'get',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            url: state.baseUrl+'product',
            params: {
                category: category,
                id_outlet: store.getState().outlet
            }
        };
        await axios(input)
        .then(async (response) => {
            await store.setState({ itemList: response.data });
            console.log(response)
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

    /**
     * get list outlet from database
     * response was saved in store.data
     */
    getOutletDetails: async (state) => {
        console.log(state.outlet)
        const input = {
        method: 'get',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        url: state.baseUrl+'outlet/get/'+state.outlet,
        };
        await axios(input)
        .then(async (response) => {
            await store.setState({ outletDetails: response.data });
        })
        .catch((error) => {
            console.warn(error);
        });
    },

    /**
     * get list customer from database
     * response was saved in store.data
     */
    getCustomer: async (state) => {
        const input = {
        method: 'get',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        url: state.baseUrl+'customer',
        };
        await axios(input)
        .then(async (response) => {
            await store.setState({ customerList: response.data.list_all_customer });
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
                'Access-Control-Allow-Origin': '*',
            },
            url: state.baseUrl+'employee/search',
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

    addToCart: async (state, input) => {
        const cart = localStorage.getItem('cart') === null ? [] : JSON.parse(localStorage.getItem('cart'));
        const dict = input;
        dict['unit'] = 1
        cart.push(dict);
        console.log(cart)
        localStorage.setItem('cart', JSON.stringify(cart));
    },
    
    emptyCart: (state) =>{
        localStorage.removeItem('cart')
    },
      
    updateCart: (state, id, qty)=>{
        const cart = JSON.parse(localStorage.getItem('cart'));
        let newCart;
        console.log(cart)
        if(Array.isArray(cart)){
            cart.forEach(item => {
                if(item.id===id){
                    item.unit += qty
                    if(item.unit>item.stock){
                        item.unit=item.stock
                    }
                }
            });
            newCart = cart.filter((item)=>{
                return item.unit>0
            })
        }
        localStorage.setItem('cart', JSON.stringify(newCart))
    },
});