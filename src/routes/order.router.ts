import { Router, Request, Response, NextFunction } from "express";
import { QueryError, ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../mysql";
import OrderDTO from "../dtos/order.dto";


type OrderQueryById = {
    orderId: number;
};

type OrderQueryByUserId = {
    userId: number;
}

const orderRouter = Router();
orderRouter.get("/", (req: Request<{}, {}, {}, OrderQueryByUserId>, res: Response) => {
    pool.execute<RowDataPacket[]>(
        `SELECT Id, Total, UserId, PaymentMethod FROM Orders 
        WHERE UserId = ? 
        LEFT JOIN Users ON Orders.UserId = Users.Id`,
        [req.query.userId],
        (err, result) => {
            if (err) res.status(400).json({ Message: err.message });
            res.status(200).json(result);
        }
    );
});

orderRouter.get("/:orderId", (req: Request<OrderQueryById>, res: Response) => {
    pool.execute<RowDataPacket[]>(
        `Select * FROM Orders
        WHERE OrderId = ?
        LEFT JOIN OrderItems ON OrderItems.OrderId = Orders.Id`,
        [req.params.orderId],
        (err, result) => {
            if (err) res.status(400).json({ Message: err.message });
            res.status(200).json(result);
        }
    );
});

orderRouter.post("/", (req: Request<{}, {}, OrderDTO>, res: Response, next: NextFunction) => {
    try {
        pool.execute(
            `INSERT INTO Orders (Total, UserId, PaymentMethod) VALUES (?, ?, ?)`,
            [req.body.Total, req.body.UserId, req.body.PaymentMethod],
            err => {
                if (err) {
                    console.log(err);
                    next(err);
                    return;
                }
            }
        );
    } catch (error) {
        console.log(error);
        return;
    }
});

export default orderRouter;