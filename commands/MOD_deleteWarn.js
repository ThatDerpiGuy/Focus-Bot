module.exports = {
	name: 'deletewarn',
	aliases: ['removewarn'],
	description: 'Deletes a warning',
	mod: true,
	execute(message, args) {

		const mentionedUser = message.mentions.members.first()
		if (!message.mentions.members.first()) {
			respond('',`No user was mentioned.`,message.channel);
			return;
		}

		if (!fs.existsSync(`./logs/userwarnings.json`)) {
			respond('',`Error: userwarnings.json is not found.`, message.channel)
			return;
		}


		if (!args[1]) {
			respond('',`Invalid warning number.`,message.channel);
			return;
		}

		var warningNr = args[1]-1;

		// Delete warnings

		var userLog = require('../logs/userwarnings.json')
		if (!userLog[mentionedUser.id]) {
			respond('',`Unable to find warnings for this user.`, message.channel);
			return;
		}


		if (!userLog[mentionedUser.id][warningNr]) {
			respond('',`Warning doesn't exist.`, message.channel)
			return;
		}


		userLog[mentionedUser.id].splice(warningNr, 1); // remove the warning
		fs.writeFile('./logs/userwarnings.json', JSON.stringify(userLog), (err) => {
			if (err) {
				console.log(err);
				respond('',`An error occured during saving.`, message.channel);
				return;
			}
		})

		respond('',`Warning ${warningNr+1} was removed.`, message.channel);
		delete require.cache[require.resolve(`../warnings.json`)]
	}
};