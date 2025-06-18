'use client'

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect} from "react";

const CategoryUpdate = () => {
    const nextApiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { id } = useParams();
    const [category, setCategory] = useState({
        "categoryName": ""
    });

    const router = useRouter();

    useEffect(() => {
        if (!id) return;

        fetch(`${nextApiUrl}/categories/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("API Response for edit category:", data);
                setCategory(data)
            })
            .catch((err) => {
                console.log(err.message);
            })

    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault(); // stop page refresh
        let catName = category.categoryName.trim();
        if (catName) {
            const newCategory = {
                ...category,
                categoryName: catName
            }

            fetch(`${nextApiUrl}/categories/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCategory)
            })

            router.push('/categories');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCategory((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (<div className="container mt-4">
        <h1>Update Category</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <input type="text" className="form-control" name="categoryName" placeholder="Category Name" value={category.categoryName} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Update Category</button>
        </form>
    </div>);
}

export default CategoryUpdate;