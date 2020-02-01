import createStore from 'unistore';

const initialState = {
};

export const store = createStore(initialState);

export const actions = (store) => ({
    handleTogglerNavbar: () => {
        const toggler = document.getElementById('navbarToggler')
        if(toggler.innerHTML==='menu'){
            toggler.innerHTML='close'
        } else{
            toggler.innerHTML='menu'
        }
    }
});