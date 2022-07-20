import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Modal,
    Text,
    Animated,
    View,
    Dimensions,
    Image,
    ScrollView,
    Platform,
    ActivityIndicator
} from 'react-native';
import {
    Gesture,
    GestureDetector,
    gestureHandlerRootHOC
} from "react-native-gesture-handler";
import { getMenu } from "../api";
// Components
import ModalContainer from "../components/ModalContainer";
import ProductItem from "../components/ProductItem";


const screen = Dimensions.get("screen");
const DISTANCE_SWIPE_DOWN_TO_CLOSE_MODAL = 20; //This is de distance of vertical gesture for close Modal

const Home = () => {
    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [isLoading, setIsLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [menus, setMenus] = useState([]);
    const [currentItem, setCurrentItem] = useState({});

    const bgColor = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [
            "rgba(255,255,255,0.0)",
            "rgba(57,57,57,0.2)",
            "rgba(0,0,0,0.3)"
        ]
    })

    useEffect(() => {
        // Get Menu from API
        getMenu().then(resp => {
            setIsLoading(false);
            if (resp.success) {
                setMenus(resp.data);
            } else {
                // If there is a problem with API call, it can be handled here
                console.log(resp.error.msg);
            };
        })
    }, [])

    const openModal = (item) => {
        setCurrentItem(item);
        setModalVisible(true);
        Animated.timing(animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false
        }).start();
    }

    const closeModal = () => {
        setModalVisible(false);
        Animated.timing(animation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start();
    }

    // Detect Swipe speed for close Modal
    const gesture = Gesture.Pan().onUpdate((event) => {
        if (event.translationY > DISTANCE_SWIPE_DOWN_TO_CLOSE_MODAL) {
            closeModal();
        }
    })

    // Wrapping ModalContainer to add Gesture Handler HOC for Android Devices
    const ModalContainerWithHOC = gestureHandlerRootHOC(() => (
        <View style={styles.centeredView}>
            <ModalContainer
                name={currentItem.name}
                description={currentItem.description}
                imageUrl={currentItem.url}
                price={currentItem.price}
            />
        </View>
    ))

    return (
        <View style={styles.container}>
            <Animated.View
                pointerEvents={'box-none'}
                style={[styles.overlayContainer, { backgroundColor: bgColor }]}>
            </Animated.View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                {Platform.OS === 'ios' && (
                    <Animated.View style={styles.centeredView}>
                        <GestureDetector gesture={gesture}>
                            <ModalContainer
                                name={currentItem.name}
                                description={currentItem.description}
                                imageUrl={currentItem.url}
                                price={currentItem.price}
                            />
                        </GestureDetector>
                    </Animated.View>
                )}
                {Platform.OS === 'android' && (
                    <GestureDetector gesture={gesture}>
                        <ModalContainerWithHOC />
                    </GestureDetector>

                )}
            </Modal>

            <View style={styles.productListContainer}>
                <View style={styles.headerContainer}>
                    <Image source={require('../../assets/arches-logo_108x108.png')}></Image>
                </View>
                {isLoading && (
                    <ActivityIndicator style={{ marginTop: 40 }} />
                )}
                <ScrollView style={styles.verticalScrollContainer}>
                    {menus.map((menu, index) => (
                        <View key={index}>
                            <Text style={styles.sectionTitle}>{menu.name}</Text>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={styles.horizontalScrollContainer}>
                                {menu.items.map((item, index) => (
                                    <ProductItem
                                        key={index}
                                        item={item}
                                        index={index}
                                        onPress={() => openModal(item)}
                                    />
                                ))}
                            </ScrollView>
                        </View>
                    ))}
                </ScrollView>
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    overlayContainer: {
        zIndex: 10,
        position: 'absolute',
        width: screen.width,
        height: screen.height
    },
    productListContainer: {
        justifyContent: 'flex-start',
        flex: 1
    },
    headerContainer: {
        marginTop: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.15)'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    sectionTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 36,
        marginBottom: 21,
        paddingHorizontal: 19
    },
    verticalScrollContainer: {
        paddingVertical: 26,
        marginBottom: 20
    },
    horizontalScrollContainer: {
        marginBottom: 37
    }
});

export default Home