'use client'

import Link from "next/link";
import { useState, useEffect } from 'react';

function categoriesList() {

    const [categories, setCategories] = useState([]);

    const handleRemove = (id) => {
        if (!confirm(`Are you sure you want to remove it?`)) return;

        // Call delete API
        fetch(`http://localhost:4200/category/${id}`, {
            method: 'DELETE',
        });
    }

    useEffect(() => {
        fetch('http://localhost:4200/categories')
            .then((response) => response.json())
            .then((json) => setCategories(json));
    }, [])

    return (<div className='container mt-4'>
        <h1 className='mb-4'>categories List</h1>
        <Link className="btn link-success" href="/add-category">Add New</Link>
        <div className='row'>
            {categories.map((category) => (
                <div className='col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3' key={category._id}>
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">{category.categoryName}</h5>
                            <Link className="link-primary" href={`/category-update/${category._id}`}>Edit</Link>
                            <Link className="link-danger m-2" href='#' onClick={() => handleRemove(category._id)}>Remove</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    </div>
    );
}

export default categoriesList;