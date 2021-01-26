import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Field, Formik } from 'formik';
import {
    Box,
    Button,
    // Checkbox,
    Container,
    TextField,
    Typography,
    makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import AuthService from 'src/common/AuthService';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        height: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const RegisterView = (props) => {
    const { editting, updateUser } = props;
    console.log(editting);
    const classes = useStyles();
    // const navigate = useNavigate();
    const [roles, setRoles] = useState([])

    const handleOnSubmit = value => {
        console.log(editting._id);
        const newObject = {
            ...value,
            name: value.name,
            role: { _id: Object.keys(value.role)[0] }
        };
        console.log(newObject);
        //api register
        AuthService.updateUser(editting._id, newObject)
            // .then(() => navigate('/app/user', {replace: true }))
            .then((res) => {
                const { data } = res;
                updateUser(data);
                // window.location.reload()
            })
            .catch((err) => {
                console.log('lỗi không tồn  tại', err);
                // window.location.reload()
            });
        // navigate('/app/user', { replace: true });

    }

    useEffect(() => {
        AuthService.getRoles()
            .then(res => {
                let resRole = res.data.roles.map(item => item)
                let result = resRole.filter(item => item.name !== "Authenticated" && item.name !== "Public")
                setRoles(result)
            })
    }, [])
    // console.log('data', roles.map(item => item._id));



    return (
        <Page
            className={classes.root}
            title="Register"
        >
            <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
            >
                <Container maxWidth="sm">
                    <Formik
                        initialValues={{
                            email: editting.email,
                            username: editting.username,
                            name: editting.name,
                            password: '',
                            role: editting.role,
                        }}
                        validationSchema={
                            Yup.object().shape({
                                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                                username: Yup.string().max(255).required('First name is required'),
                                name: Yup.string().max(255).required('First name is required'),
                                password: Yup.string().max(255).required('password is required'),
                                role: Yup.array()
                            })
                        }
                    // onSubmit={(value) => {
                    //     console.log(value);
                    //     const newObject = {
                    //         ...value,
                    //         name: value.name,
                    //         role: { _id: Object.keys(value.role)[0] }
                    //     };
                    //     console.log(newObject);
                    //     //api register
                    //     AuthService.updateUser(newObject)
                    //         // .then(() => navigate('/app/user', {replace: true }))
                    //         .then(() => {
                    //             navigate('/app/user', { replace: true })
                    //             // window.location.reload()
                    //         })
                    //         .catch((err) => {
                    //             console.log('lỗi không tồn  tại', err);
                    //             // window.location.reload()
                    //         });
                    //     // navigate('/app/user', { replace: true });

                    // }}
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            touched,
                            values,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box mb={3}>
                                    <Typography
                                        color="textPrimary"
                                        variant="h2"
                                    >
                                        Update User
                  </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                        variant="body2"
                                    >
                                        Edit User
                  </Typography>
                                </Box>
                                <TextField
                                    error={Boolean(touched.username && errors.username)}
                                    fullWidth
                                    helperText={touched.username && errors.username}
                                    label="User name"
                                    margin="normal"
                                    name="username"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.username}
                                    variant="outlined"
                                />
                                <TextField
                                    error={Boolean(touched.name && errors.name)}
                                    fullWidth
                                    helperText={touched.name && errors.name}
                                    label="Full name"
                                    margin="normal"
                                    name="name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name}
                                    variant="outlined"
                                />
                                <TextField
                                    error={Boolean(touched.email && errors.email)}
                                    fullWidth
                                    helperText={touched.email && errors.email}
                                    label="Email Address"
                                    margin="normal"
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="email"
                                    value={values.email}
                                    variant="outlined"
                                />
                                <TextField
                                    error={Boolean(touched.password && errors.password)}
                                    fullWidth
                                    helperText={touched.password && errors.password}
                                    label="Password"
                                    margin="normal"
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="password"
                                    value={values.password}
                                    variant="outlined"
                                />

                                {roles.map((item, index) => (
                                    <Box
                                        alignItems="center"
                                        display="flex"
                                        ml={-1}
                                        key={index}
                                    >
                                        <Field
                                            type="checkbox"
                                            checked={values.role._id === item._id ? true : false}
                                            value={values.item}
                                            name={`role[${item._id}]`}
                                            // name={`role[${index}].name`}
                                            onChange={handleChange}
                                        // onBlur={handleBlur}
                                        // onChange={e => {
                                        //     console.log(e.target.value);
                                        //     //khong lam gi ma log o day thi dau ra

                                        // }}

                                        />
                                        <Typography
                                            color="textSecondary"
                                            variant="body1"
                                        >
                                            {item.name}
                                        </Typography>
                                    </Box>
                                ))}
                                <Box my={2}>
                                    <Button
                                        color="primary"
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="button"
                                        variant="contained"
                                        onClick={() => handleOnSubmit(values)}
                                    >
                                        Update
                  </Button>
                                </Box>

                            </form>
                        )}
                    </Formik>
                </Container>
            </Box>
        </Page >
    );
};

export default RegisterView;
