import axios from 'axios'
import { baseURL } from './General'
import { useState } from 'react'

const resJPM = `${baseURL}/sosial/ppm`
const resIPM = `${baseURL}/sosial/ipm`
const resALS = `${baseURL}/sosial/rls`
const resIG = `${baseURL}/sosial/ig`
const resIDB = `${baseURL}/sosial/idb`
const resPE = `${baseURL}/ekonomi/pe`
const resKW = `${baseURL}/ekonomi/kw`
const resPP = `${baseURL}/kependudukan/pp`
const resPJD = `${baseURL}/infrastruktur/pjdd`
const resPAB = `${baseURL}/infrastruktur/prt`

export const getData = () => {
    const [data, setData] = useState([])
    axios.get(resJPM)
        .then(res => {
            setData(res.data)
        })
    axios.get(resIPM)
        .then(res => {
            setData(res.data)
        })
    axios.get(resALS)
        .then(res => {
            setData(res.data)
        })
    axios.get(resIG)
        .then(res => {
            setData(res.data)
        })
    axios.get(resIDB)
        .then(res => {
            setData(res.data)
        })
    axios.get(resPE)
        .then(res => {
            setData(res.data)
        })
    axios.get(resKW)
        .then(res => {
            setData(res.data)
        })
    axios.get(resPP)
        .then(res => {
            setData(res.data)
        })
    axios.get(resPJD)
        .then(res => {
            setData(res.data)
        })
    axios.get(resPAB)
        .then(res => {
            setData(res.data)
        })
    return data
    
}
