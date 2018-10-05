const express = require('express');
const router = express.Router();
const Ninja = require ('../models/ninja');
const Ninja2 = require ('../models/ninja2');
var MongoClient = require('mongodb').MongoClient;
var Detail=[];

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

router.get('/ninjas',function(req,res){
    res.send({type: 'GET'});
});

router.put('/ninjas/:id',function(req,res){
    res.send({type: 'PUT'});
});
router.delete('/ninjas/:id',function(req,res){
    res.send({type: 'DELETE'});
});
router.post('/getBus',function(req,res){

        var source = req.body.source;
        
        var destination = req.body.destination;
        
        var ddate = req.body.ddate;
        
        var url="http://developer.goibibo.com/api/bus/search/?app_id=045ea148&app_key=3e449f37d35d060398943020050fcee5&format=json&source="+source+"&destination="+destination+"&dateofdeparture="+ddate+" ";
        
        
        
        function getUserDetails() {
        
        
        
        var request = new XMLHttpRequest();
        
        request.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 200) {
        
        displayUserInfo(request.responseText);
        
        }
        
        };
        
        request.open("GET", url, true);
        
        request.send();
        
        }
        
        
        
        
        
        function displayUserInfo(response) {
        
        
        var val="";
        
        
        var data = JSON.parse(response);
      
        
        if(data.data!=null){
        
        for(var i=0;i<data.data.onwardflights.length;i++){
        
        
        val=data.data.onwardflights[i].origin;
        
        var obj = {};
        
        obj['origin'] = val;
        
        
        val=data.data.onwardflights[i].rating;
        
        obj['rating'] = val;
        
        
        val=data.data.onwardflights[i].DepartureTime;
        
        obj['departureTime'] = val;
        
        
        val=data.data.onwardflights[i].duration;
        
        obj['duration'] = val;
        
        
        val=data.data.onwardflights[i].avlWindowSeats;
        
        obj['avlWindowSeats'] = val;
        
        
        val=data.data.onwardflights[i].seat;
        
        obj['seat'] = val;
        
        
        val=data.data.onwardflights[i].busCondition;
        
        obj['busCondition'] = val;
        
        
        
        val=data.data.onwardflights[i].arrdate;
        
        obj['arrdate'] = val;
        
        
        val=data.data.onwardflights[i].destination;
        
        obj['destination'] = val;
        
        
        val=data.data.onwardflights[i].amenities;
        
        obj['amenities'] = val;
        
        
        val=data.data.onwardflights[i].ArrivalTime;
        
        obj['ArrivalTime'] = val;
        
        
        val=data.data.onwardflights[i].BusServiceID;
        
        obj['BusServiceId'] = val;
        
        
        val=data.data.onwardflights[i].gps;
        
        obj['gps'] = val;
        
        
        val=data.data.onwardflights[i].depdate;
        
        obj['depdate'] = val;
        
        
        val=data.data.onwardflights[i].BusType;
        
        obj['BusType'] = val;
        
        
        val=data.data.onwardflights[i].TravelsName;
        
        obj['TravelsName'] = val;
        
        
        val=data.data.onwardflights[i].fare.totalfare;
        
        obj['fare'] = val;
        
        val=data.data.onwardflights[i].RouteSeatTypeDetail.list[0].seatType;
        
        obj['seatType'] = val;
        
       
        
        val=data.data.onwardflights[i].RouteSeatTypeDetail.list[0].SeatsAvailable;
        
        obj['SeatsAvailable'] = val;
        
        
        val = data.data.onwardflights[i].RouteID;
        
        obj['RouteID'] = val;
        
        
        
        val = data.data.onwardflights[i].src_voyager_id;
        
        obj['src_vid']=val;
        
        
        
        val = data.data.onwardflights[i].dest_voyager_id;
        
        obj['dest_vid'] = val;
        
        
        
        val = data.data.onwardflights[i].src_vendor_id;
        
        obj['src_id'] = val;
        
        
        
        val = data.data.onwardflights[i].dst_vendor_id;
        
        obj['dest_id'] = val; 
        
        
        
        val = data.data.onwardflights[i].OperatorID;
        
        obj['Operator_id'] =val;
        
        obj['date']=ddate;
        
        obj['Aggregator'] = 'Goibibo';
        
        val = data.data.onwardflights[i].BusType.split(" ");
        obj['Filter_busType'] = val[0];

        val = data.data.onwardflights[i].DepartureTime.split(":");
        obj['departureHour'] = parseInt(val[0]);


        
        Detail.push(obj);
        
        
        }
        
        
        res.send({Detail});}
        
        else{
        
        res.send("error");
        
        }
        Ninja.create({Detail});
        Ninja2.create(data.data);
        }
        
        
        getUserDetails(); 
        
        
    
});

