import { View, Text, ScrollView } from 'react-native';  
import React from 'react';  
import { WebView } from 'react-native-webview';  
import { stateDataVideo } from '../../state/dataVideo';  

const DetailVideoDashboard = () => {  
    const { dataVideo } = stateDataVideo();  

    // Function to split the video link and extract the video ID  
    function splitLinkVideo(link) {  
        const splitLink = link.split('/');  
        const lastIndex = splitLink.length - 1;  
        let idVideo = splitLink[lastIndex];  
        const check = idVideo.includes('=');  
        if (check) {  
            const splitIdVideo = idVideo.split('=');  
            idVideo = splitIdVideo[1];  
        } else if(idVideo.includes('watch?v=')) {  
            const watchSplit = idVideo.split('watch?v=');  
            idVideo = watchSplit[1];  
        }  
        return idVideo;  
    }  

    return (  
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>  
            {  
                dataVideo.map((item, index) => {  
                    return (  
                        <View key={index} style={{ marginVertical: 5 }}>  
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5, paddingLeft: 10 }}>  
                                {item.judul}  
                            </Text>  
                            <WebView  
                                style={{ height: 300 }} // Specify a height for the WebView  
                                source={{ uri: 'https://www.youtube.com/embed/' + splitLinkVideo(item.link) }}  
                                javaScriptEnabled={true} // Optional: allows JavaScript in your WebView  
                                allowsInlineMediaPlayback={true} // Enable inline playback on mobile  
                            />  
                        </View>  
                    );  
                })  
            }  
        </ScrollView>  
    );  
}  

export default DetailVideoDashboard;