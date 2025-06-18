'use client'

import { useState } from "react";

const AddCategory = () => {
    const [category, setCategory] = useState({
        "categoryName": ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log("name", name);
        // console.log("value", value);
        setCategory((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // stop page refresh
        let catName = category.categoryName.trim();
        if (catName) {
            const newCategory = {
                'categoryName': catName
            }
            console.log("NewCat::", newCategory);
            fetch('http://localhost:4200/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCategory)
            }).then((response) => response.json())
                .then((json) => console.log(json));
        }
    }

    return (
        <div className="container mt-4">
            <h1>This is Add Category Functional Component</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" className="form-control" name="categoryName" placeholder="Category Name" value={category.categoryName} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Add Category</button>
            </form>
        </div>
    );
}

export default AddCategory;