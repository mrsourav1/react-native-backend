const express = require("express")
const router = express.Router()

const {register,login,edit,employeesList} = require('../controllers/user.js')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/employeelist').get(employeesList)
router.route('/edit/:id').patch(edit)

module.exports = router