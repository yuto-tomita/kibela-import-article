import 'dotenv/config'
import { Command } from 'commander'
import { request } from 'graphql-request'
import query from './query/fetchKibelaArticle'

const program = new Command()
program.parse(process.argv)


// TODO: KibelaAPIから最新の記事のHTMLと全ての投稿のHTMLを取得する処理を作成する
// TODO; 取得したHTMLをパースしてMarkdown形式に変換できるようなライブラリを調査する
const headers = {
	Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
	'Content-Type': 'application/json'
}

const fetchKibelaArticle = async () => {
	try {
		const res = await request({
			url: `https://${process.env.KIBELA_DOMAIN}/api/v1`,
			document: query,
			requestHeaders: headers
		})
		console.log(res)
	} catch (e) {
		console.log(e)
	}
}

fetchKibelaArticle()