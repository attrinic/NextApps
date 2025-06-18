import { dbConnect } from "@/lib/db";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
    await dbConnect();
    if (req.method === 'GET') {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error: error.message });
        }

    }
    else if (req.method === 'POST') {
        try {
            const newProduct = new Product(req.body);
            await newProduct.save();
            res.status(201).json({ message: 'Product Created Successfully', data: newProduct });

        } catch (error) {
            res.status(500).json({ message: 'Error Creating Product', error: error.message });
        }
    }
    else {
        res.status(405).json({ message: 'Method not allowed' });
    }

}
