import React from 'react'
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'

const screen = Dimensions.get("screen");
const TOP_OFFSET = 40;

const ModalContainer = (props) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: props.imageUrl }} style={styles.image} />
            <Text style={styles.titleText}>{props.name}</Text>
            <View>
                <View style={styles.priceContainer}>
                    <Text>{`$${parseFloat(props.price).toFixed(2)}`}</Text>
                </View>
            </View>
            <Text style={styles.descriptionText}>{props.description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: TOP_OFFSET,
        height: screen.height - TOP_OFFSET,
        width: '100%',
        backgroundColor: "#FFF",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 35,
        alignItems: "center",
        textAlign: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    image: {
        width: screen.width,
        height: screen.width * 0.56,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 22,
    },
    titleText: {
        marginTop: 18,
        fontFamily: 'Inter_700Bold',
        fontSize: 24,
        textAlign: "center"
    },
    priceContainer: {
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 25,
        paddingVertical: 7,
        marginVertical: 21
    },
    descriptionText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        lineHeight: 22,
        textAlign: 'center'
    }
})

export default ModalContainer