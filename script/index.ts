import 'dotenv/config'
import { Command } from 'commander'
import { fetchAllKibelaArticle } from './fetcher'
import TurndownService = require('turndown')
import * as fs from 'fs'

const program = new Command()
program.parse(process.argv)

// TODO: KibelaAPIから最新の記事のHTMLと全ての投稿のHTMLを取得する処理を作成する
// TODO; 取得したHTMLをパースしてMarkdown形式に変換できるようなライブラリを調査する


fetchAllKibelaArticle().then((response) => {
	if (response) {
		const turndownService = new TurndownService()
		response.forEach(element => {
			const markdown = turndownService.turndown(element.contentHtml)
			fs.appendFile(`${__dirname}/${element.title}.md`, markdown, (err) => {
				console.log(err)
			})
		})
		console.log(__dirname)
	}
})