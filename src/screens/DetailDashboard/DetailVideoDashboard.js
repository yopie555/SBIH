import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';  
import React, { useState } from 'react';  
import { WebView } from 'react-native-webview';  
import Icon from 'react-native-vector-icons/Ionicons';
import { stateDataVideo } from '../../state/dataVideo';  

const { width } = Dimensions.get('window');

const DetailVideoDashboard = () => {  
    const { dataVideo } = stateDataVideo();  
    const [expandedIndex, setExpandedIndex] = useState(null);

    // Function to split the video link and extract the video ID
    function splitLinkVideo(link) {
        let idVideo = '';

        // Handle youtu.be format (https://youtu.be/VIDEO_ID)
        if (link.includes('youtu.be/')) {
            const splitLink = link.split('youtu.be/');
            idVideo = splitLink[1];
            // Remove any additional parameters
            if (idVideo.includes('?')) {
                idVideo = idVideo.split('?')[0];
            }
        }
        // Handle youtube.com format (https://www.youtube.com/watch?v=VIDEO_ID)
        else if (link.includes('youtube.com/watch')) {
            // Use regex to extract v parameter
            const match = link.match(/[?&]v=([^&#]*)/);
            if (match && match[1]) {
                idVideo = match[1];
            }
        }
        // Handle embedded format (https://www.youtube.com/embed/VIDEO_ID)
        else if (link.includes('youtube.com/embed/')) {
            const splitLink = link.split('youtube.com/embed/');
            idVideo = splitLink[1];
            // Remove any additional parameters
            if (idVideo.includes('?')) {
                idVideo = idVideo.split('?')[0];
            }
        }

        return idVideo;
    }  

    // Test the splitLinkVideo function with sample URLs
    dataVideo.forEach((item, index) => {
        const videoId = splitLinkVideo(item.link);
        console.log(`Video ${index + 1} - Title: ${item.judul}, Link: ${item.link}, Extracted ID: ${videoId}`);
    });
    

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (  
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >  
            <View style={styles.header}>
                <Icon name="play-circle" size={32} color="#0074BD" />
                <Text style={styles.headerTitle}>Galeri Video</Text>
            </View>

            {dataVideo.map((item, index) => {  
                const isExpanded = expandedIndex === index;
                return (  
                    <View key={index} style={styles.videoCard}>  
                        {/* Video Header */}
                        <TouchableOpacity 
                            style={styles.videoHeader}
                            onPress={() => toggleExpand(index)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.iconContainer}>
                                <Icon name="videocam" size={24} color="#0074BD" />
                            </View>
                            <Text style={styles.videoTitle} numberOfLines={2}>  
                                {item.judul}  
                            </Text>
                            <Icon 
                                name={isExpanded ? "chevron-up" : "chevron-down"} 
                                size={24} 
                                color="#666" 
                            />
                        </TouchableOpacity>

                        {/* Video Content */}
                        {isExpanded && (
                            <View style={styles.videoContent}>
                                <View style={styles.videoWrapper}>
                                    <WebView  
                                        style={styles.webview}
                                        source={{ uri: 'https://youtu.be/' + splitLinkVideo(item.link) }}  
                                        javaScriptEnabled={true}
                                        allowsInlineMediaPlayback={true}
                                        mediaPlaybackRequiresUserAction={false}
                                    />  
                                </View>
                                
                                {/* Video Info */}
                                {/* <View style={styles.videoInfo}>
                                    <View style={styles.infoRow}>
                                        <Icon name="eye-outline" size={18} color="#666" />
                                        <Text style={styles.infoText}>Tonton di YouTube</Text>
                                    </View>
                                </View> */}
                            </View>
                        )}

                        {/* Divider */}
                        {!isExpanded && <View style={styles.divider} />}
                    </View>  
                );  
            })}

            {/* Empty State */}
            {dataVideo.length === 0 && (
                <View style={styles.emptyState}>
                    <Icon name="film-outline" size={80} color="#ccc" />
                    <Text style={styles.emptyText}>Belum ada video tersedia</Text>
                </View>
            )}
        </ScrollView>  
    );  
}  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    contentContainer: {
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        gap: 12,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    videoCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    videoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E3F2FD',
        alignItems: 'center',
        justifyContent: 'center',
    },
    videoTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        lineHeight: 22,
    },
    videoContent: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    videoWrapper: {
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#000',
        elevation: 2,
    },
    webview: {
        height: 220,
    },
    videoInfo: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginHorizontal: 16,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        marginTop: 16,
    },
});

export default DetailVideoDashboard;