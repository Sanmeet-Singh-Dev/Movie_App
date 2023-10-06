import React, { useState } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropDown = ({ data, labelField, valueField, placeholder, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <View>
      <Dropdown
        data={data}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
        value={selectedValue}
        onChange={(item) => {
          setSelectedValue(item[valueField]);
          onSelect(item);
        }}
      />
    </View>
  );
};

export default DropDown;
