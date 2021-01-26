import { Button, ButtonGroup, Card, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import AuthService from 'src/common/AuthService';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateUser from './create'
import EditUser from './edit'
import './css/user.css'
// import { Title } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },


    },

    // edit: {
    //     maxWidth: "1000px",
    //     width: '500px',

    // }
}));
const UserAdmin = () => {
    const classes = useStyles();
    // const [userID, setUserID] = useState({
    //     id: null
    // })
    const [users, setUsers] = useState([])
    const [userEditting, setUserEditting] = useState('');

    useEffect(() => {
        AuthService.Users()
            .then(res => setUsers(res.data))
    }, [])

    const options = {
        filterType: 'checkbox',
        selectableRows: 'none',


    };

    // dialog
    //create
    const [create, setCreate] = React.useState(false);

    const handleClickOpenCreate = () => {
        setCreate(true);
    };

    const handleCloseCreate = () => {
        setCreate(false);
    };

    useEffect(() => {
        console.log(users);
    }, [users])
    //======================================================
    //================================================Update=============================================
    const [update, setUpdate] = React.useState(false);

    const handleClickOpenUpdate = (e, tableMeta) => {
        setUserEditting(tableMeta.rowData);
        setUpdate(true);
    };
    const updateUser = (newUser) => {
        let index = users.findIndex(item => item._id === newUser._id);
        if (index) {
            users[index] = newUser;
        }
        return;
    }
    const handleCloseUpdate = () => {
        setUpdate(false);
    };

    //============================================Delete ==================================================
    const [isDelete, setIsDelete] = useState(false)
    const handleClickOpenDelete = (e, tableMeta) => {
        console.log(tableMeta);
        setUserEditting(tableMeta.rowData);
        console.log(userEditting);
        setIsDelete(true);
    };

    const handleCloseDelete = () => {
        setIsDelete(false);
    };

    const handleDeleteUser = id => {
        console.log(userEditting);
        AuthService.deleteUser(id)
            // .then(() => navigate('/app/user', {replace: true }))
            .then((res) => {
                const { data } = res;
                const index = users.findIndex(item => item._id === data._id);
                setUsers([...users.slice(0, index), ...users.slice(index + 1)]);
                setIsDelete(false);
            })
            .catch((err) => {
                console.log('lỗi không tồn  tại', err);
                // window.location.reload()
            });
    }
    // ==================================Table================================================
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
            name: "username",
            label: "User Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "name",
            label: "Full Name",
            options: {
                filter: true,
                sort: false,

            }
        },
        {
            name: "point",
            label: "Points",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    // console.log('role', value)
                    return (
                        <div style={{ width: '70px' }}>
                            <p>{value ? value.name : ''}</p>
                        </div>
                    );
                }
            }
        },

        {
            name: "role",
            label: "Role",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    // console.log('role', value)
                    return (
                        <div style={{ width: '70px' }}>
                            <p>{value.name}</p>
                        </div>
                    );
                }
            }
        },
        {
            name: "blocked",
            label: "Status",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    // console.log('point', value)
                    return (
                        <div style={{ width: '70px' }}>
                            <p>{value ? "In-active" : "Active"}</p>
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
                customBodyRender: (value, tableMeta, updateUser) => {
                    // console.log(value, tableMeta, updateValue);
                    return (
                        <div style={{ width: '70px' }}>


                            <ButtonGroup variant="outlined" color="primary" style={{ width: "15%" }} >
                                <Button onClick={(e) => handleClickOpenUpdate(e, tableMeta)} ><EditIcon /></Button>
                                <Button onClick={(e) => handleClickOpenDelete(e, tableMeta)} ><DeleteIcon /></Button>
                            </ButtonGroup>
                        </div>
                    );
                },
            }
        },
    ];
    return (
        <Card className="card_user">
            {/* =======================================Create -================================== */}
            <div style={{ textAlign: "right" }}>
                <Button variant="outlined" color="primary" style={{ width: "15%" }} onClick={handleClickOpenCreate}>
                    Add
            </Button>
                <Dialog open={create} onClose={handleCloseCreate} aria-labelledby="form-dialog-title" className="dialog-user">

                    <DialogContent className={classes.edit}>

                        <CreateUser />
                    </DialogContent>
                </Dialog>
            </div>

            {/* =======================================Update -================================== */}

            <Dialog open={update} onClose={handleCloseUpdate} aria-labelledby="form-dialog-title" className="dialog-user">

                <DialogContent className={classes.edit}>

                    <EditUser editting={users.find(item => item._id === userEditting[0])} updateUser={updateUser} />
                </DialogContent>
            </Dialog>

            {/* =======================================Delete -================================== */}

            <Dialog open={isDelete} onClose={handleCloseDelete} aria-labelledby="form-dialog-title" className="dialog-user">

                <DialogContent className={classes.edit}>
                    <h1>Are you sure delete ....</h1>
                    <div>
                        <Button variant="outlined" color="primary" style={{ width: "15%" }} onClick={() => handleDeleteUser(userEditting[0])} >Yes</Button>
                        <Button variant="outlined" color="secondary" style={{ width: "15%" }} onClick={() => setIsDelete(false)}>No</Button>
                    </div>
                </DialogContent>
            </Dialog>

            <MUIDataTable
                title={"Employee List"}
                data={users}
                columns={columns}
                options={options}
            />
        </Card>
    )
}

export default UserAdmin
