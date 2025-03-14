import Joi from 'joi';

// Validation schema
const projectSchema = Joi.object({
    name: Joi.string().min(3).max(18).pattern(/^(?!\d+$).+/).required().messages({
        'string.empty': 'Project name is required',
        'string.min': 'Project name must be at least 3 characters',
        'string.max': 'Project name must be less than 18 characters',
        "string.pattern.base": "Project name cannot contain only numbers",
    }),

    description: Joi.string().min(10).max(500).pattern(/^(?!\d+$).+/).required().messages({
        'string.empty': 'Project description is required',
        'string.min': 'Project description must be at least 10 characters',
        'string.max': 'Project description must be less than 500 characters',
        "string.pattern.base": "Project description cannot contain only numbers",
    }),

    startDate: Joi.date().iso().required().messages({
        'date.base': 'Start date must be a valid date',
        'any.required': 'Start date is required',
    }),

    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required().messages({
        'date.greater': 'End date must be after the start date',
        'any.required': 'End date is required',
    }),

    employeeIds: Joi.array().items(Joi.string().hex().length(24)).min(1).required().messages({
        'array.base': 'Employees must be an array',
        'array.min': 'At least one employee must be selected',
        'string.hex': 'Invalid employee ID format',
        'string.length': 'Employee ID must be 24 characters long',
    }),
});

// Validation middleware
const validateProject = async (req, res, next) => {
    const { error } = projectSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({errors: error.details.map((err)=>err.message)})
    }
    next()
};

export default validateProject;
