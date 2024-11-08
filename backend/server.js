const express = require('express');
const cors = require('cors');
const sqllite3 = require('sqlite3').verbose();
const app = express();
const port = 5000;

const db = new sqllite3.Database('todoos.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        db.run('CREATE TABLE IF NOT EXISTS todoos (id INTEGER PRIMARY KEY, title TEXT, completed BOOLEAN)');
        console.log('Connected to the todoos database.');
    }
});



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/api/todoos', (req, res) => {
    db.all('SELECT * FROM todoos order by completed', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        }
        res.json(rows);
    });
});
app.post('/api/todoos', (req, res) => {
    const todo = req.body;
    db.run('INSERT INTO todoos (title, completed) VALUES (?, ?)', [todo.title, todo.completed], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        }
        res.json({ id: this.lastID });
    });
});
app.put('/api/todoos/:id', (req, res) => {
    const id = req.params.id;
    const todo = req.body;
    db.run('UPDATE todoos SET completed = ? WHERE id = ?', [todo.completed, id], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        }
        res.json({ changes: this.changes });
    });
});
app.delete('/api/todoos/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM todoos WHERE id = ?', id, function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        }
        res.json({ changes: this.changes });
    });
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

