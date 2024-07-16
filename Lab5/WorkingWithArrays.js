let todos = [
  {
    id: 1,
    title: "Task 1",
    description: "First task description",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    description: "Second task description",
    completed: true,
  },
  {
    id: 3,
    title: "Task 3",
    description: "Third task description",
    completed: false,
  },
  {
    id: 4,
    title: "Task 4",
    description: "Fourth task description",
    completed: true,
  },
];

export default function WorkingWithArrays(app) {
  app.get("/lab5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      description: "New task description",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  });

  app.get("/lab5/todos/:id/delete", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
      res.json(todos);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  });

  app.get("/lab5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.title = title;
      res.json(todos);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  });

  app.get("/lab5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter((t) => t.completed === completedBool);
      res.json(completedTodos);
      return;
    }

    res.json(todos);
  });

  app.get("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  });

  app.get("/lab5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.description = description;
      res.json(todos);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  });

  app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.completed = completed === "true";
      res.json(todos);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  });
}