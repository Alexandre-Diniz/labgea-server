function validation(statement, message, callback=()=>{}){
  callback()
  if(statement) throw new Error(message)
}

module.exports = validation