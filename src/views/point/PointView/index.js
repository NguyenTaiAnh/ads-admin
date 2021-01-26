import { Button, ButtonGroup, Card, makeStyles, MenuItem } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import AuthService from 'src/common/AuthService';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { isNull } from 'lodash';
// import { SentimentSatisfied } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '45ch',
        },

    },

    edit: {
        width: '500px',
        textAlign: "center"
    }
}));

const PointView = () => {
    const classes = useStyles();
    const [pointEditting, setPointEditting] = useState('');
    const [newvalue, setNewValue] = useState({
        name: "",
        description: "",
        users: ""
    })
    const [active, setActive] = useState({
        activated: "",
    })
    const [isActive, setIsActive] = useState(true)
    const [update, setUpdate] = useState(false)
    const [open, setOpen] = React.useState(false);

    const [points, setPoints] = useState([])

    // useEffect(() => {
    //     AuthService.Points()
    //         .then(res => {
    //             const checkactive = res.data.filter(i => i.activated === true)
    //             console.log(checkactive)

    //         })
    // }, [])

    function getAll() {
        AuthService.Points()
            .then(res => setPoints(res.data))
            .catch(err => console.log("loi : ", err))
    }
    useEffect(() => {
        getAll()
    }, [])

    const handleActive = (values) => {
        console.log(values)
        const data = {
            ...active,
            activated: active[5]
        }
        let id = active[0]
        console.log('object', id)
        // AuthService.putPoint(id, data)
        //     .then(res => {
        //         console.log(res)
        //         handleReload()
        //     })
        if (values[5] === true) {
            console.log("in-active")
        } else {
            console.log("active")
        }

    }
    //======================Update=============================
    const handleClickUdate = (values) => {
        // console.log('Update', values);

        setUpdate(true)
        const id = values['0']
        const data = {
            ...values,
            name: values[1],
            description: values[2],
            users: values[3][0],
            // activated: values[3]
        }

        // console.log('setNew', data.users)
        setNewValue(data)
        console.log('id-data', id)
    };

    const handleCloseUpdate = () => {

        setUpdate(false);
    };
    // dialog



    const handleReload = () => {
        handleCloseUpdate()
        handleClose()
        getAll()

    }

    // ========================post Point bg================================================
    const handleClickOpen = () => {
        setNewValue("")
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOnChange = (e) => {
        const target = e.target;
        const value = target.value;

        setNewValue({
            ...newvalue,
            [target.name]: value
        })
    }

    // console.log(newvalue.users[0])

    const onSubmit = (e) => {
        e.preventDefault()
        let data = {
            ...newvalue,
            users: [{ "_id": newvalue.users._id }]
            // users: [{ "name": newvalue.users.name }]
        }
        let id = data[0]
        console.log('id_data', id)
        // console.log()

        if (!update) {
            AuthService.postPoint(data)
                .then(res => {
                    console.log(res.data)
                    handleReload()
                })
                .catch(() => {
                    console.log('lỗi ');
                    alert("loi")
                });
        } else {
            AuthService.putPoint(id, data)
                .then(res => {
                    console.log(res)
                    handleReload()
                    // window.location.reload()
                })
                .catch(() => {
                    console.log('lỗi ');
                    alert("loi")
                });
        }

        console.log(data)
    }



    // console.log('data', points);
    const [users, setUsers] = useState([])
    useEffect(() => {
        AuthService.Users()
            .then(res => {
                let data = res.data.filter(item => item.role.type === "admin");
                setUsers(data)

            })
            .catch(err => console.log("loi : ", err))
    }, [])
    //======================================

    //YEAH-MONTH-DAY
    function formatDate(day) {
        return new Date(day).toLocaleDateString().split('/').reverse().join('-')
    }

    // console.log({ points })
    const columns = [
        {
            name: "_id",
            label: "No",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => {
                    let index = tableMeta.rowIndex + 1;
                    const isBlock = tableMeta.rowData[8];
                    return (
                        <div>
                            <p className={isBlock ? '' : 'block'}>{index}</p>
                        </div>
                    );
                }

            }
        },
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "description",
            label: "Description",
            options: {
                filter: true,
                sort: false,
                display: false
            }
        },
        {
            name: "users",
            label: "Users",
            options: {
                filter: true,
                sort: false,
                display: false,
                customBodyRender: (value) => {
                    return (
                        <div >
                            <p>{value.map(item => item.name)}</p>
                        </div>
                    );
                }
            }
        },
        {
            name: "createdAt",
            label: "Create Date",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    return (
                        <div >
                            <p>{formatDate(value)}</p>
                        </div>
                    );
                }
            }
        },

        {
            name: "activated",
            label: "Status",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    return (
                        <div style={{ width: '70px' }}>
                            <p>{value ? "Active" : "In-active"}</p>
                        </div>
                    );
                }
            }
        },
        {
            name: "activated",
            label: "Action",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <div style={{ width: '70px' }}>
                            <p>
                                {value ?
                                    <ButtonGroup variant="outlined" color="primary" style={{ width: "15%" }} >
                                        <Button onClick={() => handleClickUdate(tableMeta.rowData)}><EditIcon /></Button>
                                        <Button><DeleteIcon /></Button>
                                        <Button><LockIcon onClick={() => handleActive(tableMeta.rowData)} /></Button>

                                    </ButtonGroup>

                                    :
                                    <>

                                        <ButtonGroup variant="outlined" color="primary" style={{ width: "15%" }} >
                                            <Button onClick={() => handleClickUdate(tableMeta.rowData)}><EditIcon /></Button>
                                            <Button><DeleteIcon /></Button>
                                            <Button><LockOpenIcon onClick={() => handleActive(tableMeta.rowData)} /></Button>
                                        </ButtonGroup>
                                    </>
                                }
                                {/* <ButtonGroup variant="outlined" color="primary" style={{ width: "15%" }} >
                                    <Button onClick={() => handleClickUdate(tableMeta.rowData)}><EditIcon /></Button>
                                    <Button><DeleteIcon /></Button>
                                </ButtonGroup> */}
                            </p>
                        </div >
                    );
                }
            }
        },
    ];


    const options = {
        // filterType: 'checkbox',
        // filterType: 'dropdown',
        selectableRows: 'none'
    };

    return (

        <Card>
            {/* ================================Update======================================= */}
            <Dialog open={update} onClose={handleCloseUpdate} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Point</DialogTitle>

                <form className={classes.root} noValidate autoComplete="off"
                    onSubmit={onSubmit}
                >
                    <DialogContent className={classes.edit}>

                        <TextField
                            id="outlined-textarea"
                            label="Name"
                            name="name"
                            placeholder="Name"
                            multiline
                            variant="outlined"
                            value={newvalue.name}
                            onChange={handleOnChange}
                        />
                        <br />
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            name="description"
                            multiline
                            rows={5}
                            placeholder="Description"
                            value={newvalue.description}
                            onChange={handleOnChange}

                            variant="outlined"
                        />

                        <br />
                        <TextField
                            name="users"
                            id="outlined-select-currency"
                            select
                            label={newvalue.users ? newvalue.users.name : null}
                            // value={newvalue.users[0] ? newvalue.users[0].name : null}
                            value={newvalue.users}
                            onChange={handleOnChange}
                            variant="outlined"
                        >
                            {users.map((item, index) => {
                                // console.log('newvalue', newvalue.users.name)
                                // console.log('item', item.name)
                                // console.log('so sanh ', newvalue.users.name === item.name);
                                return (
                                    <MenuItem key={index} value={item}>
                                        {item.name}
                                    </MenuItem>
                                )
                            })}
                        </TextField>
                        <br />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseUpdate} color="primary">
                            Cancel
          </Button>
                        {/* <Button color="primary" type="submit" value="Submit">
                            Save
          </Button> */}
                        <Button type="submit" on>Update</Button>
                        {/* <Button type="button" onClick={() => onSubmitUpdate(newvalue)}>Update</Button> */}
                    </DialogActions>
                </form>
            </Dialog>

            {/* ============================================== ADD ============================================ */}
            <Button variant="outlined" color="primary" style={{ width: "15%" }} onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Point</DialogTitle>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit} >
                    <DialogContent className={classes.edit}>

                        <TextField
                            id="outlined-textarea"
                            label="Name"
                            name="name"
                            placeholder="Name"
                            multiline
                            variant="outlined"
                            value={newvalue.name}
                            onChange={handleOnChange}
                        />
                        <br />
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            name="description"
                            multiline
                            rows={5}
                            placeholder="Description"
                            value={newvalue.description}
                            onChange={handleOnChange}

                            variant="outlined"
                        />

                        <br />
                        {/* <FormControl >

                            <InputLabel id="demo-simple-select-label">ROLES</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="role"
                                value={newvalue.role}
                                onChange={handleOnChange}
                                variant="outlined"
                            >
                                {
                                    new_arr.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                                }
                            </Select>
                        </FormControl> */}
                        <br />
                        <TextField
                            name="users"
                            id="outlined-select-currency"
                            select
                            label="Admin"
                            value={newvalue.users}
                            onChange={handleOnChange}
                            variant="outlined"
                        >
                            {users.map((item, index) =>
                            (<MenuItem key={index} value={item}>
                                {item.name}
                            </MenuItem>))}
                        </TextField>
                        <br />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
          </Button>
                        {/* <Button color="primary" type="submit" value="Submit">
                            Save
          </Button> */}
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>

            <MUIDataTable
                title={"Employee List"}
                data={points}
                columns={columns}
                options={options}
            />
        </Card >
    )
}

export default PointView
