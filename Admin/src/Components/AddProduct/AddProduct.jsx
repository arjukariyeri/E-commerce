import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

    const [image, setImage] = useState(false);

    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })


    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }



    const changeHandler = (e)=>{
            setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

        
    // const Add_Product = async ()=>{
    //     console.log(productDetails);

    //     let responseData;
    //     let product = productDetails;
        
    //     let formData = new FormData();
    //     formData.append('product',image);

    //     await fetch('http://localhost:4000/upload',{
    //         method:'POST',
    //         headers:{
    //             Accept: 'application/json',               
    //         },
    //         body:formData,
    //     }).then((resp)=> resp.json()).then((data)=>{responseData=data})

    //     if(responseData.success)
    //     {
    //         product.image = responseData.image_url;
    //         console.log(product);
    //     }


    // const Add_Product = async () => {
    //     console.log(productDetails);
    
    //     try {
    //         const formData = new FormData();
    //         formData.append('product', image);
    
    //         const response = await fetch('http://localhost:4000/upload', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //             },
    //             body: formData,
    //         });
    
    //         if (!response.ok) {
    //             throw new Error('Failed to upload image');
    //         }
    
    //         const responseData = await response.json();
    //         console.log('Response from server:', responseData);
    
    //         if (responseData.success && responseData.Image_url) { // Update here
    //             setProductDetails(prevDetails => ({
    //                 ...prevDetails,
    //                 image: responseData.Image_url, // Update here
    //             }));
    //             console.log('Product with image:', productDetails);
    //         } else {
    //             console.error('Image URL not found in response');
    //         }
    //     } catch (error) {
    //         console.error('Error uploading image:', error);
    //     }




    //     await fetch('http://localhost:4000/addproduct',{

    //         method:'POST',
    //         headers:{
    //             Accept:'application/json',
    //             'Content-Type':'application/json',

    //         },
    //         body:JSON.stringify(product),
    //     }).then((resp)=>resp.json()).then.((data)=>{
    //         data.success?alert("Product Added"):alert("Failed")

    //     })




    // };
    



    
    const Add_Product = async () => {
        console.log(productDetails);
    
        try {
            const formData = new FormData();
            formData.append('product', image);
    
            const uploadResponse = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });
    
            if (!uploadResponse.ok) {
                throw new Error('Failed to upload image');
            }
    
            const uploadData = await uploadResponse.json();
            console.log('Response from upload server:', uploadData);
    
            if (uploadData.success && uploadData.Image_url) {
                const productWithImage = {
                    ...productDetails,
                    image: uploadData.Image_url,
                };
    
                const addProductResponse = await fetch('http://localhost:4000/addproduct', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productWithImage),
                });
    
                const addProductData = await addProductResponse.json();
                console.log('Response from addproduct server:', addProductData);
    
                if (addProductData.success) {
                    alert('Product Added');
                } else {
                    alert('Failed to add product');
                }
            } else {
                console.error('Image URL not found in upload response');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the product');
        }
    };

    





    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className='addproduct-itemfield'>
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type here' />
                </div>

                <div className='addproduct-itemfield'>
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>

                </select>
            </div>

            <div className="addproduct-itemfield">
                <label htmlFor="file-input">

                    <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />

                </label>

                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
        </div>

    )
}

export default AddProduct