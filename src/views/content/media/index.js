// import MUIDataTable from "mui-datatables";
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Card } from '@material-ui/core';
import MediaComponent from './content.js'
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

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

export default function SimpleTabs() {
    const typeTabMenu = [
        {
            key: "Media",
            value: "VIDEO",
        },
        {
            key: "Image",
            value: "IMAGE",
        }, {
            key: "Slide",
            value: "SLIDE",
        }, {
            key: "Text",
            value: "TEXT",
        }, {
            key: "Web",
            value: "WEB",
        },
    ]
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    return (
        <Card>
            <AppBar position="static">
                <Tabs textColor="primary"
                    className={classes.bgDefault}
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example">

                    {typeTabMenu.map((item, index) => (
                        <Tab label={item.key} {...a11yProps({ index })} />
                    ))}
                </Tabs>
            </AppBar>
            {typeTabMenu.map((item, index) => (
                <TabPanel value={value} index={index}>
                    <MediaComponent typeTab={item.value} />
                </TabPanel>
            ))}
        </Card>
    )
}
