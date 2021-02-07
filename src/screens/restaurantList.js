import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    Image,
    TouchableOpacity
} from 'react-native';

import Api from '../apis/index';


class ReataurantList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            selectedIndex: -1
        };

    }

    async componentDidMount() {
        try {
            const res = await Api.getRestaurants();
            if (res && res.status && res.status === 'success') {
                this.setState({
                    items: res.data,
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    render () {
        const { items, selectedIndex } = this.state;

        return (
            <SafeAreaView style={{width: '100%', height: '100%', flex: 1}}>
                <View style={{padding: 10, elevation: 10, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 18}}>Restaurant List</Text>
                </View>
                <ScrollView style={{paddingHorizontal: 20, paddingVertical: 10, flex: 1}} keyboardShouldPersistTaps="always">
                    <View>
                        {
                            items && items.map((item, index) => (
                                <View key={index}>
                                    <TouchableOpacity
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            paddingRight: 40,
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                            borderBottomColor: '#ddd',
                                            borderBottomWidth: 2
                                        }}
                                        onPress={() => {this.setState({selectedIndex: index === selectedIndex ? -1 : index});}}
                                    >
                                        <Image source={{uri: item.logo}} style={{width: 30, height: 30, marginRight: 10}} />
                                        <Text>
                                            {item.name}
                                        </Text>
                                        <View style={{position: 'absolute', right: 20, top: 15}}>
                                            <Text style={{fontSize: 18}}>
                                                {
                                                    '>'
                                                }
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    {
                                        selectedIndex === index && (
                                            <View style={{paddingVertical: 10, backgroundColor: '#ddd', width: '100%'}}>
                                                <View style={{paddingHorizontal: 20, width: '100%'}}>
                                                    <Text>
                                                        <Text style={{fontWeight: 'bold'}}>Working Time: </Text>
                                                        {item.working_time}
                                                    </Text>
                                                </View>
                                                <View style={{paddingHorizontal: 20, width: '100%'}}>
                                                    <Text>
                                                        <Text style={{fontWeight: 'bold'}}>Email: </Text>
                                                        {item.email}
                                                    </Text>
                                                </View>
                                                <View style={{paddingHorizontal: 20, width: '100%'}}>
                                                   <Text>
                                                        <Text style={{fontWeight: 'bold'}}>Contact: </Text>
                                                        {item.contact}
                                                   </Text>
                                                </View>
                                                <View style={{paddingHorizontal: 20, width: '100%'}}>
                                                    <Text>
                                                        <Text style={{fontWeight: 'bold'}}>Max Capacity: </Text>
                                                        {item.max_capacity}
                                                    </Text>
                                                </View>

                                                <View style={{paddingHorizontal: 20, width: '100%'}}>
                                                    <Text>
                                                        <Text style={{fontWeight: 'bold'}}>Halal: </Text>
                                                        {item.halal ? 'Yes' : 'No'}
                                                    </Text>
                                                </View>
                                                <View style={{paddingVertical: 10, paddingHorizontal: 20, width: '100%', alignItems: 'center'}}>
                                                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('TableOrder', {slug: item.slug});}}
                                                        style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'green', borderRadius: 10}}>
                                                        <Text style={{color: 'white', fontWeight: 'bold'}}>Table Order</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    }
                                </View>
                            ))
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default ReataurantList;