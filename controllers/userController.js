import User from '../models/User.js';


export const createAdmin=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const user=new User({
        name,
        email,
        password,
        role:"Admin"
    })
    const savedUser=await user.save();
    res.json({
        savedUser,
        message:"Admin created Successfully"
    })
    } 
    catch (error) {
        console.log(error);
        
        res.json({
            error:"Error Occured"
        })
        
    }
}

export const createTeacher=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const user=new User({
        name,
        email,
        password,
        role:"Teacher"
    })
    const savedUser=await user.save();
    res.json({
        savedUser,
        message:"Teacher created Successfully"
    })
    } catch (error) {
        console.log(error);
        
        res.json({
            error:"Error Occured"
        })
    }
}

export const createStudent=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const user=new User({
        name,
        email,
        password,
        role:"Student"
    })
    const savedUser=await user.save();
    res.json({
        savedUser,
        message:"Student created Successfully"
    })
    }
    
    catch (error) {
        console.log(error);
        
        res.json({
            error:"Error Occured"
        })
    }
}

export const getAdmins= async (req, res) => {
    try {
        const admin= await User.find({ role: 'Admin' });
        const adminWithoutPassword=admin.map((user)=> {
            const{password,...userWithoutPassword}=user.toObject();
        return userWithoutPassword;
        });

        res.status(200).json({
            admin:adminWithoutPassword,
            message:"Admin fetched successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching Admin' });
    }
};


export const getStudents = async (req, res) => {
    try {
        const students= await User.find({ role: 'Student' });
        const studentWithoutPassword=students.map((user)=> {
            const{password,...userWithoutPassword}=user.toObject();
        return userWithoutPassword;
        });

        res.status(200).json({
            students:studentWithoutPassword,
            message:"Students fetched successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching students' });
    }
};

export const getTeachers = async (req, res) => {
    try {
        const teachers= await User.find({ role: 'Teacher' });
        const teacherWithoutPassword=teachers.map((user)=> {
            const{password,...userWithoutPassword}=user.toObject();
        return userWithoutPassword;
        });

        res.status(200).json({
            teachers:teacherWithoutPassword,
            message:"Teachers fetched successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching teachers' });
    }
};


export const getAllUsers=async(req,res)=>{
    try {
       const users = await User.find()

       if(!users.length){
        return res.status(404).json({
            message:"No Users found",
        });
       }

       const usersWithoutPassword=users.map((user)=>
    {
        const{password, ...userWithoutPassword}=user.toObject();
        return userWithoutPassword;
    });

    res.status(200).json({
        users:usersWithoutPassword,
        message:"Users fetched Successfully"
    });
    }     catch (error) {
        console.error("Error fetching Users:",error.message);
        res.status(500).json({
            error:"Error fetching Users",
        });
        }
    };