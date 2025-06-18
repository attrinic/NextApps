'use client'

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const AddUser = () => {

    const nextApiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const [user, setUser] = useState({
        "firstName": '',
        "lastName": '',
        "email": '',
        "gender": '',
        "dob": '',
        "address": '',
        "password": '',
        "confirmPassword": '',
        "phone": ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // stop page refresh
        let firstName = user.firstName.trim();
        let lastName = user.lastName.trim();
        let email = user.email.trim();
        let gender = user.gender.trim();
        let dob = user.dob.trim();
        let address = user.address.trim();
        let password = user.password.trim();
        let confirmPassword = user.confirmPassword.trim();
        if (password != confirmPassword) {
            alert("Password and confirm password should be same.");

            return;
        }
        let phone = user.phone.trim();

        if (firstName) {
            const newUser = {
                ...user,
                'name' : {
                    'firstName': firstName,
                    'lastName': lastName
                },
                'email': email,
                'gender': gender,
                'dob': dob,
                'address': address,
                'password': password,
                'phone': phone,
                'userType': 'customer',
                'createdOn': new Date().toISOString()
            }
            console.log(newUser);

            fetch(`${nextApiUrl}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then((response) => response.json())
            .then((userResponse) => {
                console.log(userResponse);
                if (userResponse.status == '1') {
                    alert("User Created Successfully")
                    router.push('/');
                }
            });
        }
    }

    return (
        <div className="container mt-4">
            <h1>User Registration</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" name="firstName" placeholder="First Name" value={user.firstName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" name="lastName" placeholder="Last Name" value={user.lastName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" name="email" placeholder="Email" value={user.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <div className="form-check form-check-inline ms-2">
                        <input className="form-check-input" type="radio" name="gender" id="male" value="Male" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="male">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" id="female" value="Female" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="female">Female</label>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="datepicker" className="form-label">Date of Birth</label>
                    <input type="date" className="form-control" name="dob" placeholder="Date of Birth" value={user.dob} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" placeholder="Address" value={user.address} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" value={user.confirmPassword} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" name="phone" placeholder="Phone" value={user.phone} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Add User</button>
            </form>
        </div>
    );
}

export default AddUser;