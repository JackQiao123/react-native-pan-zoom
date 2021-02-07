import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import RestaurantListScreen from './restaurantList';
import TableOrderScreen from './tableOrder';

const GeneralStack = createStackNavigator();
const GeneralNavigator = (props) => (
    <GeneralStack.Navigator initialRouteName={props.route} headerMode="none">
        <GeneralStack.Screen name="RestaurantList" component={RestaurantListScreen} />
        <GeneralStack.Screen name="TableOrder" component={TableOrderScreen} />
    </GeneralStack.Navigator>
);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.navigationRef = React.createRef();
    }

    render () {
        return (
            <NavigationContainer ref={instance => this.navigationRef = instance}>
                <GeneralNavigator />
            </NavigationContainer>
        );
    }
}
  
export default App;