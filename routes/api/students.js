const express = require('express')
const router = express.Router()

let students = require('../../Students')


//Get all Students and some query filters

router.get('/', (req,res) => {
    const {level, department, faculty} = req.query

    let filteredStudents = students
    
    if (level) {
        filteredStudents = filteredStudents.filter(student => student.level === Number(level))
    }
    if (department) {
        filteredStudents = filteredStudents.filter(student => student.department === department)
    }
    if (faculty) {
        filteredStudents = filteredStudents.filter(student => student.faculty === faculty)
    }

    res.status(200).json({message : "Search Found", filteredStudents})
})

//Get student by id

router.get('/:id', (req,res) => {
    const student = students.find(s => s.id === Number(req.params.id))

    if(!student){
        return res.status(404).json({message : "Student Not Found"})
    } else {
        res.status(200).json({message : "Student Found", student})
    }
})

//Register New Student

router.post('/', (req,res) => {
    const newStudent = {
        id : students.length ? students[students.length - 1].id + 1 : 1, 
        name : req.body.name,
        level : req.body.level,
        department : req.body.department,
        faculty : req.body.faculty,
        cgpa : req.body.cgpa
    }

    if(!newStudent.level || !newStudent.name || !newStudent.department || !newStudent.faculty || !newStudent.cgpa) {
        return res.status(400).json({message : "Fill-In All Spaces"})
    } else {
        students.push(newStudent)
        res.status(200).json({message : "Student Registered Successfully", newStudent},)
    }
})

//Update Student by Id

router.put('/:id', (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id))

    if(!student) {
        return res.status(404).json({message : "Student Not Found"})
    } else {
        
        student.name = req.body.name || student.name
        student.level = req.body.level || student.level
        student.department = req.body.department || student.department
        student.cgpa = req.body.cgpa || student.cgpa

        res.status(200).json({message : "Student Successfully Updated", students})
    }
})

//Delete Student by ID
router.delete('/:id', (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id))

    if(student) {
        students = students.filter(s => s.id !== Number(req.params.id))
        res.status(200).json({message : "Student Successfully Deleted", students})
    } else {
        return res.status(404).json({message : "Student Not Found"})
    }
})

module.exports = router