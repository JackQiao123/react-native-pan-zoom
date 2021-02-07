import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    Dimensions,
    Alert
  } from 'react-native';
import Modal from 'react-native-modal';
import Viewer2D from '../components/viewer2d/viewer2d';

import Api from '../apis/index';

class TableOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null,
            diagram: null,
            orderTables: null,
            orderedTableNumbers: '',
            isOpenOrderedModal: false
        };

        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    async componentDidMount() {
        const { slug } = this.props.route.params;
        try {
            const res = await Api.getRestaurant(slug);
            if (res && res.status && res.status === 'success') {
                this.setState({
                    item: res.data,
                    diagram: res.data.diagram ? JSON.parse(`${res.data.diagram}`) : null
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleSelectItem(tables) {
        let orderedTables = [];
        let strings = [];
        Object.entries(tables).map(([tableID, table]) => {
            if (table.selected) {
                orderedTables.push(table);
                if (table.number) {
                    strings.push(table.number);
                } else {
                    strings.push(table.name);
                }
            }
        });

        this.setState({
            orderedTableNumbers: strings.map(string =>string).join(', '),
            orderTables: orderedTables
        });
    }

    handleOrder() {
        const { orderedTableNumbers } = this.state;
        if (orderedTableNumbers) {
            this.setState({
                isOpenOrderedModal: true
            });
        } else {
            Alert.alert('Please select any tables!');
        }
    }

    async handleOrderTables() {
        const { orderTables } = this.state;
        console.log(orderTables);
        this.setState({
            isOpenOrderedModal: false
        });
    }

    handleCloseModal() {
        this.setState({
            isOpenOrderedModal: false
        });
    }

    render() {
        const { item, diagram, orderedTableNumbers, isOpenOrderedModal } = this.state;

        return (
            <View style={{width: '100%', height: '100%'}}>
                <View style={{padding: 10, elevation: 10, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <TouchableOpacity style={{paddingRight: 20}} onPress={() => {this.props.navigation.navigate('RestaurantList');}}>
                        <Text>{'<'} Back List</Text>
                    </TouchableOpacity>
                </View>
                {
                    item && <View style={{padding: 10, elevation: 10, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Image source={{uri: item.logo}} style={{width: 30, height: 30, marginRight: 10}} />
                        <Text style={{fontSize: 18}}>
                            {item.name}
                        </Text>
                    </View>
                }
                {
                    item && diagram && (
                        <View>
                            <View style={{width: '100%', height: '100%'}}>
                                <Viewer2D width={1500} height={2000} state={diagram} onSelectItem={this.handleSelectItem.bind(this)} />
                            </View>
                        </View>
                    )
                }
                <View style={{position: 'absolute', alignItems: 'center', width: 100, height: 50, bottom: 5, left: (Dimensions.get('screen').width - 100) / 2}}>
                    <TouchableOpacity style={{padding: 10, backgroundColor: 'blue', borderRadius: 10}} onPress={this.handleOrder.bind(this)}>
                        <Text style={{fontSize: 24, color: 'white'}}>Order</Text>
                    </TouchableOpacity>
                </View>
                {
                    isOpenOrderedModal && 
                        <Modal
                                animationType="slide"
                                isVisible={true}
                                onBackdropPress={this.handleCloseModal}
                        >
                            <View
                                style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                            >
                                <View style={{padding: 30, backgroundColor: 'white'}}>
                                    <View style={{position: 'absolute', top:5, right: 15}}>
                                        <TouchableOpacity onPress={this.handleCloseModal}>
                                            <Text style={{fontSize: 18}}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{width: '100%', backgroundColor: 'white', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                        <Image source={{uri: item.logo}} style={{width: 30, height: 30, marginRight: 10}} />
                                        <Text style={{fontSize: 18}}>
                                            {item.name}
                                        </Text>
                                    </View>
                                    <View style={{alignItems: 'center', marginBottom: 15}}>
                                        <Text>
                                            You are ordering <Text style={{color: 'red'}}>{orderedTableNumbers}</Text> in this restaurant. Please order foods and drinks!
                                        </Text>
                                    </View>
                                    <View style={{alignItems: 'center'}}>
                                        <TouchableOpacity style={{paddingHorizontal: 35, paddingVertical: 15, borderRadius: 30, backgroundColor: 'green'}} onPress={this.handleOrderTables.bind(this)}>
                                            <Text>OK</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    }
            </View>
        );
    }
}

export default TableOrder;
