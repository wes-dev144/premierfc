import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import { runAndNavigate } from '../utils/navigation';

// const NavigationBox = ({func, component, ...rest}) => {
//   return (
//     <TouchableOpacity style={styles.container} onPress={() => runAndNavigate({func, ...rest})}>
//       <component/>
//     </TouchableOpacity>
//   );
// };

export default class NavigationBox extends Component {
  constructor (func, props) {
    this.func = func
    super(props)
  }
  render () {
    <TouchableOpacity style={styles.container} onPress={() => runAndNavigate(this.func, {...this.props})}>
      {this.props.children}
    </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: .3,
    width: '100%',
  },
});

// export default NavigationBox;