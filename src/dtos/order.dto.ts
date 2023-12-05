import OrderItemDTO from "./orderItem.dto";

type OrderDTO = {
    Total: number;
    UserId: number;
    PaymentMethod: number;
    OrderItems: OrderItemDTO[];
};

export default OrderDTO;