const Bootcamp = require('../models/Bootcamps')
const ErrorResponse = require('../helpers/errorResponse')


const getNames = async (req, res, next) => {
    try {
        let reqQuery={...req.query};
        const removeField=['select','sort'];
        removeField.forEach(param=>delete reqQuery[param]);
        let queryStr=JSON.stringify(reqQuery);
        let query=Bootcamp.find(req.body);


        // Select query
        if (req.query.select) {
            const selectBy = req.query.select.split(',').join(' ');
            query = query.select(selectBy);
        }

        // Sort query
        if (req.query.sort) {
            // const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(req.query.sort);
        }

        // Pagination query
        const page=parseInt(req.query.page,10)||1;
        const limit=parseInt(req.query.limit,10)||100;
        const startIndex=(page-1)*limit;
        const endIndex=page*limit;
        if (req.query.page||req.query.limit) {
            query=query.skip(startIndex).limit(limit)
        }
        const bootcamps = await query;
        res.status(200).json({ success: true, message: 'success', count: bootcamps.length, data: bootcamps });
    } catch (err) {
        res.status(404).json({ success: false, message: err.message, });
    }

}


const insertname = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        // console.log(req.body); 
        res.status(201).json({ success: true, data: bootcamp });
    } catch (err) {
        next(err)
    }
}


const getName = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);
        if (!bootcamp) {
            return next(new ErrorResponse(`Name not found with the ID of ${req.params.id}`, 404));
        }
        res.status(200).json({ success: true, data: bootcamp });
    } catch (err) {
        next(err);
    }
}


const updateName = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!bootcamp) {
            return next(new ErrorResponse(`Name not found with the ID of ${req.params.id}`, 404));
        }
        res.status(200).json({ success: true, data: bootcamp });
    } catch (err) {
        next(err);
    }
}


const deleteName = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        if (!bootcamp) {
            return next(new ErrorResponse(`Name not found with the ID of ${req.params.id}`, 404));
        }
        res.status(200).json({ success: true, data: Bootcamp });
    } catch (err) {
        next(err);
    }

}
module.exports = {
    getNames, insertname, getName, updateName, deleteName
}