import React, { useEffect, useState } from 'react'
import { getAllProductImages } from '../services/ProductService';
import { toast } from 'react-toastify';

const ProductImage = ({productId}) => {
    const [images, setImages] = useState([])
    useEffect(() => {
        getAllProductImages(productId).then(data => {
            setImages(data)
        }).catch(err => {
            toast.error("error while fetching product images")
        })
    }, []);
    return (
        <div> <img
            className="rounded"
            style={{ objectFit: "cover" }}
            height={60}
            width={60}
            src={images[0]}
            alt=""
        /></div>
    )
}

export default ProductImage