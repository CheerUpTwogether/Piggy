import ToggleButton from 'components/common/ToggleButton';
import React, {useState} from 'react';
import {View} from 'react-native';

const Login = () => {
  const [isOn, setIsOn] = useState(true);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <View>
      <ToggleButton initialState={isOn} onToggle={handleToggle} />
    </View>
  );
};

export default Login;
