import express from 'express';
import Controller from '../controllers/studentController.js';

const rt = express.Router();

// Get all students
rt.get('/', async (req, res) => {
  try {
    const data = await Controller.getAllStd();
    res.status(200).json({ status: '200', result: data });
  } catch (err) {
    res.status(500).json({ status: '500', result: 'Server Error' });
  }
});

// Get student by ID
rt.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Controller.getStdById(id);
    res.status(200).json({ status: '200', result: data });
  } catch (err) {
    res.status(500).json({ status: '500', result: 'Server Error' });
  }
});

// Create new student
rt.post('/', async (req, res) => {
  const info = {
    id: req.body.id,
    prefix_id: req.body.prefix_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    date_of_birth: req.body.date_of_birth,
    sex: req.body.sex,
    curriculum_id: req.body.curriculum_id,
    previous_school: req.body.previous_school,
    address: req.body.address,
    telephone: req.body.telephone,
    email: req.body.email,
    line_id: req.body.line_id,
    status: req.body.status,
  };

  if (!info.first_name || !info.last_name) {
    return res.status(400).json({ status: '400', message: 'First name and last name are required.' });
  }

  try {
    const Check = await Controller.checkStdName(info.first_name, info.last_name);

    if (Check) {
      return res.status(400).json({ status: '400', message: 'Already exists' });
    }

    // Proceed with creating the student if no duplicate is found
    const checkedStd = await Controller.createStd(info);
    return res.status(201).json({ status: '201', result: checkedStd });
  } catch (err) {
    console.error('Error creating student:', err);
    return res.status(500).json({ status: '500', message: 'Server Error' });
  }
});

// Update student
rt.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const info = await Controller.updateStd(id, req.body);
    res.status(200).json({ status: '200', result: info });
  } catch (err) {
    res.status(500).json({ status: '500', result: 'Server Error' });
  }
});

// Force delete student
rt.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ status:'400', result: 'ID is requires.'})
    }
    try{
        const data = await Controller.deleteStd(id);
        res.status(200).json({ status: '200', result: data, desc: 'Deleted completed' });
    } catch (err){
        res.status(500).json({ status: '500', result: 'Server Error'});
    }
})

export default rt;
