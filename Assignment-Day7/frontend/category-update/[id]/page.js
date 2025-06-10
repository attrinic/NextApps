'use client'

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const CategoryUpdate = () => {
    const { id } = useParams();
    const [category, setCategory] = useState({
        "categoryName": ""
    });

    //debugger

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:4200/category/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("API Response for edit cat:", data);
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
            // onAdd(name); // calling onAdd props
            // debugger;
            console.log('newCategory for update', newCategory);
            //debugger
            fetch(`http://localhost:4200/category/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCategory)
            })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log("name", name);
        // console.log("value", value);
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