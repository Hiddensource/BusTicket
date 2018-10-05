const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NinjaSchema2 = new Schema({
    
    "onwardflights":  [{
     "AvailCatCard":"boolean",
     "BPPrims":
             {
             "list":[ {
                     "BPAddress": "string",
                     "BPContactNumber": "string", 
                     "BPCoordinates":  "string",
                     "BPId": "string", 
                     "BPLandmark":  "string",
                     "BPLocation": "string",
                     "BPName":  "string",
                     "BPTime": {
                         "type": "date",
                         "format": "strict_date_optional_time||epoch_millis"
                     }
                 }]
             },
     "BusServiceID":  "string",
     "DepartureTime": "string",
    "avlWindowSeats": "string",
     "busCondition": "string",
     "cancellationPolicy":  "string",
     "destination": "string",
     "duration": "string",
    "impulse_perc_seats":"string",
     "levyFee":  "string",
     "origin":  "string",
     "qtype":  "string",
     "rating":  "string",
     "seat": "string",
     "skey":  "string",
     "src_voyager_id": "string",
     "totalReviews": "string",
     "ArrivalTime": "string",
     "BusType": "string",
     "DPPrims": {
               "list":[ {
                     "BPAddress": "string",
                     "BPContactNumber":"string",
                     "BPLandmark":"string",
                     "DPAddress": "string",
                     "DPContactNumber": "string",
                     "DPCoordinates":"string",
                     "DPId":"string",
                     "DPLandmark": "string",
                     "DPLocation": "string",
                     "DPName": "string",
                     "DPTime": {"type":"date",
                               "format": "strict_date_optional_time||epoch_millis"
                                }
                       } ]
                  },
                                         
                      "OperatorID": "string",
                      "RouteID": "string",
                      "RouteSeatTypeDetail": {
                                     "list": [{
                                            
                                                 "SeatsAvailable":"string",
                                                 "SellFare": "string",
                                                 "availabilityStatus":"string",
                                                 "busCondition": "string",
                                                 "seatType": "string",
                                                 "seatTypeSpecific":"string",
                                             }]
                                         },
                                   
                      "ServiceID": "string",
                      "ServiceName":"string",
                      "TravelsName":"string",
                      "amenities":"string",
                      "arrdate": {
                                     "type": "date",
                                     "format": "strict_date_optional_time||epoch_millis"
                                 },
                      "bpDpSeatLayout":"boolean",
                         
                      "busCompany":"string",
                      "depdate": {
                                     "type": "date",
                                     "format": "strict_date_optional_time||epoch_millis"
                                 },
                      "dest_voyager_id": "string",
                      "dst_vendor_id":  "string",
                      "fare": {
                                     
                                         "adultbasefare":  "string",
                                         "adultcommission": "string",
                                         "adultservicetax": "string",
                                         "adultsurcharge":  "string",
                                         "adulttotalfare": "string",
                                         "discount":"string",
                                         "servicetax": "string",
                                         "totalbasefare":"string",
                                         "totalcommission":"string",
                                         "totalfare": "string", 
                                         "totalsurcharge":"string",
                                         "transactionfee": "string"
                                     },
                             
                      "farebasis":"string",
                      "gps":"string",
                      "idRequired": "string",
                      "mTicket":"string",
                      "partialCancellationAllowed": "string",
                      "row_type": "string",
                      "src_vendor_id": "string",
                       "srtFee":"string",
                      "tbrequired":"string",
                      "ugcid":"string",
                       "zeroCancellationTime":"string",
                       "Filter_busType":"string",
                       "departureHour":"string"
                             }
                         
                   
 
    ]}
,
 
 
  {
 timestamps: true
 });
 
 const Ninja2 = mongoose.model('goibibo',NinjaSchema2);

 module.exports = Ninja2;