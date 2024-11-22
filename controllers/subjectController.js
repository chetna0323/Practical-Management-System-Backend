import Subject from '../models/Subject.js';
import User from '../models/User.js';

export const createSubject = async (req, res) => {
    try {
        const { name, code, createdByEmail } = req.body;

        if (!name || !code || !createdByEmail) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email: createdByEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newSubject = new Subject({
            name,
            code,
            createdBy: user._id, 
        });

        const savedSubject = await newSubject.save();

        res.status(201).json({
            message: 'Subject created successfully',
            savedSubject,
        });
    } catch (error) {
        console.error("Error creating subject:", error);
        res.status(500).json({ error: 'Error creating subject' });
    }
};



export const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json({ subjects });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching subjects' });
    }
};