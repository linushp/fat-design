import React from 'react';
import {FilterImpl} from './filter';
import ConfigProvider from "../config-provider";

const Filter = ConfigProvider.configFn<typeof FilterImpl>(FilterImpl, {});

export default Filter;
