import React from 'react';
import { StyleSheet, Text, View, Dimensions, PixelRatio } from 'react-native';

import Colors from '../constants/themes'
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const MainButton = (title, handelSubmit) => {
    return(
        <View>

        <TouchableNativeFeedback onPress={handelSubmit}>
            <View style={styles.button}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableNativeFeedback>        
        </View>

    )
}

const styles = StyleSheet.create({
    button: {
        //width: 150,
        //width: Dimensions.get('window').width / 2.2,
        //backgroundColor: Colors.primary,
        borderWidth: 0,
        borderRadius: 10,
        elevation: 5,
        padding: 10,
        alignContent: 'center',
    },
    text: {
        //fontSize: PixelRatio.get() > 2 ? 20 : 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        textTransform: 'uppercase',
    }
})

export default MainButton;