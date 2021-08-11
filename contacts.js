const fs = require('fs')
const readline = require('readline')
const chalk = require('chalk')
var validator = require('validator')

// membuat folder jika belum ada
const dirPath = './data'
if (!fs.existsSync(dirPath)) {
	fs.mkdirSync(dirPath)
} 

// membuat file json jika belum ada
const filePath = './data/contacts.json'
if(!fs.existsSync(filePath)) {
	fs.writeFileSync(filePath, '[]', 'utf-8')
}


const loadContact = () => {
	const file = fs.readFileSync('data/contacts.json', 'utf8')
	const contacts = JSON.parse(file)
	return contacts
}

const saveContact = (name, email, phoneNum) => {
	const contact = { name, email, phoneNum }
	const contacts = loadContact()

	if(contact.email){
		const duplicate = contacts.find((contact) => contact.email === email)
		if(duplicate){
			console.log(chalk.bgRed.black.bold('Email already exists, please make sure your Email address is correct!'))
			return false
		}
		if(!validator.isEmail(contact.email)) {
			console.log(chalk.bgRed.black.bold('Your Email is incorrect!'))
			return false;
		}
	}
	const duplicate = contacts.find((contact) => contact.phoneNum === phoneNum)
	if(duplicate) {
		console.log(chalk.bgRed.black.bold('Phone Number already exists, please make sure your phone number is correct!'))
		return false
	}
	if(!validator.isMobilePhone(contact.phoneNum, 'id-ID')){
		console.log(chalk.bgRed.black.bold('Your Phone Number is wrong, make sure is it a valid phone number!'))
		return false;
	}

	contacts.push(contact)

	fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2))
	console.log(chalk.bgGreen.black.bold('Successfull submiting data!'))
}

const listContact = () => {
	const contacts = loadContact();
	contacts.forEach((contact, i) => {
		console.log(`${i + 1}. ${contact.name} - ${contact.phoneNum}`)
	})
}

module.exports = { saveContact, listContact }