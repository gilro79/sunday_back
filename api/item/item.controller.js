const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const socketService = require('../../services/socket.service')
const itemService = require('./item.service')

async function getItems(req, res) {
    try {
        const items = await itemService.query(req.query)
        res.send(items)
    } catch (err) {
        logger.error('Cannot get items', err)
        res.status(500).send({ err: 'Failed to get items' })
    }
}

async function deleteItem(req, res) {
    try {
        await itemService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete item', err)
        res.status(500).send({ err: 'Failed to delete item' })
    }
}


async function addItem(req, res) {
    try {
        var item = req.body
        // item.byUserId = req.session.user._id
        item = await itemService.add(item)
        
        // // prepare the updated item for sending out
        // item.aboutUser = await userService.getById(item.aboutUserId)
        
        // // Give the user credit for adding a item
        // var user = await userService.getById(item.byUserId)
        // user.score += 10;
        // user = await userService.update(user)
        // item.byUser = user
        // const fullUser = await userService.getById(user._id)

        // console.log('CTRL SessionId:', req.sessionID);
        // socketService.broadcast({type: 'item-added', data: item, userId: item.byUserId})
        // socketService.emitToUser({type: 'item-about-you', data: item, userId: item.aboutUserId})
        // socketService.emitTo({type: 'user-updated', data: fullUser, label: fullUser._id})

        res.send(item)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add item', err)
        res.status(500).send({ err: 'Failed to add item' })
    }
}
async function updateItem(req, res) {
    try {
        var item = req.body
        console.log(item);
        // item.byUserId = req.session.user._id
        item = await itemService.update(item)
        
      
        res.send(item)

    } catch (err) {
        console.log(err)
        logger.error('Failed to update item', err)
        res.status(500).send({ err: 'Failed to update item' })
    }
}

module.exports = {
    getItems,
    deleteItem,
    updateItem,
    addItem
}