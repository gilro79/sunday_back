const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const socketService = require('../../services/socket.service')
const boardService = require('./board.service')

async function getBoards(req, res) {
    try {
        const boards = await boardService.query(req.query)
        res.send(boards)
    } catch (err) {
        logger.error('Cannot get boards', err)
        res.status(500).send({ err: 'Failed to get boards' })
    }
}
async function getBoard(req, res) {
    try {
        const board = await boardService.getById(req.params.id)
        res.send(board)
    } catch (err) {
        logger.error('Cannot get boards', err)
        res.status(500).send({ err: 'Failed to get boards' })
    }
}

async function deleteBoard(req, res) {
    try {
        await boardService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete board', err)
        res.status(500).send({ err: 'Failed to delete board' })
    }
}


async function addBoard(req, res) {
    try {
        var board = req.body
        // board.byUserId = req.session.user._id
        board = await boardService.add(board)
        
        // // prepare the updated board for sending out
        // board.aboutUser = await userService.getById(board.aboutUserId)
        
        // // Give the user credit for adding a board
        // var user = await userService.getById(board.byUserId)
        // user.score += 10;
        // user = await userService.update(user)
        // board.byUser = user
        // const fullUser = await userService.getById(user._id)

        // console.log('CTRL SessionId:', req.sessionID);
        // socketService.broadcast({type: 'board-added', data: board, userId: board.byUserId})
        // socketService.emitToUser({type: 'board-about-you', data: board, userId: board.aboutUserId})
        // socketService.emitTo({type: 'user-updated', data: fullUser, label: fullUser._id})

        res.send(board)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add board', err)
        res.status(500).send({ err: 'Failed to add board' })
    }
}
async function updateBoard(req, res) {
    try {
        var board = req.body
        // board.byUserId = req.session.user._id
        board = await boardService.update(board)
        
        res.send(board)

    } catch (err) {
        console.log(err)
        logger.error('Failed to update board', err)
        res.status(500).send({ err: 'Failed to update board' })
    }
}









const CLIENT_ID='62152258678-cmbr3bi61m62maik00fcm3dhl912j9c5.apps.googleusercontent.com'
const CLIENT_SECRET='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'
const REDIRECT_URI='https://developers.google.com/oauthplayground'
const REFRESH_TOKEN='1//04SixJjcPZvIHCgYIARAAGAQSNwF-L9IrDXSTcJSmq2veTLmUGUihT07xG4mmX2Zg9usWv1sd7OcG6Ho5_JxhTh9tC4qC8KFXkwM'

const oAuth2Client =new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)

oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})




////////////////  GMAIL   ////////////////////
async function sendMail(req, res){
    try {
        const accessToken =await oAuth2Client.getAccessToken()
        const transport =nodemailer.createTransport({
            service:'gmail',
            auth:{
                type:'OAuth2',
                user:'yaakovmargalit@gmail.com',
                clientId:CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken:accessToken
            }
        })
        const mailOptions=req.body


   

        const result = await transport.sendMail(mailOptions)
        return result

    } catch (error) {
        return error
    }

}
module.exports = {
    getBoards,
    getBoard,
    deleteBoard,
    updateBoard,
    addBoard,
    sendMail
}