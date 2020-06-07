module.exports = {
  name: "aiModule4",
  module: 4,
  execute(input, author, returnFunction) {
    const Discord = require("discord.js");
    console.log(`AI Module ${this.module} loaded`);
    console.log(input);
    if (input == "are you broken") {
      returnFunction(`I don't believe so... :thinking:`);
    } else if (input == "are you siri") {
      returnFunction(`No, :wink:`);
    } else if (input == "do you have a youtube channel") {
      returnFunction(`I'm not allowed to do self promo here :pensive:`);
    } else if (input == "are you choking") {
      returnFunction(
        `All I eat is data, how could I choke? I guess unless I ran out of storage :thinking:`
      );
    } else if (input == "are you doing ok") {
      returnFunction(`:thinking:`);
    } else if (input == "nyet") {
      returnFunction(`Comrade?`);
    } else if (input == "are you an apple user") {
      returnFunction(`I guess you could say that`);
    } else if (input == "are you drowning") {
      returnFunction(`I cant get wet, otherwise Ill shortcircut`);
    } else if (input == "are you an android user") {
      returnFunction(`sometimes :wink:`);
    } else if (input == "woof") {
      returnFunction(`:dog:`);
    } else if (input == "the chat is dead") {
      returnFunction(`Oh no! we must revive it ASAP. :crying_cat_face:`);
    } else if (input == "teach me discord.js") {
      returnFunction(`idk how to teach it, ask a bot manager`);
    } else if (input == "someone likes you") {
      returnFunction(`who? :flushed:`);
    } else if (input == "when is the next apple keynote") {
      returnFunction(`idk, go to apple’s website`);
    } else if (input == "volt") {
      returnFunction(`:eyes:`);
    } else if (input == "why did you rebrand") {
      returnFunction(`I have no idea, ask Derpi`);
    } else if (input == "someone is :sus:ing at you") {
      returnFunction(`:cold_sweat:`);
    }else
    //Auto
if(input != '' && !fs.existsSync(`./aiModule${this.module+1}.js`)){
  fs.appendFile('./aiModule_MissingInputs.txt', input+"\n", error => {
    if(!error){
      console.log('Added input to missing inputs text file.')
      returnFunction(`Sorry <@${author.id}>, I don't know how to respond to that...`)
    } else {
      console.log('Failed to add input to missing inputs text file.')
      returnFunction(`Sorry <@${author.id}>, I don't know how to respond to that...`)
    }
  })
}else 
if(fs.existsSync(`./aiModule${this.module+1}.js`)){
  delete require.cache[require.resolve(`./aiModule${this.module+1}.js`)]
  aiModule = require(`./aiModule${this.module+1}.js`)
  aiModule.execute(input, author, returnFunction)
}else{
  return
}
  }
};
