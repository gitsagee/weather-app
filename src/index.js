const express = require("express");
const app = express();
const path = require("path");

const port = 9000;


app.set("views", path.join(__dirname, "..", "views"));
app.use(express.static(path.join(__dirname, "../public")));


app.get("",(req,res)=>{
    
    res.render("index.hbs");

})
app.listen(port,(err)=>{
    console.log(`App is listening on port ${port}`);
})
