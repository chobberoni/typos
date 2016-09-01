github = require('githubot')

github.get "https://api.github.com/users/iangreenleaf/gists", (gists) ->
  console.log gists[0].description
