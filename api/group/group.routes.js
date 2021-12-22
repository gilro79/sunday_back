const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {log} = require('../../middlewares/logger.middleware')
const {addGroup,updateGroup, deleteGroup} = require('./group.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.put('/',  log, updateGroup)
router.post('/',  log, addGroup)
// router.post('/',  log, requireAuth, addGroup)
router.delete('/:id', deleteGroup)

module.exports = router