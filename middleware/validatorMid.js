const apiValidator = (validationSchema) => (req, res, next) => {
    if (validationSchema) {
        const validator = validationSchema?.validate(req.body);
        if (validator.error) {
            return res.status(403).json({ code: 0, message: validator.error.message.replace(/"/g, '') });
        } else {
            next();
        }
    } else {
        return res.status(500).json({ code: 0, message: "Validation Schema Not Provided." });
    }
};

module.exports = apiValidator;
