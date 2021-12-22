const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const socketService = require('../../services/socket.service')
const groupService = require('./group.service')

async function getGroups(req, res) {
    try {
        const groups = await groupService.query(req.query)
        res.send(groups)
    } catch (err) {
        logger.error('Cannot get groups', err)
        res.status(500).send({ err: 'Failed to get groups' })
    }
}

async function deleteGroup(req, res) {
    try {
        const boardId = req.query.boardId
        await groupService.remove(boardId,req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete group', err)
        res.status(500).send({ err: 'Failed to delete group' })
    }
}


async function addGroup(req, res) {
    try {
        const boardId = req.query.boardId
        var group = req.body
        // group.byUserId = req.session.user._id
        group = await groupService.add(boardId,group)
        
        // // prepare the updated group for sending out
        // group.aboutUser = await userService.getById(group.aboutUserId)
        
        // // Give the user credit for adding a group
        // var user = await userService.getById(group.byUserId)
        // user.score += 10;
        // user = await userService.update(user)
        // group.byUser = user
        // const fullUser = await userService.getById(user._id)

        // console.log('CTRL SessionId:', req.sessionID);
        // socketService.broadcast({type: 'group-added', data: group, userId: group.byUserId})
        // socketService.emitToUser({type: 'group-about-you', data: group, userId: group.aboutUserId})
        // socketService.emitTo({type: 'user-updated', data: fullUser, label: fullUser._id})

        res.send(group)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add group', err)
        res.status(500).send({ err: 'Failed to add group' })
    }
}
async function updateGroup(req, res) {
    try {
        const boardId = req.query.boardId
        var group = req.body
        console.log(boardId);
        // group.byUserId = req.session.user._id
        group = await groupService.update(boardId,group)
        res.send(group)
    } catch (err) {
        console.log(err)
        logger.error('Failed to update group', err)
        res.status(500).send({ err: 'Failed to update group' })
    }
}

module.exports = {
    getGroups,
    deleteGroup,
    updateGroup,
    addGroup
}