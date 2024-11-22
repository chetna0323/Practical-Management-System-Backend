
import Practical from '../models/Practical.js';
import Subject from '../models/Subject.js';

export const createPractical = async (req, res) => {
    try {
        const { subjectId, title, description, createdBy } = req.body;

        if (!subjectId || !title || !description || !createdBy) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        const newPractical = new Practical({ subjectId, title, description, createdBy });
        const savedPractical = await newPractical.save();

        res.status(201).json({
            message: 'Practical created successfully',
            practical: savedPractical,
        });
    } catch (error) {
        console.error('Error creating practical:', error);
        res.status(500).json({ error: 'Error creating practical' });
    }
};


export const getPracticals = async (req, res) => {
    try {
        const practicals = await Practical.find().populate('subjectId enrolledStudents');
        res.json({ practicals });
    } catch (error) {
        console.error("Error fetching practicals:", error.message);
        res.status(500).json({ error: 'Error fetching practicals' });
    }
};


export const enrollInPractical = async (req, res) => {
    try {
        const { practicalId, studentId } = req.body;

        if (!practicalId || !studentId) {
            return res.status(400).json({ error: 'Practical ID and Student ID are required' });
        }

        const practical = await Practical.findById(practicalId);
        if (!practical) {
            return res.status(404).json({ error: 'Practical not found' });
        }

        if (practical.enrolledStudents.includes(studentId)) {
            return res.status(400).json({ error: 'Student already enrolled' });
        }

        practical.enrolledStudents.push(studentId);
        await practical.save();

        res.json({ message: 'Student enrolled successfully', practical });
    } catch (error) {
        console.error('Error enrolling in practical:', error.message);
        res.status(500).json({ error: 'Error enrolling in practical' });
    }
};
