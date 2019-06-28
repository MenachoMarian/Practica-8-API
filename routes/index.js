var express = require('express');
var router = express.Router();

const user = require('../database/user');
const USER = user.model;
const USERSCHEMA = user.schema;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/user", async(req, res) => {
  var params = req.body;
  var user = new USER(params);
  var result = await user.save();
  res.status(200).json(result);
});

router.get('/user',async(req,res, next) => {
  var params = req.query;
  var limit = 100;
  if(params.limit != null){
    limit = parseInt(params.limit);
  }
  var order = -1;
  if(params.sort != null){
    if(params.sort == "desc") {
      order = -1;
    }else if (params.sort == "asc") {
      order = 1;
    }
  }
  var filter = {};
  if(params.id != null){
    filter= {_id: params.id};
    }
  var skip = 0;
  if (params.skip != null) {
    skip = parseInt(params.skip);
  }
  var list = await USER.find(filter).limit(limit).sort({_id: order}).skip(skip);
  res.status(200).json(list);
});

router.put('/user', async(req, res) => {
  var params = req.body;
  var id = req.query.id;
  if (id == null) {
    res.status(300).json({
      msn: "Introduzca ID"
    });
    return;
  }
  var result = await USER.findOneAndUpdate({_id: id},params);
  res.status(200).json(result);
});

router.patch('/user', async(req, res) => {
  var params = req.body;
  var id = req.query.id;
  if (id == null) {
    res.status(300).json({
      msn: "Introdusca ID"
    });
    return;
  }
  var result = await USER.findOneAndUpdate({_id: id},params);
  res.status(200).json(result);
});

router.delete('/user', async(req,res) => {
  var id = req.query.id;
  if (id == null) {
    res.status(300).json({
      msn: "Introdusca ID"
    });
    return;
  }
  var result = await USER.remove({_id: id});
  res.status(200).json(result);
});

module.exports = router;
