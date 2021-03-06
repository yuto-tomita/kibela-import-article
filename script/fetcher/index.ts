import { GraphQLClient } from 'graphql-request'
import { getSdk } from '../graphql/types'

const headers = {
	Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
	'Content-Type': 'application/json'
}

const client = new GraphQLClient(`https://${process.env.KIBELA_DOMAIN}/api/v1`)
const sdk = getSdk(client)

export const postNumber = async() => {
	try {
		const res = await sdk.fetchPostNumber(
			{ first: 1 },
			headers
		)
		return res.currentUser ? res.currentUser.latestNotes.totalCount : 0
	} catch (e) {
		console.log(e)
	}
}

export const fetchAllKibelaArticle = async () => {
	try {
		const postNumberResponse = await sdk.fetchPostNumber(
			{ first: 1 },
			headers
		)

		if (postNumberResponse.currentUser) {
			const allArticleContent = await sdk.fetchKibelaArticleContentQuery(
				{ first: postNumberResponse.currentUser.latestNotes.totalCount },
				headers
			)
			return allArticleContent.currentUser ? allArticleContent.currentUser.latestNotes.nodes : []
		}
	} catch (e) {
		console.log(e)
	}
}

export const fetchFirstKibelaArticle = async () => {
	try {
		const res = await sdk.fetchFirstKibelaArticleContentQuery(
			{ first: 1 },
			headers
		)

		return res.currentUser ? res.currentUser?.latestNotes.nodes : []
	} catch (e) {
		console.log(e)
	}
}

export const fetchSpecifiedCountKibelaArticle = async (specifiedCount: number) => {
	try {
		const res = await sdk.fetchKibelaArticleContentQuery(
			{ first: specifiedCount },
			headers
		)

		return res.currentUser ? res.currentUser.latestNotes.nodes : []
	} catch (e) {
		console.log(e)
	}
}