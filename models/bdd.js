var mongoose = require('mongoose');



var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true
}
mongoose.connect('mongodb+srv://Noctis:RomainTifaYuna@noctiscluster-mz215.mongodb.net/mymovizapp?retryWrites=true&w=majority', 
  options,     
  function(err) {
   console.log(err);
  }
);
