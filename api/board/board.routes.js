const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {log} = require('../../middlewares/logger.middleware')
const {sendMail,addBoard,updateBoard,getBoard, getBoards, deleteBoard} = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getBoards)
router.get('/:id', log, getBoard)
router.put('/',  log, updateBoard)
router.post('/',  log, addBoard)
router.post('/send',  log, sendMail)
// router.post('/',  log, requireAuth, addBoard)
router.delete('/:id',  requireAuth, deleteBoard)

module.exports = router