import 'dotenv/config'
import {
	fetchAllKibelaArticle,
	fetchFirstKibelaArticle,
	fetchSpecifiedCountKibelaArticle,
	postNumber
} from './fetcher'
import TurndownService = require('turndown')
import * as fs from 'fs'
import inquirer = require('inquirer')

if (!fs.existsSync('kibela')) {
	fs.mkdirSync(`${__dirname}/../kibela`)
}

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
			fs.appendFile(`${__dirname}/../kibela/${removeSlash}.md`, markdown, (err) => {
				if (err) console.log(err)
			})
		} else {
			fs.appendFile(`${__dirname}/../kibela/${element.title}.md`, markdown, (err) => {
				if (err) console.log(err)
			})
		}
	})
}

inquirer
	.prompt([
		{
			type: 'list',
			name: 'script',
			message: '実行するスクリプトを選択してください',
			choices: [
				'全てのKibela記事をローカルにインポート',
				'最新Kibela記事をローカルにインポート',
				'指定件数、記事をローカルにインポート'
			]
		}
	])
	.then(answers => {
		switch (answers.script) {
			case '全てのKibela記事をローカルにインポート':
				fetchAllKibelaArticle().then((response) => {
					if (response) {
						outputFile(response)
					}
				})
				break

			case '最新Kibela記事をローカルにインポート':
				fetchFirstKibelaArticle().then((response) => {
					if (response) {
						outputFile(response)
					}
				})
				break

			case '指定件数、記事をローカルにインポート':
				inquirer
					.prompt([
						{
							type: 'input',
							name: 'specifiedCount',
							message: '何件取得しますか？',
							validate: (input) => Number(input) > 0,
						}
					])
				.then((response) => {
					postNumber().then((postCountReponse) => {
						if (postCountReponse) {
							if (response.specifiedCount < postCountReponse) {
								fetchSpecifiedCountKibelaArticle(response.specifiedCount).then((response) => {
									if (response) {
										outputFile(response)
									}
								})
							} else {
								console.error('指定された件数が投稿数を超えています')
							}
						}
					})
				})
				break
		}
	})