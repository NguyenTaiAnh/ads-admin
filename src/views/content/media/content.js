import React, { useEffect, useState } from 'react'
import AuthService from 'src/common/AuthService';
import { Button, ButtonGroup } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
function Media(props) {
    const { typeTab } = props;
    const [dataMedia, setDataMedia] = useState([]);
    useEffect(() => {
        AuthService.getContent()
            .then(res => {
                setDataMedia(res.data)
            })
    }, [])
    //YEAH-MONTH-DAY
    function formatDate(day) {
        return new Date(day).toLocaleDateString().split('/').reverse().join('-')
    }
    const columns = [
        {
            type: 'IMAGE',
            value: [
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
                    name: "media",
                    label: "Media",
                    options: {
                        filter: true,
                        sort: false,
                        customBodyRender: (value) => {
                            return (
                                <div >
                                    <p>{value[0].width}x{value[0].height}</p>
                                </div>
                            );
                        }
                    }
                },

                {
                    name: "updatedAt",
                    label: "Date Modify",
                    options: {
                        filter: true,
                        sort: false,
                        customBodyRender: (value) => {
                            return (
                                <div style={{ width: '70px' }}>
                                    <p>{formatDate(value)}</p>
                                </div>
                            );
                        }
                    }
                },
                {
                    name: "media",
                    label: "Action",
                    options: {
                        filter: true,
                        sort: false,
                        customBodyRender: () => {
                            return (
                                <div style={{ width: '70px' }}>
                                    <p>
                                        <ButtonGroup variant="outlined" color="primary" style={{ width: "15%" }} >
                                            <Button ><EditIcon /></Button>
                                            <Button><DeleteIcon /></Button>
                                        </ButtonGroup>



                                    </p>
                                </div >
                            );
                        }
                    }
                },
            ]
        },
        {
            type: 'VIDEO',
            value: [
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
                    name: "media",
                    label: "Duration",
                    options: {
                        filter: true,
                        sort: false,
                        customBodyRender: (value) => {
                            return (
                                <div >
                                    {/* <p>{value[0].width}x{value[0].height}</p> */}
                                    <p>00:02:06</p>
                                </div>
                            );
                        }
                    }
                },

                {
                    name: "updatedAt",
                    label: "Date Modify",
                    options: {
                        filter: true,
                        sort: false,
                        customBodyRender: (value) => {
                            return (
                                <div style={{ width: '70px' }}>
                                    <p>{formatDate(value)}</p>
                                </div>
                            );
                        }
                    }
                },
                {
                    name: "setting",
                    label: "Action",
                    options: {
                        filter: true,
                        sort: false,
                        customBodyRender: () => {
                            return (
                                <div style={{ width: '70px' }}>
                                    <p>
                                        <ButtonGroup variant="outlined" color="primary" style={{ width: "15%" }} >
                                            <Button ><EditIcon /></Button>
                                            <Button><DeleteIcon /></Button>
                                        </ButtonGroup>
                                    </p>
                                </div >
                            );
                        }
                    }
                },
            ]
        },
        {
            type: 'SLIDE',
            value: [
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
                    name: "media",
                    label: "Media",
                    options: {
                        filter: true,
                        sort: false,
                        customBodyRender: (value) => {
                            return (
                                <div >
                                    <p>{value[0].width}x{value[0].height}</p>
                                </div>
                            );
                        }
                    }
                },

                {
                    name: "updatedAt",
                    label: "Date Modify",
                    options: {
                        filter: true,
                        sort: false,
                        customBodyRender: (value) => {
                            return (
                                <div style={{ width: '70px' }}>
                                    <p>{formatDate(value)}</p>
                                </div>
                            );
                        }
                    }
                },
                {
                    name: "setting",
                    label: "Action",
                    options: {
                        filter: true,
                        sort: false,
                        customBodyRender: () => {
                            return (
                                <div style={{ width: '70px' }}>
                                    <p>
                                        <ButtonGroup variant="outlined" color="primary" style={{ width: "15%" }} >
                                            <Button ><EditIcon /></Button>
                                            <Button><DeleteIcon /></Button>
                                        </ButtonGroup>
                                    </p>
                                </div >
                            );
                        }
                    }
                },
            ]
        },
        {
            type: 'TEXT',
            value: [
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
                    name: "media",
                    label: "Media",
                    options: {
                        filter: true,
                        sort: false,
                        customBodyRender: (value) => {
                            return (
                                <div >
                                    <p>{value[0].width}x{value[0].height}</p>
                                </div>
                            );
                        }
                    }
                },

                {
                    name: "updatedAt",
                    label: "Date Modify",
                    options: {
                        filter: true,
                        sort: false,
                        customBodyRender: (value) => {
                            return (
                                <div style={{ width: '70px' }}>
                                    <p>{formatDate(value)}</p>
                                </div>
                            );
                        }
                    }
                },
                {
                    name: "setting",
                    label: "Action",
                    options: {
                        filter: true,
                        sort: false,
                        customBodyRender: () => {
                            return (
                                <div style={{ width: '70px' }}>
                                    <p>
                                        <ButtonGroup variant="outlined" color="primary" style={{ width: "15%" }} >
                                            <Button ><EditIcon /></Button>
                                            <Button><DeleteIcon /></Button>
                                        </ButtonGroup>
                                    </p>
                                </div >
                            );
                        }
                    }
                },
            ]
        },
        {
            type: 'WEB',
            value: [
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
                    name: "media",
                    label: "Media",
                    options: {
                        filter: true,
                        sort: false,
                        customBodyRender: (value) => {
                            return (
                                <div >
                                    <p>{value[0].width}x{value[0].height}</p>
                                </div>
                            );
                        }
                    }
                },

                {
                    name: "updatedAt",
                    label: "Date Modify",
                    options: {
                        filter: true,
                        sort: false,
                        customBodyRender: (value) => {
                            return (
                                <div style={{ width: '70px' }}>
                                    <p>{value}</p>
                                </div>
                            );
                        }
                    }
                },
                {
                    name: "setting",
                    label: "Action",
                    options: {
                        filter: true,
                        sort: false,
                        customBodyRender: () => {
                            return (
                                <div style={{ width: '70px' }}>
                                    <p>
                                        <ButtonGroup variant="outlined" color="primary" style={{ width: "15%" }} >
                                            <Button ><EditIcon /></Button>
                                            <Button><DeleteIcon /></Button>
                                        </ButtonGroup>
                                    </p>
                                </div >
                            );
                        }
                    }
                },
            ]
        },
    ]



    // const options = {
    //     filterType: 'checkbox',
    // };
    return (
        <>
            <Button variant="contained" color="primary" >
                Add
                    </Button>
            {/* <Gr */}

            <MUIDataTable
                title={"Employee List"}
                data={dataMedia.filter(i => i.type === typeTab)}
                columns={columns.filter(item => item.type === typeTab)[0].value}
            // options={options}
            />
        </>
    )
}

export default Media
