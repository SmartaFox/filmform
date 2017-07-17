var formidable = require("formidable");
var sd = require("silly-datetime");
var db=require('../model/db.js');
var ObjectID = require('mongodb').ObjectID;
var args={page:0,size:10,sort:{'time':-1}};
exports.showIndex=function(req,res){
    db.find('film',{},function(err,moves){
       //console.log(moves[0]._id);
        res.render('index',{'title':'首页',
        'moves':moves});
    });
};
exports.getData=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files) {
        if (err) {
            throw err;
        }else{
        //console.log(fields);
        var time = sd.format(new Date(),'YYYY/MM/DD HH:mm:ss');
        fieldsAll={"title":fields.title,"doctor":fields.doctor,
                   "time":time,'country':fields.country,
                   "language":fields.language,'poster':fields.poster,
                   "flash":fields.flash,'year':fields.year,
                   'summary':fields.summary,
                    };
        //console.log(fieldsAll);
        db.insertOne('film',fieldsAll,function(){});
        db.find('film',{},function(err,moves){
            //console.log(docs);
        res.render('list',{'title':'列表页',
        'moves':moves});
        });
        }
    });
}
exports.listone=function(req,res){
    var id=req.url.substr(7);
    db.find('film',{_id:ObjectID(id)},function(err,movie){
        res.render('detail',{'title':'列表页',
       'movie':movie});
       });
}
exports.listall=function(req,res){
    db.find('film',{},function(err,moves){
       //console.log(moves[0]._id);
        res.render('list',{'title':'列表页',
        'moves':moves});
    });
};
exports.delet=function(req,res){
    var id=req.url.substr(7);
    console.log(id);
    db.deleteMany('film',{_id:ObjectID(id)},function(err,result){
        console.log(id);
    });
    res.redirect('/');
}