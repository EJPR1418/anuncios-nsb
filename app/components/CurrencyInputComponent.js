import React, { useState } from 'react';
import { View } from 'react-native';
import { Input } from '@rneui/themed';
import { TextInputMask } from 'react-native-masked-text';
import PropTypes from 'prop-types';

const CurrencyInput = ({ label, value, onChangeText }) => {
  return (
    <View>
      <Input
        label={label}
        render={(props) => (
          <TextInputMask
            {...props}
            type={'money'}
            options={{
              precision: 2,
              separator: '.',
              delimiter: ',',
              unit: '$',
              suffixUnit: '',
            }}
            value={value}
            onChangeText={onChangeText}
          />
        )}
        keyboardType='numeric'
      />
    </View>
  );
};

CurrencyInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

export default CurrencyInput;
