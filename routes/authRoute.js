import express from 'express'
import { taskController, registerController, loginController, viewTaskController, deleteTaskController, viewTaskOnIDController, putController, userDetailController } from '../controllers/authController.js'

const router = express.Router()

// method post for sending data into DB
router.post('/taskRegister', taskController)
router.post('/registerUser', registerController)

// Method to login
router.post("/login", loginController)

// Method to get task
router.get("/viewTask", viewTaskController)

// Method to get user detail
router.get("/userDetail", userDetailController)

// Method to delete task by one
router.delete("/deleteTask/:id", deleteTaskController)



// Getting User Data from Db on the basis of Id (dynamic Id)
router.get("/viewTasks/:id",viewTaskOnIDController)

// updating User Data on the basis of Id (params id)
router.put("/viewTask/:id",putController)



export default router