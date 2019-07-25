import React, { Component } from 'react'
import { register } from './UserFunctions'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            phone_number: '',
            address: '',
            email: '',
            password: '',

            error: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()

        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone_number: this.state.phone_number,
            address: this.state.address,
            email: this.state.email,
            password: this.state.password
        }

        register(user)
            .then(res => {
                if (res && res.status === 200) {
                    this.props.history.push(`/login`)
                } else {
                    this.setState({error: 'User with this email address already exists'})
                }
        })
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-4 mx-auto">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input type="text"
                                       className="form-control"
                                       name="first_name"
                                       placeholder="Enter Fist Name"
                                       value={this.state.first_name}
                                       onChange={this.onChange}
                                       required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input type="text"
                                       className="form-control"
                                       name="last_name"
                                       placeholder="Enter Last Name"
                                       value={this.state.last_name}
                                       onChange={this.onChange}
                                       required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone_number">Phone number</label>
                                <input type="text"
                                       className="form-control"
                                       name="phone_number"
                                       placeholder="Enter Phone number"
                                       value={this.state.phone_number}
                                       onChange={this.onChange}
                                       required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input type="text"
                                       className="form-control"
                                       name="address"
                                       placeholder="Enter Address"
                                       value={this.state.address}
                                       onChange={this.onChange}
                                       required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email"
                                       className="form-control"
                                       name="email"
                                       placeholder="Enter Email"
                                       value={this.state.email}
                                       onChange={this.onChange}
                                       required
                                />
                            </div>
                            <div className="error">
                                {this.state.error}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                       className="form-control"
                                       name="password"
                                       placeholder="Enter Password"
                                       value={this.state.password}
                                       onChange={this.onChange}
                                       required
                                />
                            </div>
                            <button type="submit"
                                    className="btn btn-lg btn-primary btn-block">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register