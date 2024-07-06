import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React from 'react'

import * as Aminatable from 'react-native-animatable'
import { useState } from 'react'
import { icons } from '../constants'
import { ResizeMode, Video } from 'expo-av'

const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1.1
    }
}

const zoomOut = {
    0: {
        scale: 1.1
    },
    1: {
        scale: 0.9
    }
}


const TrendingItem = ({ activeItem, item }) => {
    const [play, setPlay] = useState(false);
    return (
        <Aminatable.View
            className="mr-5"
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}>
                
            {play ? (
                // console.log(item.video),
                <Video
                    source={{ uri: item.video }}
                    className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
            ) : (
                <TouchableOpacity className="relative justify-center items-center"
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}>
                    <ImageBackground source={{ uri: item.thumbnail }}
                        className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40" />

                    <Image source={icons.play}
                        className="w-12 h-12 absolute"
                        resizeMode="contain" />
                </TouchableOpacity>
            )}
        </Aminatable.View>
    )
}

const Trending = ({ posts }) => {
    const [activeItem, setActiveItem] = useState(posts[0]);

    const viewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
        }
    }

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <TrendingItem activeItem={activeItem} item={item} />
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70
            }}
            contentOffset={{ x: 170 }}
            horizontal
        >

        </FlatList>
    )
}

export default Trending