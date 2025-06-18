'use client'

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ProductUpdate = () => {
    const nextApiUrl = process.env.NEXT_PUBLIC_API_URL;

    const router = useRouter();
    
    const { id } = useParams();
    const [product, setProduct] = useState({
        "productName": "",
        "productCode": "",
        "releaseDate": "",
        "description": "",
        "price": "",
        "starRating": "",
        "imageUrl": ""
    });

    useEffect(() => {
        if (!id) return;

        fetch(`${nextApiUrl}/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("API Response", data);
                setProduct(data)
            })
            .catch((err) => {
                console.log(err.message);
            })

    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault(); // stop page refresh
        if (product.productName.trim()) {
            const newProduct = {
                ...product,
                productId: Number(new Date())
            }
    
            console.log(newProduct);

            const res = await fetch(`${nextApiUrl}/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            })

            if (!res.ok) {
                throw new Error('Failed to update product');
            }

            router.push('/products');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduct((prev) => ({
            ...prev,
            [name]: name === 'price' || name === 'starRating' ? parseFloat(value) || '' : value
        }))
    }

    return (<div className="container mt-4">
        <h1>Update Product</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <input type="text" className="form-control" name="productName" placeholder="Product Name" value={product.productName} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <input type="text" className="form-control" name="productCode" placeholder="Product Code" value={product.productCode} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <input type="date" className="form-control" name="releaseDate" placeholder="Date" value={product.releaseDate} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <input type="text" className="form-control" name="description" placeholder="Description" value={product.description} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <input type="number" className="form-control" name="price" placeholder="Price" value={product.price} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <input type="number" className="form-control" name="starRating" placeholder="Rating" value={product.starRating} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <input type="text" className="form-control" name="imageUrl" placeholder="Image Url" value={product.imageUrl} onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-primary">Update Product</button>
        </form>
    </div>);
}

export default ProductUpdate;