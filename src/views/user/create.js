import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Field, Formik } from 'formik';
import {
    Box,
    Button,
    Checkbox,
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

const RegisterView = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    // const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    // const [rolesId, setRolesId] = useState([])
    // useEffect(() => {
    //     AuthService.Users()
    //         .then(res => setUsers(res.data))
    // }, [])
    useEffect(() => {
        AuthService.getRoles()
            .then(res => {
                // let role = res.data.roles
                // console.log('data', role.map(item => item._id && item.name))
                let resRole = res.data.roles.map(item => item)
                // console.log(resRole)
                // let result = resRole.filter(item => item !== "Authenticated" && item !== "Public")
                let result = resRole.filter(item => item.name !== "Authenticated" && item.name !== "Public")
                // console.log('data', result)
                setRoles(result)
                // console.log('data', resRole.filter(item => item.name !== "Authenticated" && item.name !== "Public"));

                // setRoles(resRole)
            })
    }, [])
    console.log('data', roles.map(item => item._id));



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
                            username: '',
                            fullname: '',
                            email: '',
                            password: '',
                            role: [],
                            confirmed: false,

                        }}
                        validationSchema={
                            Yup.object().shape({
                                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                                username: Yup.string().max(255).required('First name is required'),
                                fullname: Yup.string().max(255).required('First name is required'),
                                password: Yup.string().max(255).required('password is required'),
                                confirmed: Yup.boolean().oneOf([true], 'This field must be checked'),
                                role: Yup.array()
                            })
                        }
                        onSubmit={(value) => {
                            console.log(value);
                            const newObject = {
                                ...value,
                                name: value.fullname,
                                role: { _id: Object.keys(value.role)[0] }
                            };
                            console.log(newObject);
                            //api register
                            AuthService.Register(newObject)
                                // .then(() => navigate('/app/user', {replace: true }))
                                .then(() => {
                                    console.log('data', value)
                                    navigate('/app/user', { replace: true })
                                    window.location.reload()
                                })
                                .catch((err) => {
                                    console.log('lỗi không tồn  tại', err);
                                    // window.location.reload()
                                });
                            // navigate('/app/user', { replace: true });

                        }}
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
                                        Create new account
                  </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                        variant="body2"
                                    >
                                        Use your email to create new account
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
                                    error={Boolean(touched.fullname && errors.fullname)}
                                    fullWidth
                                    helperText={touched.fullname && errors.fullname}
                                    label="Full name"
                                    margin="normal"
                                    name="fullname"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.fullname}
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
                                <Box
                                    alignItems="center"
                                    display="flex"
                                    ml={-1}
                                >
                                    <Checkbox
                                        checked={values.confirmed}
                                        name="confirmed"
                                        onChange={handleChange}
                                    />
                                    <Typography
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        Active
                                    </Typography>
                                </Box>

                                {roles.map((item, index) => (
                                    <Box
                                        alignItems="center"
                                        display="flex"
                                        ml={-1}
                                        key={index}
                                    >
                                        <Field
                                            type="checkbox"
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
                                        type="submit"
                                        variant="contained"
                                    >
                                        Sign up now
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
