var mongoose=require('mongoose');
var Schema = mongoose.Schema;


var schema=new Schema({
    moviename:{type:String},
    date:{type:String},
    time:{type:String},
    type:{type:String},
    trailer:{type:String}
    // image:{type:String}
});
module.exports = mongoose.model('Addmovie',schema);