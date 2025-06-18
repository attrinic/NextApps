export default function HomePage() {

    const productArr = [
        {
            id: 1,
            name: 'Product 1',
            description: 'Description for product 1',
            price: 19.99,
            image: 'https://dummyimage.com/300/09f.png/fff',
        },
        {
            id: 2,
            name: 'Product 2',
            description: 'Description for product 2',
            price: 29.99,
            image: 'https://dummyimage.com/300.png/09f/fff',
        },
        {
            id: 3,
            name: 'Product 3',
            description: 'Description for product 2',
            price: 29.99,
            image: 'https://dummyimage.com/300.png/09f/fff',
        },
        {
            id: 4,
            name: 'Product 4',
            description: 'Description for product 2',
            price: 29.99,
            image: 'https://dummyimage.com/300.png/09f/fff',
        }
        // Add more product data
    ];

    return (
        <div>
            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner height-150">
                    <div className="carousel-item active">
                        <img src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            
            <div className='text-center p-3 footer'>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <a className='text-dark' href='https://test.com/'>
                    attri.com
                </a>
            </div>
        </div>
    )
}