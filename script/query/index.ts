import { gql } from 'graphql-request'

export const fetchKibelaArticleContentQuery = gql`
{
	currentUser {
		latestNotes(first: 1) {
			nodes {
				contentTocHtml
			}
		}
	}
}
`

export const fetchPostNumber = gql`
{
	currentUser {
		latestNotes(first: 1) {
			totalCount
			nodes {
				contentTocHtml
			}
		}
	}
}
`