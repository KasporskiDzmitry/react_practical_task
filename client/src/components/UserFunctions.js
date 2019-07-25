import axios from 'axios'

export const register = newUser => {
    return axios
        .post('users/register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            phone_number: newUser.phone_number,
            address: newUser.address,
            email: newUser.email,
            password: newUser.password
        })
        .then(res => {
            console.log("Registered")
            return res
        })
        .catch(err => {
            console.log(err)
        })
}

export const login = user => {
    return axios
        .post('users/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const update = user => {
    return axios
        .post('users/update', {
            user: user
        })
        .then(res => {
            localStorage.removeItem('usertoken')
            localStorage.setItem('usertoken', res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}