import React, { Component } from 'react'
import { Text, View, Button, Modal, StyleSheet, ScrollView, TouchableHighlight, Image } from 'react-native'
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import Music from './music'
import Video from 'react-native-video'
import { createStackNavigator } from '@react-navigation/stack';
import Entypo from "react-native-vector-icons/Entypo"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Slider from '@react-native-community/slider'

const Stack = createStackNavigator()
var p = 0
export default class yq extends Component {
    constructor() {
        super()
        this.player = null
        this.state = {
            playlist: true,
            name: 'controller-play',
            albums: [],
            music: '',
            singer: '蒲提-爱我 (男生版)',
            img: 'http://118.25.250.106/qypicture/aiwopic.jpg',
            size: 50,
            duration: 1,
            currentTime: 0
        }
    }

    last = () => {
        p--
        let videoPath = this.state.albums[p].audioPath
        let singerPath = this.state.albums[p].name
        let imgPath = this.state.albums[p].imagePath
        this.setState({
            music: videoPath,
            singer: singerPath,
            img: imgPath,
            name: 'control-play',
            playlist: true,
        })
    }

    stop = () => {
        if (this.state.playlist === true) {
            let videoPath = this.props.route.params.audioPath
            let singerPath = this.props.route.params.name
            let imgPath = this.props.route.params.imagePath
            this.setState({ playlist: false, name: 'controller-paus', music: videoPath, singer: singerPath, img: imgPath })
        } else {
            this.setState({ playlist: true, name: 'controller-play' })
        }
    }

    next = () => {
        // alert(2)
        p++
        let videoPath = this.props.route.params.audioPath
        let singerPath = this.props.route.params.name
        let imgPath = this.props.route.params.imagePath
        this.setState({
            music: videoPath,
            singer: singerPath,
            img: imgPath,
            name: 'control-play',
            playlist: true
        })
    }
    _loadHandler = ({ duration }) => {
        this.setState({
            duration
        })
    }
    _progressHandler = ({ currentTime }) => {
        this.setState({
            currentTime
        })
    }
    _seekHandler = (value) => {
        this.player.seek(value)
    }
    _endHandler=()=>{
        this.next()
    }
    render() {
        return (
            <View>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <Image style={{ width: '80%', height: 300, borderRadius: 18 }} source={{ uri: this.props.route.params.imagePath }} />
                </View>
                <View style={{ height: 180, margin: 10, paddingLeft: 26, marginTop: 20, justifyContent: 'center', alignItems: 'center', marginRight: 50 }}>
                    <FontAwesome style={{ marginBottom: 10, marginRight: 15 }} name="optin-monster" size={23} color="black" />
                    <Text style={{ fontSize: 20 }}>{this.props.route.params.name}</Text>
                </View>
                {/* optin-monster */}
                <View>
                    <Slider
                        style={{ width: '90%', marginLeft: 20 }}
                        minimumValue={0}
                        maximumValue={this.state.duration}
                        value={this.state.currentTime}
                        onSlidingComplete={this._seekHandler}
                    ></Slider>
                </View>
                <View style={{ alignItems: 'center' ,marginLeft:15}}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>

                        <Video
                            ref={ref => this.player = ref}
                            source={{ uri: this.state.music }}
                            paused={this.state.playlist}
                            onLoad={this._loadHandler}
                            onProgress={this._progressHandler}
                            onEnd={this._endHandler}
                        ></Video>

                        <TouchableHighlight underlayColor="none" activeOpacity={0.1}
                            onPress={this.last}>
                            {/* name="control-play" */}
                            <Entypo style={{ marginBottom: 10, marginRight: 15 }}
                                name='controller-jump-to-start'
                                size={this.state.size} color="black" />
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="none" activeOpacity={0.1}
                            onPress={this.stop}>
                            {/* name="control-play" */}
                            <Entypo style={{ marginBottom: 10, marginRight: 15 }}
                                name={this.state.name}
                                size={this.state.size} color="black" />
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="none" activeOpacity={0.1}
                            onPress={this.next}>
                            {/* name="control-play" */}
                            <Entypo style={{ marginBottom: 10, marginRight: 15 }}
                                name='controller-next'
                                size={this.state.size} color="black" />
                        </TouchableHighlight>

                    </View>
                </View>
            </View>

        )
    }
}