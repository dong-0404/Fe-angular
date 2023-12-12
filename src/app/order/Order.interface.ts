export interface Order {
    id: number,
    customer_id: number;
    user_id: number;
    status_id: number;
    total_amount: number;
    product_id: number;
    quantity: number;
}