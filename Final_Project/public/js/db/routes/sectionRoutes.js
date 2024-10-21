import express from "express";
import Controller from '../controllers/sectionController.js';

const rt = express.Router();

// Get all sections (GET /api/sections/)
rt.get('/', async (req, res) => {
    try {
        const data = await Controller.getAllSec();
        res.status(200).json({ status: '200', result: data });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: '500', result: 'Server Error' });
    }
});

// Get sections by ID (GET /api/sections/:id)
rt.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ status: '400', result: 'ID is required.' });
    }
    try {
        const info = await Controller.getSecById(id);
        if (data != null) {
            res.status(200).json({ status: '200', result: info });
        }else {
            res.status(400).json({ code: '400', description: 'Not found' });
        }
    } catch (err) {
        res.status(500).json({ status: '500', result: 'Server Error' });
    }
});

// Create a new sections (POST /api/sections/)
rt.post('/', async (req, res) => {
    const info = {
        section: req.body.section
    };
    if (!req.body.section){
        res.status(400).json({ status:'400',result: 'Section is required.' });
    }
    try {
        const check = await Controller.checkSec(info)
        if (!check) {
            const data = await Controller.createSec(info);
            res.status(201).json({ status: 201, result: data });
        }else {
            res.status(400).json({ status: '400', result: 'Already exists' });
        }
    } catch (err) {
        res.status(500).json({ status: 500, message: 'Error creating sections' });
    }
});

// Update a sections by ID (UPDATE /api/sections/:id)
rt.put('/:id', async (req, res) => {
    const { id } = req.params;
    const info = {
        section: req.body.section
    };

    if (!id) {
        res.status(400).json({status:'400',result: 'Need input.'});
    }
    try{
        const check = await Controller.checkSec(info)
        if (!check) {
            const data = await Controller.updateSec(id, info);
            res.status(201).json({ status: '201', result: data });
        }
        else{
            res.status(400).json({ status: '400', result: 'Already exists' });
        }

    }catch(err){
        res.status(500).json({ status: '500', result: 'Server Error' });
    }
});


// Force delete sections from database
rt.delete('/:id',async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ status:'400', result: 'id is requires.'})
    }
    try{
        const data = await Controller.deleteSec(id);
        res.status(200).json({ status: '200', result: data, desc: 'Deleted completed' });
    } catch (err){
        res.status(500).json({ status: '500', result: 'Server Error'});
    }
})

export default rt;