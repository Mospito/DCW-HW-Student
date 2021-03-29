let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

const PORT = 80;

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let students = {
    list: [
        { id: 1, fname: "Mospito", surname: "Pito", major: "CoE", gpa: 2.2 }
    ]
}

router.route('/students')
    .get((req, res) => res.json(students))
    .post((req, res) => {

        let newStudent = {}
        newStudent.id = (students.list.length) ? students.list[students.list.length - 1].id + 1 : 1
        newStudent.fname = req.body.fname;
        newStudent.surname = req.body.surname;
        newStudent.major = req.body.major;
        newStudent.gpa = req.body.gpa;

        students = { "list": [...students.list, newStudent] }
        res.json(students)
    })

router.route('/students/:std_id')
    .get((req, res) => {

        const studentID = req.params.std_id
        const id = students.list.findIndex(item => +item.id === +studentID)

        if (id >= 0) {
            res.json(students.list[id])
        }
        else {
            res.json({ Status: "Fail T^T" })
        }

    })
    .put((req, res) => {

        const studentID = req.params.std_id
        const id = students.list.findIndex(item => +item.id === + studentID)

        if (id >= 0) {

            students.list[id].fname = req.body.fname;
            students.list[id].surname = req.body.surname;
            students.list[id].major = req.body.major;
            students.list[id].gpa = req.body.gpa;
            res.json(students)

        }
        else {
            res.json({ Status: "Fail T^T" })
        }


    })
    .delete((req, res) => {

        const studentID = req.params.std_id
        const id = students.list.findIndex(item => +item.id === + studentID)
        if (id >= 0) {

            students.list = students.list.filter(item => +item.id !== +studentID)
            res.json(students)
        }
        else
        {
            res.json({Status: "Fail T^T"})
        }

    })










app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(PORT, () => console.log('server is running...', PORT))