router.post('/lowPrice',function(req,res){

    var source = req.body.source;
    var destination = req.body.destination;
    var ddate = req.body.ddate;
    var url=  "mongodb://localhost:27017/ninjago";
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ninjago");
        var query = { 'Detail.origin': source,'Detail.destination':destination,'Detail.date':ddate };
        dbo.collection("busproviders").find(query).toArray(function(err, result) {
          if (err) throw err;
        Detail=result;
          db.close();
        });
      });


    Detail.sort(function(a, b) { 
        return a.fare- b.fare;
    })
     var obj=[];
    for(var i in Detail){
   
        obj[i] = Detail[i];
    }
    console.log(obj);
    res.send({obj});
});

router.post('/highPrice',function(req,res){

    var source = req.body.source;
   var destination = req.body.destination;
   var ddate = req.body.ddate;
   var url=  "mongodb://localhost:27017/ninjago";
   MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
       if (err) throw err;
       var dbo = db.db("ninjago");
       var query = { 'Detail.origin': source,'Detail.destination':destination,'Detail.date':ddate };
       dbo.collection("busproviders").find(query).toArray(function(err, result) {
         if (err) throw err;
       Detail=result;
         db.close();
       });
     });

   Detail.sort(function(a, b) { 
       return b.fare- a.fare;
   })
    var obj=[];
   for(var i in Detail){
  
       obj[i] = Detail[i];
   }
   console.log(obj);
   res.send({obj});
});

router.post('/lessSeats',function(req,res){

    var source = req.body.source;
   var destination = req.body.destination;
   var ddate = req.body.ddate;
   var url=  "mongodb://localhost:27017/ninjago";
   MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
       if (err) throw err;
       var dbo = db.db("ninjago");
       var query = { 'Detail.origin': source,'Detail.destination':destination,'Detail.date':ddate };
       dbo.collection("busproviders").find(query).toArray(function(err, result) {
         if (err) throw err;
       Detail=result;
         db.close();
       });
     });

   Detail.sort(function(a, b) { 
       return a.SeatsAvailable- b.SeatsAvailable;
   })
    var obj=[];
   for(var i in Detail){
  
       obj[i] = Detail[i];
   }
   console.log(obj);
   res.send({obj});
});

router.post('/moreSeats',function(req,res){

    var source = req.body.source;
   var destination = req.body.destination;
   var ddate = req.body.ddate;
   var url=  "mongodb://localhost:27017/ninjago";
   MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
       if (err) throw err;
       var dbo = db.db("ninjago");
       var query = { 'Detail.origin': source,'Detail.destination':destination,'Detail.date':ddate };
       dbo.collection("busproviders").find(query).toArray(function(err, result) {
         if (err) throw err;
       Detail=result;
         db.close();
       });
     });

   Detail.sort(function(a, b) { 
       return b.SeatsAvailable- a.SeatsAvailable;
   })
    var obj=[];
   for(var i in Detail){
  
       obj[i] = Detail[i];
   }
   console.log(obj);
   res.send({obj});
});

router.post('/earlyDept',function(req,res){

    var source = req.body.source;
   var destination = req.body.destination;
   var ddate = req.body.ddate;
   var url=  "mongodb://localhost:27017/ninjago";
   MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
       if (err) throw err;
       var dbo = db.db("ninjago");
       var query = { 'Detail.origin': source,'Detail.destination':destination,'Detail.date':ddate };
       dbo.collection("busproviders").find(query).toArray(function(err, result) {
         if (err) throw err;
       Detail=result;
         db.close();
       });
     });

   Detail.sort(function(a, b) { 
      dta=a.departureTime.replace(":","");
       dtb=b.departureTime.replace(":","");

       return parseInt(dta)- parseInt(dtb);
   })
    var obj=[];
   for(var i in Detail){
  
       obj[i] = Detail[i];
   }
   console.log(obj);
   res.send({obj});
});

