import express from 'express';
import Controller from '../controllers/student_listController.js';

const rt = express.Router();

// POST route for marking attendance in student_list
rt.post('/', async (req, res) => {
    try {
        const { student_id, section_id, status} = req.body;
        const result = await Controller.insertStdList({
            student_id,
            section_id,
            status
        });

        return res.status(200).json({ status: '200', result });
    } catch (error) {
        console.error('Error :', error);
        return res.status(500).json({ status: '500', message: 'Server Error' });
    }
});

rt.put('/', async (req, res) => {
    try {
        const { student_id, section_id, status} = req.body;

        const result = await Controller.updateStdList(student_id, section_id, {
            status
        });

        if (result.error) {
            return res.status(400).json({ status: '400', message: result.error });
        }

        return res.status(200).json({ status: '200', result });
    } catch (error) {
        console.error('Error to updating :', error);
        return res.status(500).json({ status: '500', message: 'Error to updating ' });
    }
});

// GET route to retrieve all attendance records
rt.get('/', async (req, res) => {
    try {
        const attendanceRecords = await Controller.getStdList();
        return res.status(200).json({ status: '200', result: attendanceRecords });
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        return res.status(500).json({ status: '500', result: 'Server Error '});
    }
});

export default rt;
