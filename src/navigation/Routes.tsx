import * as React from 'react';
import {
    NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StackNavigator from './StackNavigator';




export default function Routes() {
    return (
        <NavigationContainer>
            <>{StackNavigator()}</>
        </NavigationContainer>
    );
}
