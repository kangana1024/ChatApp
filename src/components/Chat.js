import React, { Component, PropTypes } from 'react';
import { View, Text, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import Backend from './Backend';
import LoadingComponent from './LoadingComponent';

class Chat extends Component {
    state = {
        messages: [],
        isLoading:false
    }
    componentWillMount() {
        this.setState({isLoading:true})
    }
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#f0f0f0',
                    }
                }}
            />
        );
    }
    render() {
        return (
            <View
            style={{
                marginTop:60,
                flex:1
            }}>
            <GiftedChat
                messages={this.state.messages}
                onSend={(messages) => {
                    Backend.sendMessage(messages);
                }}
                user={{
                    _id: Backend.getUid(),
                    name: this.props.name //, avatar: 'https://facebook.github.io/react/img/logo_og.png',
                }}
                renderBubble={this.renderBubble}
            />
            <LoadingComponent isLoading={this.state.isLoading}/>
            </View>
        );
    }
    componentDidMount() {
        Backend.loadMessages((messages) => {
            this.setState((previousState) => {
                return {
                    isLoading:false,
                    messages: GiftedChat.append(previousState.messages, messages)
                }
            })
        });
    }
    componentWillUnmount() {
        Backend.closeChat();
    }
}
Chat.defaultProps = {
    name: 'John'
}

Chat.PropTypes = {
    name: PropTypes.string
}
export default Chat;
