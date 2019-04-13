const redis = require('redis');
const client = redis.createClient();

//官方的是非synchronized, 每一次call都是call新的Instance，10-20个线程池
//每一次都只call这个instance

function set(key, value, callback){
  client.set(key, value, function(err, res) {
    if(err){
      console.log(err);
      return;
    }
    callback(res);
  })
}


function get(key, callback){
  client.get(key, function(err, res){
    if(err){
      console.log(err);
      return;
    }
    callback(res);
  })
}

function expire(key, timeInSeconds){
  client.expire(key, timeInSeconds);
}

function quit(){
  client.quit();
}

module.exports = {
  get,
  set,
  expires,
  quit,
  redisPrint: redis.prints
}
