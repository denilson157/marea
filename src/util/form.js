import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";

export const useForm = (initialValues, validateOnChange = false, validate) => {


    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }



    const resetForm = () => {
        setValues(initialValues);
        setErrors({})
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        }
    }
}))

export const Form = (props) => {

    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} encType="multipart/form-data" autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}

