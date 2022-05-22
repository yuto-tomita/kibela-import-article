import 'dotenv/config'
import { Command } from 'commander'
import { fetchAllKibelaArticle, fetchFirstKibelaArticle } from './fetcher'
import TurndownService = require('turndown')
import * as readline from 'node:readline';
import * as fs from 'fs'

const program = new Command()
program.parse(process.argv)

fs.mkdirSync(`${__dirname}/kibela`)

fetchAllKibelaArticle().then((response) => {
	if (response) {
		const turndownService = new TurndownService()
		response.forEach(element => {
			const markdown = turndownService.turndown(element.contentHtml)
			fs.appendFile(`${__dirname}/kibela/${element.title}.md`, markdown, (err) => {
				console.log(err)
			})
		})
	}
})

fetchFirstKibelaArticle().then((response) => {
	if (response) {
		const turndownService = new TurndownService()
		response.forEach(element => {
			const markdown = turndownService.turndown(element.contentHtml)
			fs.appendFile(`${__dirname}/kibela/${element.title}.md`, markdown, (err) => {
				console.log(err)
			})
		})
	}
})