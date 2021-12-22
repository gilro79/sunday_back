const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('board')
        const boards = await collection.find().toArray()
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }

}
async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = await collection.findOne({"_id":ObjectId(boardId)})
        return board
    } catch (err) {
        logger.error('cannot find board', err)
        throw err
    }

}
async function update(board) {
    try {
        board._id = ObjectId(board._id)
        // delete board._id
        const collection = await dbService.getCollection('board')
        const resBoard = await collection.updateOne({"_id":board._id}, {$set:board })
        return resBoard
    } catch (err) {
        console.log(err);
        logger.error('cannot find boards', err)
        throw err
    }

}

async function remove(boardId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { userId, isAdmin } = store
        const collection = await dbService.getCollection('board')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(boardId) }
        if (!isAdmin) criteria.byUserId = ObjectId(userId)
        await collection.deleteOne(criteria)
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}


async function add(board) {
    try {
        // peek only updatable fields!
        // const boardToAdd = {
        //     byUserId: ObjectId(board.byUserId),
        //     aboutUserId: ObjectId(board.aboutUserId),
        //     txt: board.txt
        // }
        const collection = await dbService.getCollection('board')
        await collection.insertOne(board)
        return board;
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    return criteria
}

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}


