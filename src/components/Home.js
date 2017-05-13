import React, { Component } from 'react';
import { View, Text, TextInput, Platform ,Button} from 'react-native';
import {Actions} from 'react-native-router-flux';

class Home extends Component {
    state = {
        name:''
    }
    render() {
        return (
            <View style={{
                padding:10
            }}>
                <Text style={{
                    marginTop: Platform.OS === 'ios' ? 75 : 69,
                    fontSize:20,
                    fontWeight:'bold'
                }}>Enter your name :</Text>

                <TextInput
                    style={{ 
                        height: 40,
                        borderWidth:2,
                        borderColor:'#eee',
                        marginTop:10,
                        padding:10
                    }}
                    placeholder="John Cena"
                    onChangeText={(name)=>this.setState({name})}
                />

                <Button title="Next"
                    onPress={
                        ()=>{
                            Actions.chat({name:this.state.name});
                        }
                    }
                />
            </View>
        );
    }
}

export default Home;