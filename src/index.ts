import express, { json } from 'express';
import userRouter from './routes/user.router';
import orderRouter from './routes/order.router';

const app = express();
const port = 3000;

app.use(json());
app.use("/users", userRouter);
app.use("/orders", orderRouter);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});