const express = require('express');

const router = express.Router();

const controller = require('./controllers');

router.get('/todos', controller.getTodos);

router.get('/todos/deleted', controller.getDeletedTodos);

router.post('/todos', controller.postTodos);

router.patch('/todos/:tid', controller.patchTodos);

router.patch('/todos/delete/:tid', controller.deleteTodos);

module.exports = router;