router.post('/lateDept',function(req,res){

    var source = req.body.source;
   var destination = req.body.destination;
   var ddate = req.body.ddate;
   var url=  "mongodb://localhost:27017/ninjago";
   MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
       if (err) throw err;
       var dbo = db.db("ninjago");
       var query = { 'Detail.origin': source,'Detail.destination':destination,'Detail.date':ddate };
       dbo.collection("busproviders").find(query).toArray(function(err, result) {
         if (err) throw err;
       Detail=result;
         db.close();
       });
     });

   Detail.sort(function(a, b) { 
      dta=a.departureTime.replace(":","");
       dtb=b.departureTime.replace(":","");

       return parseInt(dtb)- parseInt(dta);
   })
    var obj=[];
   for(var i in Detail){
  
       obj[i] = Detail[i];
   }
   console.log(obj);
   res.send({obj});
});



router.post('/earlyArr',function(req,res){

    var source = req.body.source;
   var destination = req.body.destination;
   var ddate = req.body.ddate;
   var url=  "mongodb://localhost:27017/ninjago";
   MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
       if (err) throw err;
       var dbo = db.db("ninjago");
       var query = { 'Detail.origin': source,'Detail.destination':destination,'Detail.date':ddate };
       dbo.collection("busproviders").find(query).toArray(function(err, result) {
         if (err) throw err;
       Detail=result;
         db.close();
       });
     });

   Detail.sort(function(a, b) { 
      dta=a.ArrivalTime.replace(":","");
       dtb=b.ArrivalTime.replace(":","");

       return parseInt(dta)- parseInt(dtb);
   })
    var obj=[];
   for(var i in Detail){
  
       obj[i] = Detail[i];
   }
   console.log(obj);
   res.send({obj});
});


router.post('/lateArr',function(req,res){

    var source = req.body.source;
   var destination = req.body.destination;
   var ddate = req.body.ddate;
   var url=  "mongodb://localhost:27017/ninjago";
   MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
       if (err) throw err;
       var dbo = db.db("ninjago");
       var query = { 'Detail.origin': source,'Detail.destination':destination,'Detail.date':ddate };
       dbo.collection("busproviders").find(query).toArray(function(err, result) {
         if (err) throw err;
       Detail=result;
         db.close();
       });
     });

   Detail.sort(function(a, b) { 
      dta=a.ArrivalTime.replace(":","");
       dtb=b.ArrivalTime.replace(":","");

       return parseInt(dtb)- parseInt(dta);
   })
    var obj=[];
   for(var i in Detail){
  
       obj[i] = Detail[i];
   }
   console.log(obj);
   res.send({obj});
});


router.post('/lessDuration',function(req,res){

    var source = req.body.source;
   var destination = req.body.destination;
   var ddate = req.body.ddate;
   var url=  "mongodb://localhost:27017/ninjago";
   MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
       if (err) throw err;
       var dbo = db.db("ninjago");
       var query = { 'Detail.origin': source,'Detail.destination':destination,'Detail.date':ddate };
       dbo.collection("busproviders").find(query).toArray(function(err, result) {
         if (err) throw err;
       Detail=result;
         db.close();
       });
     });

   Detail.sort(function(a, b) { 
      dta=a.duration.replace("m","");
       dtb=b.duration.replace("m","");
       dtaa=dta.split("h");
       dtbb=dtb.split("h");
        totala = parseInt(dtaa[0])*60 + parseInt(dtaa[1]);
        
        totalb = parseInt(dtbb[0])*60 + parseInt(dtbb[1]);
       return totala- totalb;
   })
    var obj=[];
   for(var i in Detail){
  
       obj[i] = Detail[i];
   }
   console.log(obj);
   res.send({obj});
});

router.post('/moreDuration',function(req,res){

    var source = req.body.source;
   var destination = req.body.destination;
   var ddate = req.body.ddate;
   var url=  "mongodb://localhost:27017/ninjago";
   MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
       if (err) throw err;
       var dbo = db.db("ninjago");
       var query = { 'Detail.origin': source,'Detail.destination':destination,'Detail.date':ddate };
       dbo.collection("busproviders").find(query).toArray(function(err, result) {
         if (err) throw err;
       Detail=result;
         db.close();
       });
     });

   Detail.sort(function(a, b) { 
      dta=a.duration.replace("m","");
       dtb=b.duration.replace("m","");
       dtaa=dta.split("h");
       dtbb=dtb.split("h");
        totala = parseInt(dtaa[0])*60 + parseInt(dtaa[1]);
        
        totalb = parseInt(dtbb[0])*60 + parseInt(dtbb[1]);
       return totalb- totala;
   })
    var obj=[];
   for(var i in Detail){
  
       obj[i] = Detail[i];
   }
   console.log(obj);
   res.send({obj});
});



module.exports = router;