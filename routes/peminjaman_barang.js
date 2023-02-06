const express = require('express');
const router = express.Router();

//import express validator
const { body, validationResult } = require('express-validator');

//import database
const connection = require('../config/database');

/**
 * INDEX POSTS
 */
router.get('/', function (req, res) {
    //query
    connection.query('SELECT * FROM peminjaman_barang ORDER BY id desc', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data  peminjaman barang',
                data: rows
            })
        }
    });
});

/**
 * STORE POST
 */
router.post('/store', [

    //validation
    body('nama_lengkap').notEmpty(),
    body('nim').notEmpty(),
    body('prodi').notEmpty(),
    body('fakultas').notEmpty(),
    body('nama_barang').notEmpty(),
    body('tanggal_pinjam').notEmpty(),
    body('tanggal_kembali').notEmpty(),

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //define formData
    let formData = {
        nama_lengkap: req.body.nama_lengkap,
        nim: req.body.nim,
        prodi: req.body.prodi,
        fakultas: req.body.fakultas,
        nama_barang: req.body.nama_barang,
        tanggal_pinjam: req.body.tanggal_pinjam,
        tanggal_kembali: req.body.tanggal_kembali,
    }

    // insert query
    connection.query('INSERT INTO peminjaman_barang SET ?', formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(250).json({
                status: true,
                message: 'Insert Data Successfully',
                data: rows[0]
            })
        }
    })

});

/**
 * SHOW POST
 */
router.get('/(:id)', function (req, res) {

    let id = req.params.id;

    connection.query(`SELECT * FROM peminjaman_barang WHERE id = ${id}`, function (err, rows) {

        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        }

        // if post not found
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'Data  peminjaman barang Not Found!',
            })
        }
        // if post found
        else {
            return res.status(200).json({
                status: true,
                message: 'Detail Data peminjaman barang',
                data: rows[0]
            })
        }
    })
});

/**
 * UPDATE db
 */
router.patch('/update/:id', [

    //validation
    body('nama_lengkap').notEmpty(),
    body('nim').notEmpty(),
    body('prodi').notEmpty(),
    body('fakultas').notEmpty(),
    body('nama_barang').notEmpty(),
    body('tanggal_pinjam').notEmpty(),
    body('tanggal_kembali').notEmpty(),

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //id post
    let id = req.params.id;

    //data post
    let formData = {
        nama_lengkap: req.body.nama_lengkap,
        nim: req.body.nim,
        prodi: req.body.prodi,
        fakultas: req.body.fakultas,
        nama_barang: req.body.nama_barang,
        tanggal_pinjam: req.body.tanggal_pinjam,
        tanggal_kembali: req.body.tanggal_kembali,
    }

    // update query
    connection.query(`UPDATE peminjaman_barang SET ? WHERE id = ${id}`, formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update Data Successfully!'
            })
        }
    })

});
router.get('/show/:id', function (req, res) {

    let id = req.params.id;

    connection.query('SELECT * FROM peminjaman_barang ORDER BY id desc', function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'show Data Successfully!',
            })
        }
    })
});
/**
 * DELETE 
 */
router.delete('/delete/(:id)', function (req, res) {

    let id = req.params.id;

    connection.query(`DELETE FROM peminjaman_barang WHERE id = ${id}`, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Delete Data Successfully!',
            })
        }
    })
});

module.exports = router;