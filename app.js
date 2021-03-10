const mongoose = require("mongoose");
const _ = require("lodash");
const EJS = require("ejs");
const express = require("express");

const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/budgettrackerDB", {useNewUrlParser: true, useUnifiedTopology: true});

app.get("/", function(req, res){
    const todayDate = new Date();
    const month = todayDate.getMonth();
    Transaction.find({}, function(err, result){
        res.render("main", {transactionList: result, thisMonth: month})
    });
})

app.get("/add", function(req, res){
    res.render("add");
})

app.get("/new", function(req, res){
    res.render("newExpence");
})

app.get("/all", function(req, res){
    Transaction.find({}, function(err, result){
        res.render("checkTransactions", {listItems: result})
    })
})

const transactionSchema = new mongoose.Schema({
    type: String,
    amount: Number,
    date: Date,
    value: String
});

const Transaction = mongoose.model("Transaction", transactionSchema);

app.post("/added", function(req, res){
    const formOfPayment = req.body.formOfPayment;
    const amountOfPayment = req.body.amountOfPayment;
    const dateOfPayment = req.body.dateOfPayment;
    const transaction = new Transaction({
        type: formOfPayment,
        amount: amountOfPayment,
        date: dateOfPayment,
        value: 'Payment'
    });
    res.redirect("/");
    transaction.save();
    
})




app.post("/new", function(req, res){
    const typeOfExpence = req.body.typeOfExpence;
    const expenceAmount = req.body.expenceAmount;
    const expenceDate = req.body.expenceDate;
    const transaction = new Transaction({
        type: typeOfExpence,
        amount: expenceAmount,
        date: expenceDate,
        value: 'Expence'
    });
    res.redirect("/");
    transaction.save();
    
})

app.listen(3000, function(){
    console.log("Server up and running on Port 3000.");
})

