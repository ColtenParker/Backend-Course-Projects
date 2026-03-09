db = connect('mongodb+srv://admin:Password@dev.ot3o4mz.mongodb.net/forum?appName=dev');

let result = db.users.find();
console.log(result);