import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
import { stateDataVideo } from '../../state/dataVideo'

const DetailVideoDashboard = () => {
    const { dataVideo } = stateDataVideo()

    function splitLinkVideo(link) {
        const splitLink = link.split('/')
        const lastIndex = splitLink.length - 1
        let idVideo = splitLink[lastIndex]
        const check = idVideo.includes('=')
        if (check) {
            const splitIdVideo = idVideo.split('=')
            idVideo = splitIdVideo[1]
        }
        return idVideo
    }

    return (
        // <View style={{flex:1}}>
        <ScrollView  contentContainerStyle={{ flexGrow: 1 }}>
            
        {
            dataVideo.map((item, index) => {
                return (
                    <View key={index} style={{ height: '50%', width: 'auto' }}>
                        <WebView
                            source={{ uri: 'https://www.youtube.com/embed/' + splitLinkVideo(item.link) }}
                        />
                    <View style={{height: 10}}></View>
                    </View>
                )
            })
        }
        </ScrollView>
        // </View>
    )
}

export default DetailVideoDashboard