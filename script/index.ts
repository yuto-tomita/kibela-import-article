import 'dotenv/config'
import { Command } from 'commander'
import { fetchAllKibelaArticle, fetchFirstKibelaArticle } from './fetcher'
import TurndownService = require('turndown')
import * as fs from 'fs'
import inquirer = require('inquirer')

fs.mkdirSync(`${__dirname}/kibela`)

const outputFile = (response: {
	__typename?: "Note";
	title: string;
	contentHtml: string;
}[]) => {
	const turndownService = new TurndownService()

	response.forEach((element) => {
		const markdown = turndownService.turndown(element.contentHtml)
		if (element.title.includes(' ') || element.title.includes('/')) {
			// TODO: Node.js実行環境をv15~と記述するようにする
	
			const removeBlank = element.title.replaceAll(' ', '_')
			const removeSlash = removeBlank.replaceAll('/', '_')
			fs.appendFile(`${__dirname}/kibela/${removeSlash}.md`, markdown, (err) => {
				if (err) console.log(err)
			})
		} else {
			fs.appendFile(`${__dirname}/kibela/${element.title}.md`, markdown, (err) => {
				if (err) console.log(err)
			})
		}
	})
}

inquirer
	.prompt([
		{
			type: 'input',
			name: 'accessToken',
			message: 'Kibelaのアクセストークンを入力してください',
			validate: (input) => !!input.length,
		},
		{
			type: 'list',
			name: 'script',
			message: '実行するスクリプトを選択してください',
			choices: [
				'全てのKibela記事をローカルにインポート',
				'最新Kibela記事をローカルにインポート'
			]
		}
	])
	.then(answers => {
		console.log(answers)

		if (answers.script === '全てのKibela記事をローカルにインポート') {
			fetchAllKibelaArticle().then((response) => {
				if (response) {
					outputFile(response)
				}
			})
		} else if (answers.script === '最新Kibela記事をローカルにインポート') {
			fetchFirstKibelaArticle().then((response) => {
				if (response) {
					outputFile(response)
				}
			})
		}
	})

const program = new Command()
program.parse(process.argv)