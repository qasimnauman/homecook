export function getCartId() {
    let cartId = localStorage.getItem("cartId");
    if (!cartId) {
        cartId = crypto.randomUUID();
        localStorage.setItem("cartId", cartId);
    }
    return cartId;
}