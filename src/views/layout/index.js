// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';

// import { Container, Grid, Button, Card } from '@material-ui/core';
// import NavItem from './NavItem';
// import { Outlet, useMatch } from 'react-router';

// import AuthService from 'src/common/AuthService';



// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//         backgroundColor: theme.palette.background.paper,
//     },

//     bgDefault: {
//         backgroundColor: '#f4f6f8',
//     },
//     marginRight25: {
//         marginRight: 25
//     }
// }));

// export default function SimpleTabs(props) {

//     const classes = useStyles();
//     const [value, setValue] = React.useState(0);

//     const [group, setGroup] = useState([
//         {
//             href: '/app/layout/1',
//             title: 'Layout 1',
//         },
//         {
//             href: '/app/layout/2',
//             title: 'Layout 2'
//         },
//         {
//             href: '/app/layout/3',
//             title: 'Layout 3'
//         },
//         {
//             href: '/app/layout/4   ',
//             title: 'Layout 4'
//         }
//     ])

//     const handleAddContent = (values) => {
//         console.log(values)
//         group.push(values)
//     }

//     const columns = ["Name", "Company", "City", "State"];

//     const data = [
//         ["Joe James", "Test Corp", "Yonkers", "NY"],
//         ["John Walsh", "Test Corp", "Hartford", "CT"],
//         ["Bob Herm", "Test Corp", "Tampa", "FL"],
//         ["James Houston", "Test Corp", "Dallas", "TX"],
//     ];

//     // Form dialogs
//     const [open, setOpen] = React.useState(false);

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <Container maxWidth="lg" style={{ padding: "0px" }}>
//             <Grid container spacing={1} style={{ height: "100%" }} >

//                 <Grid item lg={2} md={2} xs={12} >
//                     <h2 style={{ textAlign: "center" }}>Layout</h2>
//                     <Card >
//                         {group.map(item => (
//                             <NavItem
//                                 href={item.href}
//                                 key={item.title}
//                                 title={item.title}
//                                 icon={item.icon}
//                             >{item.title}</NavItem>
//                         ))}
//                     </Card>
//                 </Grid>

//                 <Grid item lg={10} md={10} xs={12}>
//                     <Card>
//                         <Outlet />
//                     </Card>
//                 </Grid>
//             </Grid>
//         </Container>

//     );
// }