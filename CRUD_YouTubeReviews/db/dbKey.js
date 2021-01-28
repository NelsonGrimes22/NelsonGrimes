const uri = "mongodb+srv://NelsonG:Nelly!23@cluster0.fxsw4.mongodb.net/Reviews?retryWrites=true&w=majority";

function getDB(){
    return uri;
}

module.exports = {
    getDB
};