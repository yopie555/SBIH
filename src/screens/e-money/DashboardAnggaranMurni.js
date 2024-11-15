import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
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
    // const [dataAnggaran, setDataAnggaran] = useState(null);
    const {setDataAnggaran} = stateDataAnggaran();
    const {setDataTahuns} = stateDataTahun();

    // Accordion for year selection
    const years = Array.from({ length: new Date().getFullYear() - 2021 + 1 }, (_, i) => 2021 + i);

    const toggleAccordion = () => {
        setModalVisible(!modalVisible);
    };

    const selectYear = (year) => {
        setTahun(year);
        setModalVisible(false);
        // navigation.navigate('Grafik Anggaran Murni', { tahun: year }); 
        setDataTahuns(year);
    };

    // Mutation for data fetching
    const { mutate: fetchData, data, error, isLoading } = useMutation(
        async () => {
            const response = await axios.post('https://simonev21-api.bintankab.go.id/v1/dashboard/front', {
                'ta': tahun,  // Use the selected year
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
    }, [tahun]); // Fetch data only when 'tahun' changes

    const YourCustomHeaderBar = () => (
        <View>
            <TouchableOpacity 
                onPress={toggleAccordion} 
                style={styles.yearButton}
            >
                <Text style={styles.yearText}>Tahun {tahun}</Text>
            </TouchableOpacity>
            {modalVisible && (
                <View style={styles.accordion}>
                    <FlatList
                        data={years}
                        keyExtractor={(item) => item.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => selectYear(item)} style={styles.yearItem}>
                                <Text style={styles.yearItemText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );

    return (
        <>
            <YourCustomHeaderBar />
            
            {isLoading && <ActivityIndicator size="large" color="#0074BD" />}
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
        </>
    );
};

const styles = StyleSheet.create({
    yearButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: '#d5d5d5',
    },
    yearText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    },
    accordion: {
        backgroundColor: '#e0e0e0',
        marginTop: 5,
        borderRadius: 5,
        paddingVertical: 5,
    },
    yearItem: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    yearItemText: {
        fontSize: 16,
        color: 'black',
    },
});

export default DashboardAnggaranMurni;
