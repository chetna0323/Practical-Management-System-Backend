

import express from "express";

import {
  createAdmin,createStudent,createTeacher,getAllUsers,getStudents,getTeachers,getAdmins,} from "../controllers/userController.js";

import {
  createSubject,getSubjects,} from "../controllers/subjectController.js";

import {
  createPractical,enrollInPractical,getPracticals,} from "../controllers/PracticalController.js";

import { isAdmin, isTeacher, isAdminOrTeacher } from "../middleware/roleMiddleware.js"

const router = express.Router();

router.post("/admin/create", createAdmin); 
router.post("/teachers/create", createTeacher); 
router.post("/students/create", createStudent); 
router.get("/users/get",isAdmin,  getAllUsers);
router.get("/admins/get",isAdmin, getAdmins); 
router.get("/teachers/get", isAdmin, getTeachers); 
router.get("/students/get",isAdminOrTeacher, getStudents); 

router.post("/subject/create",isAdmin, createSubject); 
router.get("/subjects/get", getSubjects); 

router.post("/practicals/create", isTeacher,createPractical); 
router.get("/practicals/get",getPracticals);
router.post("/practical/enroll",enrollInPractical);

export default router;





