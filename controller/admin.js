
const getNames = (req, res, next) => {

    res.status(200).json({ success: true, data: { request: 'get all names' } });

}
const insertname = (req, res, next) => {

    res.status(200).json({ success: true, data: { request: 'insert names' } });

}
const updateName = (req, res, next) => {

    res.status(200).json({ success: true, data: { request: `update name ${req.params.id}` } });

}
const deleteName = (req, res, next) => {

    res.status(200).json({ success: true, data: { request: `delete name ${req.params.id}` } });

}

module.exports = {
    getNames,insertname, updateName, deleteName
}