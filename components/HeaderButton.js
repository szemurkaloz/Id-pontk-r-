import React from 'react';
import { TouchableOpacity } from 'react-native'
import { HStack, IconButton, Icon, Text } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
//import { IconEntypo } from '@expo/vector-icons/Entypo';

const CustomHeaderButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} >
            <IconEntypo name="menu" size={28} />
        </TouchableOpacity>

    )
}

export const LeftHeaderButton = ({ onPress }) => {
    return (
        <HStack space={4} alignItems='center'>
            <IconButton icon={<Icon size="sm" as={<MaterialIcons name='chevron-left' />}
                color="black"
                onPress={() => { onPress() }}
            />}
            />
        </HStack>
    )
}

export default {
    CustomHeaderButton,
}
