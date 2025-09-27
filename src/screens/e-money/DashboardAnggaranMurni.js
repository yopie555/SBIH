import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, FlatList, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AnggaranMurni from './screens/AnggaranMurni';
import APBPPerubahan from './screens/APBPPerubahan';
import GrafikAnggaranMurni from './screens/GrafikAnggaranMurni';
import GrafikFisikMurni from './screens/GrafikFisikMurni';
import GrafikAPBPPPerubahan from './screens/GrafikAPBPPPerubahan';
import GrafikFisikAPBPPPerubahan from './screens/GrafikFisikAPBPPPerubahan';
import { useMutation } from 'react-query';
import { stateDataAnggaran } from '../../state/dataAnggaran';
import { stateDataTahun } from '../../state/dataTahun';

const Tab = createMaterialTopTabNavigator();

const DashboardAnggaranMurni = ({ navigation }) => {
    const [tahun, setTahun] = useState(new Date().getFullYear());
    const [modalVisible, setModalVisible] = useState(false);
    const {setDataAnggaran} = stateDataAnggaran();
    const {setDataTahuns} = stateDataTahun();
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;

    // Accordion for year selection
    const years = Array.from({ length: new Date().getFullYear() - 2021 + 1 }, (_, i) => 2021 + i);

    const toggleAccordion = () => {
        const toValue = modalVisible ? 0 : 1;
        
        // Rotate animation for icon
        Animated.timing(rotateAnim, {
            toValue,
            duration: 300,
            useNativeDriver: true,
        }).start();

        // Slide animation for accordion
        Animated.timing(slideAnim, {
            toValue: modalVisible ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        setModalVisible(!modalVisible);
    };

    const selectYear = (year) => {
        setTahun(year);
        setModalVisible(false);
        setDataTahuns(year);
    };

    // Mutation for data fetching
    const { mutate: fetchData, data, error, isLoading } = useMutation(
        async () => {
            const response = await axios.post('https://simonev21-api.bintankab.go.id/v1/dashboard/front', {
                'ta': tahun,
                'bulan_realisasi': 12,
            });
            return response.data;
        },
        {
            onError: (error) => {
                console.error("Error fetching data:", error);
            },
            onSuccess: (data) => {
                setDataAnggaran(data);
            },
        }
    );

    // Refetch data whenever the selected year changes
    useEffect(() => {
        fetchData();
    }, [tahun]);

    const YearSelector = () => {
        const rotation = rotateAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
        });

        const translateY = slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [200, 0],
        });

        return (
            <View style={styles.yearSelectorContainer}>
                {modalVisible && (
                    <Animated.View 
                        style={[
                            styles.accordion,
                            {
                                transform: [{ translateY }],
                            }
                        ]}
                    >
                        <FlatList
                            data={years}
                            keyExtractor={(item) => item.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    onPress={() => selectYear(item)} 
                                    style={[
                                        styles.yearItem,
                                        item === tahun && styles.selectedYearItem
                                    ]}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[
                                        styles.yearItemText,
                                        item === tahun && styles.selectedYearText
                                    ]}>
                                        {item}
                                    </Text>
                                    {item === tahun && (
                                        <Icon name="checkmark-circle" size={20} color="#0074BD" />
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </Animated.View>
                )}
                <TouchableOpacity 
                    onPress={toggleAccordion} 
                    style={styles.yearButton}
                    activeOpacity={0.8}
                >
                    <View style={styles.yearButtonContent}>
                        <Icon name="calendar-outline" size={24} color="#0074BD" />
                        <Text style={styles.yearText}>Tahun {tahun}</Text>
                        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                            <Icon name="chevron-up" size={24} color="#0074BD" />
                        </Animated.View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0074BD" />
                </View>
            )}
            {error && <Text style={{ color: 'red', padding: 10 }}>Error: {error.message}</Text>}
            
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#0074BD',
                    tabBarInactiveTintColor: '#979797',
                    tabBarLabelStyle: {
                        fontSize: 14,
                        fontWeight: '700',
                    },
                    tabBarScrollEnabled: true,
                }}
            >
                <Tab.Screen
                    name="Anggaran Murni"
                    component={AnggaranMurni}
                />
                <Tab.Screen name="Grafik Anggaran Murni" component={GrafikAnggaranMurni} />
                <Tab.Screen name="Grafik Fisik Murni" component={GrafikFisikMurni} />
                <Tab.Screen name="APBP Perubahan" component={APBPPerubahan} />
                <Tab.Screen name="Grafik APBP Perubahan" component={GrafikAPBPPPerubahan} />
                <Tab.Screen name="Grafik Fisik APBP Perubahan" component={GrafikFisikAPBPPPerubahan} />
            </Tab.Navigator>

            <YearSelector />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
        zIndex: 999,
    },
    yearSelectorContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
    yearButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    yearButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    yearText: {
        color: '#0074BD',
        fontWeight: 'bold',
        fontSize: 18,
    },
    accordion: {
        backgroundColor: '#ffffff',
        marginBottom: 0,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingVertical: 8,
        maxHeight: 250,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },
    yearItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginHorizontal: 16,
        marginVertical: 4,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        gap: 8,
    },
    selectedYearItem: {
        backgroundColor: '#E3F2FD',
        borderWidth: 1,
        borderColor: '#0074BD',
    },
    yearItemText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    selectedYearText: {
        color: '#0074BD',
        fontWeight: 'bold',
    },
});

export default DashboardAnggaranMurni;