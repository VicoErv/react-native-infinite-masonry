import { NativeModules } from 'react-native';
import React, { Component } from 'react';
import {
  View, StyleSheet, ScrollView, Dimensions
} from 'react-native';


export default class Masonry extends Component {
    constructor(props){
        super(props);
        this.pageSize = this.props.pageSize | 50;

        this.vpWidth = Dimensions.get('window').width;
        this.vpHeight = Dimensions.get('window').height;

        this.logScrollViewSize = this.logScrollViewSize.bind(this);
        this.scrollViewHeight = 0;

        this.state = {
            data: []
        };

        this.styles = StyleSheet.create({
            container: {
                width: this.vpWidth,
                flexDirection: 'row'
            }
        });

    }

    async generateData(){

        const data = await this.props.itemsProvider(this.pageSize);

        this.setState({
            data: [...this.state.data, ...data]
        });

    }

    logScrollViewSize(width, height){
        this.scrollViewHeight = height;
    }

    async componentDidMount(){

        await this.generateData();

    }

    render(){
            const data = this.state.data;

            return (
                <ScrollView
                    onContentSizeChange={this.logScrollViewSize}
                    >
                     <View
                        style={this.styles.container}
                        >
                            <View>
                                {
                                    data.length ? data.slice(0, data.length / 2).map((di, i) => {
                                        return this.props.renderItem(di, i)
                                    }) :
                                        (<></>)
                                }
                            </View>
                            <View>
                                {
                                    data.length ? data.slice(data.length/2, data.length).map((di, i) => {
                                        return this.props.renderItem(di, i + data.length/2)
                                    }) : (<></>)
                                }
                            </View>
                    </View>
            </ScrollView>
        );
    }
}
