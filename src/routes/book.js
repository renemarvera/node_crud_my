const express   = require('express');
const router    = express.Router();
const bookSchema    = require('../models/book');

// Code

// Get All Books
router.get('/books',(req,res) => 
{
    req.getConnection((err,conn)=>
    {
        if(err) return res.send(err);
        
        conn.query(
            'SELECT * FROM books',
            (err,rows) => 
            {
                res.json(rows);
            }
        );
    });
});

// Get Book
router.get('/books/:id',(req,res) => 
{
    req.getConnection((err,conn)=>
    {
        if(err) return res.send(err);
        
        conn.query(
            'SELECT * FROM books WHERE id = ?',
            [req.params.id],
            (err,rows) => 
            {
                if(err) return res.send(err);
                res.json(rows);
            }
        );

        
    });
});


// Create Book
router.post('/books',(req,res) => 
{
    req.getConnection((err,conn)=>
    {
        if(err) return res.send(err);

        console.table(req.body)
        
        conn.query(
            'INSERT INTO books SET ?',
            [req.body],
            (err,rows) => 
            {
                if(err) return res.send(err);
                res.send('Book Inserted!');
            }
        );

        
    });
});

// Update Book
router.put('/books/:id',(req,res) => 
{
    req.getConnection((err,conn)=>
    {
        if(err) return res.send(err);

        console.table(req.body)
        
        conn.query(
            'UPDATE books SET ? WHERE id = ?',
            [req.body,req.params.id],
            (err,rows) => 
            {
                if(err) return res.send(err);
                res.send('Book Updated!');
            }
        );

        
    });
});

// Delete Book
router.delete('/books/:id',(req,res) => 
{
    req.getConnection((err,conn)=>
    {
        if(err) return res.send(err);

        conn.query(
            'DELETE FROM books WHERE id = ?',
            [req.params.id],
            (err,rows) => 
            {
                if(err) return res.send(err);
                res.send('Book Deleted!');
            }
        );

        
    });
});


module.exports = router;