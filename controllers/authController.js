import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import registerSchema from "../models/registerSchema.js";
import taskSchema from "../models/taskSchema.js";
import JWT from 'jsonwebtoken'


export const taskController = async (req, res) => {
    try {
        const { task, activity, date, startTime, endTime } = req.body;
        let Task = await new taskSchema({
            task,
            activity,
            date,
            startTime,
            endTime,
        }).save()

        res.status(201).send({
            success: true,
            message: "Task added successfully",
            Task,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while adding a task",
            error,
        });
        console.log(error);
    }
}
export const registerController = async (req, res) => {
    try {
        const { name, email, dob, phoneNumber, password, confirm_password } = req.body;

        // validate user property
        if (!name) {
            return res.send({ message: "Name is required" })
        }
        if (!email) {
            return res.send({ message: "Email is required" })
        }
        if (!dob) {
            return res.send({ message: "Select your DOB" })
        }
        if (!phoneNumber) {
            return res.send({ message: "Phone Number is required" })
        }
        if (!password) {
            return res.send({ message: "Password is required" })
        }
        if (!confirm_password) {
            return res.send({ message: "Confirm Password is required" })
        }


        // Checking if user is already registered
        let existingUser = await registerSchema.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "User already register"
            })
        }

        const hashedPassword = await hashPassword(password);



        let regUser = new registerSchema({
            name,
            email,
            dob,
            phoneNumber,
            password: hashedPassword,
            confirm_password: hashedPassword
        }).save()

        res.status(201).send({
            success: true,
            message: "user added successfully",
            regUser,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while register a user",
            error,
        });
        console.log(error);
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send({ message: "Invalid email or password" })
        }

        // checking email if available
        const user = await registerSchema.findOne({ email })

        if (!user) {
            return res.send({ message: "Invalid email address" })
        }

        // compare password

        const match = await comparePassword(password, user.password)

        if (!match) {
            return res.send({ message: "Password doesn't match" })
        }

        // creating token for login
        const token = JWT.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: "60s" });
        res.status(200).send({
            success: true,
            message: "Log in successfully",
            user: {
                name: user.name,
                email: user.email,
                dob: user.dob,
                phoneNumber: user.phoneNumber
            },
            token
        })


    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        })
        console.log(error)
    }
}

export const viewTaskController = async (req, res) => {
    let uData = await taskSchema.find();
    if (uData.length > 0) {
        res.send(uData)
    } else {
        res.send({ msg: "No record available" })
    }
}

export const deleteTaskController = async (req, res) => {
    let delTask = await taskSchema.deleteOne({ _id: req.params.id })
    res.send(delTask)

}


export const viewTaskOnIDController = async (req, res) => {
    let result = await taskSchema.findOne({_id: req.params.id})
    res.send(result)
}
export const putController = async (req, res) => {
    let result = await taskSchema.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result)
}

export const userDetailController = async (req,res) => {
    let uData = await registerSchema.find();        
    if(uData.length>0){
        res.send(uData)
    }else{
        res.send({msg: "No record available"})
    }
}