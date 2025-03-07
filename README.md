# oidc-client: OpenID Connect client using Metro and middleware

[![Project stage: Experimental][project-stage-badge: Experimental]][project-stage-page]

```javascript
import oidcClient from '@muze-nl/oidc-client'

async function main() {
  const client = new oidcClient()
  try {
    const session = await client.signIn('https://solidcommunity.net/')
    if (session.isAuthenticated()) {
      const file = await session.get(fileURL) // fill this in
      await session.signOut()
    }
  } catch(err) {
    alert(err)
  }
}
```

## Installation

```shell
npm i @muze-nl/oidc-client
```
Or use a CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/@muze-nl/oidc-client/dist/browser.min.js"></script>
```

## Metro

The `oidcClient` extends the `metro` client, so it supports all the things that metro does, including middleware. 
[Read more about metro here](https://github.com/muze-nl/metro/)
It also uses the [`metro-oidc` middleware](https://github.com/muze-nl/metro-oidc/), any options you want to pass 
on to that, you must pass on in the `.oidc` options property in the constructor, like this:

```javascript
import oidcClient from '@muze-nl/oidc-client'

const client = new oidcClient({
  oidc: {
    client_info: {
      client_name: 'My oidc client'
    }
  }
})
```

[project-stage-badge: Experimental]: https://img.shields.io/badge/Project%20Stage-Experimental-yellow.svg
[project-stage-page]: https://blog.pother.ca/project-stages/
