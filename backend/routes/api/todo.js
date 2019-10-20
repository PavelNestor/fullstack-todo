const express = require("express");
const todoRouter = express.Router();
const Todo = require("../../models/Todo");

todoRouter.get("/", (req, res, next) => {
    Todo.find({ user: req.user._id }, (err, todos) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.send(todos);
    });
});

todoRouter.post("/add", (req, res, next) => {
    const todo = new Todo(req.body);
    todo.user = req.user._id;
    todo.save(function (err, newTodo) {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(201).send(newTodo);
    });
});

todoRouter.get("/:id", (req, res, next) => {
    Todo.findOne({ _id: req.params.todoId, user: req.user._id }, (err, todo) => {
        if (err) {
            res.status(500);
            return next(err);
        } else if (!todo) {
            res.status(404)
            return next(new Error("No todo item found."));
        }
        return res.send(todo);
    });
});

todoRouter.put("/update/:id", (req, res, next) => {
    Todo.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body,
        { new: true },
        (err, todo) => {
            if (err) {
                console.log("Error");
                res.status(500);
                return next(err);
            }
            return res.send(todo);
        }
    );
});

todoRouter.delete("/delete/:id", (req, res, next) => {
    console.log('req.params.todoId',req.params);
    console.log('req.user._id',req.user._id);
    
    Todo.findOneAndRemove({ _id: req.params.id, user: req.user._id }, (err, todo) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.send(todo);
    });
});

module.exports = todoRouter;
