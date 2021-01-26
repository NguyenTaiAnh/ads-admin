import {
    // Avatar,
    Box,
    Divider,
    Drawer,
    Hidden,
    List,
    makeStyles,
    // Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
    AlertCircle as AlertCircleIcon,
    BarChart as BarChartIcon,
    Lock as LockIcon,
    // Settings as SettingsIcon,
    // ShoppingBag as ShoppingBagIcon,
    // User as UserIcon,
    UserPlus as UserPlusIcon,
    Users as UsersIcon
} from 'react-feather';
// import WidgetsIcon from '@material-ui/icons/Widgets';
import { useLocation } from 'react-router-dom';
// import { Link as RouterLink, useLocation } from 'react-router-dom';
import NavItem from './NavItem';
import TvIcon from '@material-ui/icons/Tv';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import RoomIcon from '@material-ui/icons/Room';
// import AuthService from 'src/common/AuthService';
// const user = {
//     avatar: '/static/images/avatars/avatar_6.png',
//     jobTitle: 'Senior Developer',
//     name: 'Katarina Smith'
// };

const useStyles = makeStyles(() => ({
    mobileDrawer: {
        width: 256
    },
    desktopDrawer: {
        width: 256,
        top: 64,
        height: 'calc(100% - 64px)'
    },
    avatar: {
        cursor: 'pointer',
        width: 64,
        height: 64
    }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
    const classes = useStyles();
    const location = useLocation();

    // console.log('user', user)
    // console.log('point', point)

    const isLogin = localStorage.getItem('jwt');
    const currentUser = localStorage.getItem('currentUser')

    const convert = JSON.parse(currentUser)
    // console.log('object', convert.user.point.name)
    let namePoint
    let isAdmin
    if (isLogin) {
        namePoint = convert.user.point.name
        isAdmin = convert.user.role.name.includes('SUPER_ADMIN');
    }



    const [newItems, setNewItems] = useState([
        {
            href: '/app/dashboard',
            icon: BarChartIcon,
            title: 'Dashboard'
        },
        {
            href: '/app/content',
            icon: ListAltIcon,
            title: 'Content'
        },
        {
            href: '/app/layout',
            icon: TvIcon,
            title: 'Layout'
        },
        {
            href: '/app/shedule',
            icon: EventNoteIcon,
            title: 'Shedule'
        },
        {
            href: '/app/boxlayer',
            icon: PhoneAndroidIcon,
            title: 'Box Player'
        },
        {
            href: '/users',
            icon: UsersIcon,
            title: 'Users'
        },
        {
            href: '/login',
            icon: LockIcon,
            title: 'Login'
        },
        {
            href: '/register',
            icon: UserPlusIcon,
            title: 'Register'
        },
        {
            href: '/404',
            icon: AlertCircleIcon,
            title: 'Error'
        }
    ]);

    const content = (
        <Box height="100%" display="flex" flexDirection="column">
            <Box alignItems="center" display="flex" flexDirection="column" p={2}>
                {isAdmin ?

                    <h3>SUPPER_ADMIN</h3>
                    :
                    <h3>{namePoint}</h3>}
                {/* <Avatar
                    className={classes.avatar}
                    component={RouterLink}
                    src={user.avatar}
                    to="/app/account"
                /> */}
                {/* <Typography className={classes.name} color="textPrimary" variant="h5">
                    {user.name}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                    {user.jobTitle}
                </Typography> */}
            </Box>
            <Divider />
            <Box p={2}>
                <List>
                    {newItems.map((item) => (
                        <NavItem
                            href={item.href}
                            key={item.title}
                            title={item.title}
                            icon={item.icon}
                        />
                    ))}
                </List>
            </Box>
            <Box flexGrow={1} />
        </Box>
    );

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);
    // show theme login done
    useEffect(() => {
        if (isLogin) {
            setNewItems([
                {
                    href: '/app/dashboard',
                    icon: BarChartIcon,
                    title: 'Dashboard'
                },
                {
                    href: '/app/content',
                    icon: ListAltIcon,
                    title: 'Content'
                },
                {
                    href: '/app/layout',
                    icon: TvIcon,
                    title: 'Layout'
                },
                {
                    href: '/app/shedule',
                    icon: EventNoteIcon,
                    title: 'Shedule'
                },
                {
                    href: '/app/boxlayer',
                    icon: PhoneAndroidIcon,
                    title: 'Box Player'
                },
                {
                    href: '/app/users',
                    icon: UsersIcon,
                    title: 'Users'
                },
                // {
                //     href: '/register',
                //     icon: UserPlusIcon,
                //     title: 'Register'
                // },
                {
                    href: '/404',
                    icon: AlertCircleIcon,
                    title: 'Error'
                }
            ]);
        }
        if (!isLogin) {
            setNewItems([
                {
                    href: '/login',
                    icon: LockIcon,
                    title: 'Login'
                },
            ])
        }
        if (isAdmin) {
            setNewItems([
                {
                    href: '/app/dashboard',
                    icon: BarChartIcon,
                    title: 'Dashboard'
                },
                {
                    href: '/app/points',
                    icon: RoomIcon,
                    title: 'Points'
                },
                {
                    href: '/app/user',
                    icon: UsersIcon,
                    title: 'Users'
                },
            ]);
        }

    },
        // {
        //     if(isAdmin.) {
        //         setNewItems([
        //             {
        //                 href: '/app/dashboard',
        //                 icon: BarChartIcon,
        //                 title: 'Dashboard'
        //             },
        //             {
        //                 href: '/app/content',
        //                 icon: ListAltIcon,
        //                 title: 'Content'
        //             },

        //         ]);
        //     }
        // },
        [isLogin, isAdmin]);

    return (
        <>
            <Hidden lgUp>
                <Drawer
                    anchor="left"
                    classes={{ paper: classes.mobileDrawer }}
                    onClose={onMobileClose}
                    open={openMobile}
                    variant="temporary">
                    {content}
                </Drawer>
            </Hidden>
            <Hidden mdDown>
                <Drawer
                    anchor="left"
                    classes={{ paper: classes.desktopDrawer }}
                    open
                    variant="persistent">
                    {content}
                </Drawer>
            </Hidden>
        </>
    );
};

NavBar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
};

NavBar.defaultProps = {
    onMobileClose: () => { },
    openMobile: false
};

export default NavBar;
