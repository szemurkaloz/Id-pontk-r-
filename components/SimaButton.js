import React from 'react';
import { StyleSheet, Button } from 'react-native';


export const SimaButton = ({caption}) => {
    return(
        <Button 
            style={styles.btn}
            title={caption}
            color="white"
        >     
        </Button>
        
    )
}

const styles = StyleSheet.create({
    btn: {
        alignItems: "center",
        backgroundColor: "red",
        padding: 10,
        width: '70%',
        color: 'white',
        fontSize: 16,
        borderRadius: 10,
        marginTop: 10,
    }
})