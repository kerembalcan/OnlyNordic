/* @flow */

import React from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import type {CompleteProps} from "./containers";
import {StackContainer} from "../PureComponents/stackContainer";
import {Spinner} from "../PureComponents/spinner";
import {CustomNavHeader} from "../PureComponents/customNavHeader";
import {getPhotoUrl} from "../utils/imageUtil";
import {DEVICE_WIDTH} from "../utils/react-native-util";
import {ONLY_NORDIC_WHITE} from "../colors";

/** const l = <FlatList
  data={activeJobsheets}
  renderItem={(activeJobsheetItemContainer, index) => (
    <ActiveJobsheet
      jobsheet={activeJobsheetItemContainer.item}
      getTaskTypeName={getTaskTypeName}
      getParentTaskTypeName={getParentTaskTypeName}
      getClientName={getClientName}
      getClientAddress={getClientAddress}
      getClientPhone={getClientPhone}
      selectJobsheet={selectJobsheet}
      showHideNotePanelModal={showHideNotePanelModal}
      isMoveMenuModalVisible={isMoveMenuModalVisible}
      showHideMoveMenuModal={showHideMoveMenuModal}
      navigation={navigation}
    />)}
  keyExtractor={(activeJobsheet, index) => activeJobsheet.id}
  onEndReached={isThereMoreActiveJobsheet ? () => handleLoadMore(activeJobsheetOffset) : undefined}
  onEndReachedThreshold={0.5} // Threshold in pixels for calling onEndReached
  initialNumToRender={5}
  ListFooterComponent={isActiveJobsheetsRequesting ? <Spinner/> : undefined}
  refreshControl={
    <RefreshControl
      colors={["#9Bd35A", "#689F38"]}
      refreshing={isRefreshing}
      onRefresh={() => handleRefresh()}
    />
  }
/>; **/

class FlatImage extends React.PureComponent {

  render() {
    const {photo} = this.props;
    const {imageContainer, image, titleContainer, title} = styles;
    return <View style={imageContainer}>
      <Image style={image} source={{uri: getPhotoUrl(photo)}}/>
      <View style={titleContainer}>
        <Text style={title}>{photo.title}</Text>
      </View>
    </View>
  }
}

export default class ImageFeedComponent extends React.Component {
  props: CompleteProps;
  componentDidMount() {

  }
  static navigationOptions = ({navigation}) => ({
    header: <CustomNavHeader
      onRequestClose={() => navigation.goBack(null)}
      title={"Only Nordic"}
      navSaveButtonVisible={false}
      leftButtonType={"cross"}
    />
  });

  render() {
    const {container} = styles;
    const {photos, page} = this.props;

    return (
      <StackContainer style={container}>
        <FlatList
          data={photos}
          keyExtractor={(listItem, index) => index}
          renderItem={(listItem, index) => <FlatImage photo={listItem.item}/>}
        />
      </StackContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.294)",
  },

  imageContainer: {
    flex: 1,
  },

  image: {
    width: DEVICE_WIDTH,
    height: DEVICE_WIDTH * 9 / 16,
  },

  titleContainer: {
    width: DEVICE_WIDTH,
    height: 40,
    backgroundColor: "rgba(0,0,0,0.294)",
    position: "absolute",
    bottom: 0,
    flex: 1,
    justifyContent: 'center'
  },

  title: {
    color: ONLY_NORDIC_WHITE,
  }
});
