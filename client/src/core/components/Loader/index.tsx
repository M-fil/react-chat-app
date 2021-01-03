import React from 'react';
import { Spin } from 'antd';

import LoaderContainer from './styled';

const Loader: React.FC = () => {
  return (
    <LoaderContainer>
      <Spin />
    </LoaderContainer>
  )
};

export default Loader;
