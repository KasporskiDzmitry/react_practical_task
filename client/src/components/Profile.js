import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import {update} from "./UserFunctions";
import '../style.css'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            phone_number: '',
            address: '',
            email: '',

            changesInfoVisible: false
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            id_user: decoded.id_user,
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            phone_number: decoded.phone_number,
            address: decoded.address,
            email: decoded.email
        })
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()

        const user = {
            id_user: this.state.id_user,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone_number: this.state.phone_number,
            address: this.state.address,
            email: this.state.email
        }

        update(user).then(res => {
            this.props.history.push('/profile')
            this.setState({changesInfoVisible : true})
        })
    }

    render () {
        return (
            <div className="container">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mt-3 mx-auto">
                                {
                                    this.state.changesInfoVisible ? <Changes /> : null
                                }
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="first_name">First Name</label>
                                        <input type="text"
                                               className="form-control"
                                               name="first_name"
                                               placeholder="Enter Fist Name"
                                               value={this.state.first_name}
                                               onChange={this.onChange}
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
                                        />
                                    </div>
                                    <button type="submit"
                                            className="btn btn-lg btn-primary btn-block">
                                        Update profile
                                    </button>
                                </form>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

class Changes extends Component{
    render() {
        return (
            <div id="changes_info">
                <span><strong>Changes saved.</strong></span>
                <span>Your profile has been successfully updated.</span>
            </div>
        )
    }
}


export default Profile