import metro from '@muze-nl/metro'
import oidc from '@muze-nl/metro-oidc'

export class oidcClient extends metroClient
{

	constructor(...options)
	{
		const defaultOptions = {
			oidc: {
				client_info: {
					client_id: metro.url(window.location).authority
				}
			}
		}
		options.forEach(o => {
			if (o && typeof o == 'object') {
				Object.assign(defaultOptions, o)
			}
		})
		this.oidc = defaultOptions.oidc || {}
		const oidcmw = oidc.oidcmw(this.oidc)
		options.push({
			middleware: {
				oidcmw
			}
		})
		this.options = defaultOptions
		super.apply(options)
	}

	async signIn(issuer=null) {
		let options = structuredClone(this.options)
		if (issuer) {
			options.oidc.issuer = issuer
		}
		let result = await oidc.authenticate(options.oidc)
		if (result) {
			return new oidcClient(options)
		} else {
			throw new Error('signIn failed')
		}
	}

	isAuthenticated() {
		return oidc.idToken(this.options.openid_configuration)
	}

	async signOut() {
		if (!this.isAuthenticated()) {
			return true
		}
		if (this.options.oidc.openid_configuration.end_session_endpoint) {
			let response = await this.get(this.options.oidc.openid_configuration.end_session_endpoint, {
				id_token_hint: oidc.idToken(this.options.oidc),
				client_id: this.options.oidc.client_info.client_id,
				post_logout_redirect_url: this.options.oidc.client_info.post_logout_redirect_urls[0]
			})
		}
		this.options.oidc.oauth2_configuration.tokens.clear()
		this.options.oidc.openid_configuration.store.clear()
		return true
	}
}

