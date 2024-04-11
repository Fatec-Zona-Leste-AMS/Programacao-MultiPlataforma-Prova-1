const express = require("express");
const app     = express();
const path    = require('path');

const Handlebars = require("handlebars");
const handlebars = require("express-handlebars").engine;
const bodyParser = require("body-parser");
const Scredules  = require("./models/schedules");
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");

app.engine(".hbs", handlebars({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: '.hbs'
}));

app.set('views', path.join(__dirname, '/views'));
app.set("view engine", ".hbs");

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// METHOD GET
app.get("/", (req, res) => {
    res.render("create")
});

app.get("/read", (req, res) => {
    Scredules.findAll() 
      .then((data) => {
        res.render("read", {
            data: data
        });
    }).catch((error) => {
        res.status(500).send("Error when searching for posts");
    });
});

app.get("/update/:id", (req, res) => {
    const id = req.params.id;

    Scredules.findOne({
        where: {
           id: id
        }
     }).then(function(data) {
        if (!data) {
            res.redirect("/read")
        }

        res.render("update", {
            id: id,
            data: data
        });
     });
})

// METHOD POST
app.post("/create", (req, res) => {
    Scredules.create({
        name:         req.body.name,
        address:      req.body.address,
        neighborhood: req.body.neighborhood,
        zipcode:      req.body.zipcode,
        city:         req.body.city,
        state:        req.body.state 
    }).then(() =>{
        res.redirect("read");
    }).catch((err) => {
        res.redirect("create");
    })
});

app.post("/update/:id", async (req, res) => {
    const id = req.params.id;

    const data = {
        name:         req.body.name,
        address:      req.body.address,
        neighborhood: req.body.neighborhood,
        zipcode:      req.body.zipcode,
        city:         req.body.city,
        state:        req.body.state 
    };

    await Scredules.update(data, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/read");
    }).catch((erro) => {
        res.render("update", { id: id });
    });
});

app.listen(8081, () => {
    console.log("Servidor ativo na porta 8081!")
});