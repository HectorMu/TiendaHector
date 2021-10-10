const connection = require('../database')
let dateObject = new Date()
const controller = {}

controller.test = (req, res)=>{
    res.json({Test:"Hi, im working"})
}

controller.ListAll = async(req, res)=>{
    const results = await connection.query("Select * from apinotes")
    res.json(results)
}
controller.ListOne = async(req, res)=>{
    const {idnote} = req.params;
    const results = await connection.query(`select * from apinotes where idnote=${idnote}`)
    if(results.length > 0){
        res.json(results)
    }else{
        res.json({results:"Not found"})
    }
}

controller.Save = async(req, res)=>{
    const {title, content, importance} = req.body
    const createdat = (dateObject.getDate()+"/"+"0"+dateObject.getMonth()+"/"+dateObject.getFullYear())
    const newNote = {title, content,createdat,importance}
    try {
        await connection.query("insert into apinotes set ?",[newNote])
        res.status(200).json({insert:"succesfull"})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({insert:"something wen't wrong"})
    }
   
} 

controller.Update=async(req, res)=>{
    const {idnote} = req.params
    console.log(idnote)
    const {title, content, importance} = req.body;
    const updatedNote = {title, content,importance}
    try {
        await connection.query("update apinotes set ? where idnote = ?",[updatedNote,idnote])
        res.status(200).json({infoupdate: "succesfull"})
    } catch (error) {
        console.log(error)
    }

    
}
controller.Delete=async(req,res)=>{
    const {idnote} = req.params
    try {

        await connection.query("delete from apinotes where idnote = ?",[idnote])
        res.status(200).json({deletion:"succesfull"})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({insert:"something wen't wrong"})
    }

}
controller.getOneByTitle = async(req, res)=>{
    const {title} = req.params
    try {
        
        const result = await connection.query(`select * from apinotes where title like '%${title}%'`)
        if(result.length > 0){
            res.json(result)
        }else{
            res.json({results:"Not found"})
        }
      
    } catch (error) {
        console.log(error)
        res.status(400).json({consult:"something wen't wrong"})
    }
}


module.exports = controller