import { useState } from "react";
import { Button, message } from "antd";
import { addToCart } from "../Api";

function AddToCartButton({ item }) {
    const [loading, setLoading] = useState(false);
    const addProductToCart = () => {
        setLoading(true);
        addToCart(item.id).then((res) => {
            message.success(`${item.title} has been added to cart!`);
            setLoading(false);
        });
    };
    return (
        <Button
            type="link"
            onClick={() => {
                addProductToCart();
            }}
            loading={loading}
        >
            Add to Cart
        </Button>
    );
};

export default AddToCartButton;