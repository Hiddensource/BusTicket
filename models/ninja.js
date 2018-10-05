const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NinjaSchema = new Schema({

   "Detail":  [{
  
    "BusServiceID":  "string",
    "departureTime": "string",
   "avlWindowSeats": "string",
    "busCondition": "string",
    "destination": "string",
    "duration": "string",
    "origin":  "string",
    "rating":  "string",
    "seat": "string",
    "ArrivalTime": "string",
    "BusType": "string",
    "TravelsName":"string",
      "amenities":"string",
      "arrdate": {
                    "type": "date",
                    "format": "strict_date_optional_time||epoch_millis"
                 },
                        
      "depdate": {
                     "type": "date",
                     "format": "strict_date_optional_time||epoch_millis"
                  },
       "fare": "string", 
       "gps":"string",
       "SeatsAvailable": "string",
       "date":"string",
       "Aggregator":"string",
       "Operator_id":"string",
       "dest_id": "string",
       "src_id": "string",
       "dest_vid": "string",
       "src_vid": "string",
       "RouteID": "string",
       "seatType":"string"

                  
       
                        
        }
    
    ]},



{
timestamps: true
});



 
 

 const Ninja = mongoose.model('busProvider',NinjaSchema);



module.exports = Ninja;
