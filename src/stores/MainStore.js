import createStore from 'unistore';

const initialState = {
};

export const store = createStore(initialState);

export const actions = (store) => ({
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
    }
});