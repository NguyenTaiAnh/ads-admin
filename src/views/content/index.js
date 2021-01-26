import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { Container, Grid, Button, Card } from '@material-ui/core';
// Form dialogs

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Formik, Form } from 'formik';
// import NavItem from './NavItem';
import { Outlet } from 'react-router';
import NavItem from './NavItem';
import AuthService from 'src/common/AuthService';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },

    bgDefault: {
        backgroundColor: '#f4f6f8',
    },
    marginRight25: {
        marginRight: 25
    }
}));

export default function SimpleTabs(props) {

    const classes = useStyles();
    // const [value, setValue] = React.useState(0);

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };
    const [group, setGroup] = useState([])
    useEffect(() => {
        AuthService.GroupContent()
            .then(res => { setGroup(res.data) })
            .catch(err => console.log("loi roi:  ", err))
    }, [])
    // console.log(group)
    // const handleAddContent = (values) => {
    //     console.log(values)
    //     group.push(values)
    // }



    // Form dialogs
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container maxWidth="lg" style={{ padding: "0px" }}>
            <Grid container spacing={1} style={{ height: "100%" }} >

                <Grid item lg={3} md={3} xs={12} sm={12}>
                    <Button variant="contained" color="primary" onClick={handleClickOpen} className={classes.marginRight25} >
                        Add
                     </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Add</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Add Name
                            </DialogContentText>
                            {/* <Formik initialValues={{ title: '' }} onSubmit={handleAddContent}> */}
                            <Formik initialValues={{ title: '' }} >
                                {({
                                    handleBlur,
                                    handleChange,
                                    values }
                                ) => {
                                    return (
                                        <Form>
                                            <TextField
                                                autoFocus
                                                name="title"
                                                margin="dense"
                                                id="name"
                                                label="Name"
                                                type="text"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.title}

                                                fullWidth
                                            />

                                            <Button type="submit" color="primary">
                                                Add
                                        </Button>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            {/* <Button type="submit" onClick={handleAddContent} color="primary">
                                Add
                            </Button> */}
                        </DialogActions>
                    </Dialog >


                    {/* =========== */}
                    <Button variant="outlined" className={classes.marginRight25} >
                        Edit
                </Button >
                    <Button variant="contained" color="secondary">
                        Delete
                </Button>
                    <Card>
                        {Object.values(group).map((item, index) => (
                            <NavItem
                                href={`/app/content/${item._id}`}
                                key={item.name}
                                title={item.name}
                                icon={item.icon}
                            >{item.name}</NavItem>
                        ))}
                    </Card>
                </Grid >

                <Grid item lg={9} md={9} xs={12} sm={12}>
                    <Card>
                        <Outlet />
                    </Card>
                </Grid>
            </Grid >
        </Container >

    );
}