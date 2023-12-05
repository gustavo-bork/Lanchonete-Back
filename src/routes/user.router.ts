import { Router, Request, Response } from "express";
import UserDTO from "../dtos/user.dto";
import pool from "../mysql";
import { RowDataPacket } from "mysql2";

type UserQuery = {
    id: number
};

const userRouter = Router();
userRouter.get("/:id", (req: Request<UserQuery>, res: Response) => {
    pool.execute<RowDataPacket[]>("SELECT * FROM `Users` WHERE `Id` = ?", [req.params.id], (err, rows) => {
        if (err) {
            res.status(400).json(err);
            return;
        }

        rows?.length > 0 ? res.status(200).json(rows[0]) : res.status(404).json({ Message: "Usuário não encontrado" });
    });
});

userRouter.post("/", (req: Request<{}, {}, UserDTO>, res: Response) => {
    pool.execute("INSERT INTO `Users` (Login, Password) VALUES (?, ?)", [req.body.Login, req.body.Password], err => {
        if (err) return res.status(400).json({ Message: err.message });
        res.status(200).json({ Message: "Usuário cadastrado com sucesso" });
    });
});

userRouter.delete("/:id", (req: Request<UserQuery>, res: Response) => {
    pool.execute("DELETE FROM `Users` WHERE `Id` = ?", [req.params.id], err => {
        if (err) return res.status(400).json({ Message: err.message });
        res.status(200).json({ Message: "Usuário removido com sucesso" });
    });
});

export default userRouter;