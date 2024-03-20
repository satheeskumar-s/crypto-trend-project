import React, { ReactNode, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab, { TabProps } from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const TabComp = (props: {
  tabs: Array<{ id: number; label: string }>;
  tabContent: Array<{ id: number; content: ReactNode }>;
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log('>>>', { newValue });
    setValue(newValue);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  const CustomTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant='scrollable'
        scrollButtons='auto'
        aria-label='scrollable auto tabs example'
      >
        {props.tabs.map((eachTab) => (
          <Tab key={eachTab.id} label={eachTab.label} />
        ))}
      </Tabs>

      {props.tabContent.map((eachTabContent) => (
        <CustomTabPanel
          key={eachTabContent.id}
          value={value}
          index={eachTabContent.id}
        >
          {eachTabContent.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
};

export default TabComp;
