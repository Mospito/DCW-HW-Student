
const express = require('express');
const router = express.Router();
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 80; // set PORT up to you



app.use(cors())
app.use('/api', bodyParser.json(), router);
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let students = {
    list: [
        {id: 1, fname: "Foo", surname: "Bar", major: "CoE", gpa: 2.2}
    ]
}

router.route('/students')
    .get( (req, res)=> res.json(students))
    .post( (req, res) => {

        let id = (students.list.length)?students.list[students.list.length-1].id+1:1
        let fname = req.body.fname
        let surname = req.body.surname
        let major = req.body.major
        let gpa = req.body.gpa

        students = { list:[ ...students.list, {id, fname, surname, major, gpa }]}
        res.json(students)

    })

router.route('/students/:std_id')
    .get((req, res) => {

        let ID = students.list.findIndex( item => (item.id === +req.params.std_id))
        if(ID >= 0)
        {
            res.json(students.list[ID])
        }
        else
        {
            res.json({status: "Student Error can't find!"})
        }

    })

    .put( (req,res) => { 

        let ID = students.list.findIndex( item => ( item.id === +req.params.std_id))
        
        if( ID >= 0)
        {
            students.list[ID].fname = req.body.fname
            students.list[ID].surname = req.body.surname
            students.list[ID].major = req.body.major
            students.list[ID].gpa = req.body.gpa
            
            res.json(students)


        }
        else
        {
            res.json({status: "Student Error can't find!"})
        }
            
    })

    .delete((req, res) => {

        let ID = students.list.findIndex( item => ( item.id === +req.params.std_id))

        if(ID>=0)
        {
            students.list = students.list.filter( item => item.id !== +req.params.std_id)
            res.json(students)
        }
        else
        {
            res.json({status: "Student Error can't find!"})
        }

    })






app.listen(PORT, ()=> console.log('Server is running at ', PORT))


