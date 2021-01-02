const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
   user :{
       type:mongoose.Schema.ObjectId
   },
   //this define this object id of the like object
   likeable : {
    type:mongoose.Schema.ObjectId,
    require : true,
    refpath : 'onModel'
   },
   //this field is used 
   onModel:{
       type : String, 
       require : true,
       enum :['Post','Comment']
   }
},{
  timestamps:true
});

const likes = mongoose.model('like',likeSchema);
module.exports = likes;
