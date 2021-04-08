import React, {useState, useContext} from 'react';
// import { DraftrrContext } from '../../context/DraftrrContext'
import { Page, Document, Image, StyleSheet, Text, View } from '@react-pdf/renderer';
import Logo  from '../../img/draftrrLogo.png'
// import Title from './PDFComponents/Title'

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        padding: 40,
    }, 
    textArea: {
        paddingTop: 30,
        paddingLeft:15,
        paddingRight:15,

        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        width: 100,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    image: {
        // marginTop: 15,
        marginHorizontal: 20,
        width: 100,
      },
    title: {
        fontSize: 24,
        textAlign: 'center',
        // padding: 0,
      },
      author: {
          fontSize: 10,
          textAlign: 'center',
      },
      textBody: {
          paddingTop: 20,
      },
      pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
      },
  });

  
  export default function Draft({ text, title, name }) {
    


        return (
            <Document>
                <Page size="A4" style={styles.page} wrap>
                    <Image
                        style={styles.image}
                        src={Logo}
                    />
                    <View style={styles.textArea}>
                        <Text style={styles.title}>{title}</Text>
                        {/* <Text style={styles.author}>by {name}</Text> */}
                        <Text style={styles.textBody}>{text}</Text>
                    </View>
                        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                                `${pageNumber} / ${totalPages}`
                            )} fixed />
                    
                </Page>
            </Document>
            
            )
            
  }