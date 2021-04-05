import React, {useState} from 'react';
import { Page, Document, Image, StyleSheet, Text, View } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });
  
  export default function Draft({ text }) {
    


        return (
            <Document>
                
                
                <Page size="A4" >
                    <View>
                        <Text>Hi</Text>
                        <Text>{text}</Text>
                    </View>
                    
                </Page>
            </Document>
            
            )
            
  }