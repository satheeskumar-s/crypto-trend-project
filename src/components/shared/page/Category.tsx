import React from 'react';
import { CardHeader } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ListIcon from '@mui/icons-material/List';

const Category = (props: { name: string }) => {
  const { name } = props;
  return (
    <CardHeader
      avatar={
        <Avatar alt={'C'}>
          {' '}
          <ListIcon />{' '}
        </Avatar>
      }
      title={name}
    />
  );
};

export default Category;
