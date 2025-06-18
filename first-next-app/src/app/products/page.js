'use client'

import Link from "next/link";
import { useState, useEffect } from 'react';

function ProductList() {

    const nextApiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [products, setProducts] = useState([]);
    
    const handleRemove = (id) => {
        if (!confirm(`Are you sure you want to remove it?`)) return;

        // Call delete API
        fetch(`${nextApiUrl}/products/${id}`, {
            method: 'DELETE',
        });
        // For nextJS API
        // fetch(`http://localhost:3000/api/product/${id}`, {
        //     method: 'DELETE',
        // });
    }

    useEffect(() => {
        fetch(`${nextApiUrl}/products`)
            .then((response) => response.json())
            .then((json) => setProducts(json));
    }, [])

    return (<div className='container mt-4'>
        <h1 className='mb-4'>Product List</h1>
        <div className='row'>
            {products.map((product) => (
                <div className='col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3' key={product._id}>
                    <div className="card h-100">
                        <img src={product.imageUrl} style={{ height: '200px' }} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{product.productName}</h5>
                            <p className="card-text"><strong>Code:</strong>{product.productCode}</p>
                            <p className="card-text">{product.description}</p>
                            <p className="card-text"><strong>Rating:</strong>{product.starRating}</p>
                            <p className="card-text">{product.price}</p>
                            <p className="card-text">Released: {product.releaseDate}</p>
                            <Link className="btn btn-primary" href={`/product-detail/${product._id}`}>Buy Now</Link>
                            <button className="btn btn-danger m-2" onClick={() => handleRemove(product._id)}>Remove</button>
                            <Link className="btn btn-primary" href={`/product-update/${product._id}`}>Update</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    </div>
    );
}

export default ProductList;