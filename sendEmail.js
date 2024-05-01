const nodemailer = require("nodemailer")
const sent = require("./sentEmails")
const toSendEmails = require("./toSendEmails")
const fs = require("fs")

const htmlTemplate = fs.readFileSync("template.html", "utf8")

const emails = toSendEmails

const segregator = (to, sent = []) => {
	let requiredEmails = []
	to.map(
		(item) =>
			!sent.includes(item.trim()) && requiredEmails.push(item.trim())
	)
	return requiredEmails
}

const to = segregator(emails, sent)

const removeDuplicates = (arr) => {
	return arr.filter((item, index) => arr.indexOf(item) === index)
}

const reqTo = removeDuplicates(to)

// console.log("emails of recipients", reqTo)
console.log("initial count", emails.length)
console.log("no. of recipients", reqTo.length)

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "devikanthgandla28@gmail.com",
		pass: "yyzdjtrlykucndrr",
	},
})

const mailOptions = {
	from: "devikanthgandla28@gmail.com",
	bcc: reqTo,
	subject: "CV For Experienced React Js Developer",
	html: htmlTemplate,

	attachments: [
		{
			filename: "Devikanth_Resume.pdf",
			path: "./Devikanth_Resume.pdf",
		},
	],
}

transporter.sendMail(mailOptions, function (error, info) {
	if (error) {
		console.log("Error occurred:", error)
	} else {
		console.log("Email sent:", info.response)
	}
})
