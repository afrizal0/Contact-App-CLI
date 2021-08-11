// Mengambil argumen dari CLI
const yargs = require('yargs')
const contacts = require('./contacts')

yargs.command({
	command: 'add',
	describe: 'Add new contact',
	builder: {
		name: {
			describe: 'Full Name',
			demandOption: true,
			type: 'string'
		},
		email: {
			describe: 'Email',
			demandOption: false,
			type: 'string'
		},
		phoneNum: {
			describe: 'Phone Number',
			demandOption: true,
			type: 'string'
		}

	},
	handler(argv){
		contacts.saveContact(argv.name, argv.email, argv.phoneNum)
	}

})

yargs.command({
	command: 'list',
	describe: 'Show all data',
	handler(){
		contacts.listContact()
	}
})

.demandOption()



yargs.parse()
