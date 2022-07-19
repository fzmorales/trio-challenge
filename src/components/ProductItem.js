import React from 'react'
import { StyleSheet, Pressable, Image, Text } from 'react-native'

const ProductItem = (props) => {
    return (
        <Pressable
            onPress={(item) => props.onPress(item)}
            style={[styles.container, { marginLeft: props.index === 0 ? 19 : 0 }]}>
            <Image source={{ uri: props.item.url }} style={styles.image} />
            <Text style={styles.title}>{props.item.name}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: 'center',
        width: 160,
        height: 160,
        borderWidth: 1,
        borderColor: '#D8D8D8',
        marginRight: 16,
        justifyContent: 'center',
        borderRadius: 5,
        alignContent: 'center',
    },
    image: {
        width: 100,
        height: 56,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 22,
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        paddingHorizontal: 4
    }

})

export default ProductItem