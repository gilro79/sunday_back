const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('board')
        const items = await collection.find().toArray()
        return items
    } catch (err) {
        logger.error('cannot find items', err)
        throw err
    }

}
async function update(item) {
    try {
        item._id = ObjectId(item._id)
        // delete item._id
        const collection = await dbService.getCollection('board')
        const resItem = await collection.updateOne({"_id":item._id}, {$set:item })
        return resItem
    } catch (err) {
        console.log(err);
        logger.error('cannot find items', err)
        throw err
    }

}

async function remove(itemId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { userId, isAdmin } = store
        const collection = await dbService.getCollection('board')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(itemId) }
        if (!isAdmin) criteria.byUserId = ObjectId(userId)
        await collection.deleteOne(criteria)
    } catch (err) {
        logger.error(`cannot remove item ${itemId}`, err)
        throw err
    }
}


async function add(item) {
    try {
        // peek only updatable fields!
        // const itemToAdd = {
        //     byUserId: ObjectId(item.byUserId),
        //     aboutUserId: ObjectId(item.aboutUserId),
        //     txt: item.txt
        // }
        const collection = await dbService.getCollection('board')
        await collection.insertOne(item)
        return item;
    } catch (err) {
        logger.error('cannot insert item', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    return criteria
}

module.exports = {
    query,
    remove,
    update,
    add
}


