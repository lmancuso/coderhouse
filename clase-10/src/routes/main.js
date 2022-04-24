//----------* REQUIRE'S *----------//
const { Router } = require('express')
const router = new Router()

//----------* MAIN ROUTES *----------//
router.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/public/index.html')
})

//----------* EXPORTS ROUTER *----------//
module.exports = router
