import createStore from 'unistore';

const initialState = {
    search: ''
};

export const store = createStore(initialState);

export const actions = (store) => ({
    handleOnChange: (state,event) => {
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
});