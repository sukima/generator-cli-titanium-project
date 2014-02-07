express   = require("express")
asset_dir = "#{__dirname}/assets"

app = express()

app.use "/", express.static(asset_dir)

console.log "Server started at http://localhost:3000/"
console.log "Press CTRL-C to exit."

module.exports = app.listen 3000
