/* @flow */

'use strict';
const Animated = require('Animated');
const ColorPropType = require('ColorPropType');
const EdgeInsetsPropType = require('EdgeInsetsPropType');
const Platform = require('Platform');
const PointPropType = require('PointPropType');
const PropTypes = require('prop-types');
const React = require('React');
const ReactNative = require('ReactNative');
const ScrollResponder = require('ScrollResponder');
const ScrollViewStickyHeader = require('ScrollViewStickyHeader');
const StyleSheet = require('StyleSheet');
const StyleSheetPropType = require('StyleSheetPropType');
const View = require('View');
const ViewPropTypes = require('ViewPropTypes');
const ViewStylePropTypes = require('ViewStylePropTypes');

const createReactClass = require('create-react-class');
const dismissKeyboard = require('dismissKeyboard');
const flattenStyle = require('flattenStyle');
const invariant = require('fbjs/lib/invariant');
const processDecelerationRate = require('processDecelerationRate');
const requireNativeComponent = require('requireNativeComponent');
/* $FlowFixMe(>=0.54.0 site=react_native_oss) This comment suppresses an error
 * found when Flow v0.54 was deployed. To see the error delete this comment and
 * run Flow. */
const warning = require('fbjs/lib/warning');

import type {NativeMethodsMixinType} from 'ReactNativeTypes';

const SPHKeyboardAwareScrollViewHelper = createReactClass({
  displayName: 'SPHKeyboardAwareScrollViewHelper',
  propTypes: {
    ...ViewPropTypes,

    automaticallyAdjustContentInsets: PropTypes.bool,

    contentInset: EdgeInsetsPropType,

    contentOffset: PointPropType,

    bounces: PropTypes.bool,

    bouncesZoom: PropTypes.bool,

    alwaysBounceHorizontal: PropTypes.bool,

    alwaysBounceVertical: PropTypes.bool,

    centerContent: PropTypes.bool,

    contentContainerStyle: StyleSheetPropType(ViewStylePropTypes),

    decelerationRate: PropTypes.oneOfType([
      PropTypes.oneOf(['fast', 'normal']),
      PropTypes.number,
    ]),

    horizontal: PropTypes.bool,

    indicatorStyle: PropTypes.oneOf([
      'default', // default
      'black',
      'white',
    ]),

    directionalLockEnabled: PropTypes.bool,

    canCancelContentTouches: PropTypes.bool,

    keyboardDismissMode: PropTypes.oneOf([
      'none', // default
      'on-drag', // Cross-platform
      'interactive', // iOS-only
    ]),

    keyboardShouldPersistTaps: PropTypes.oneOf(['always', 'never', 'handled', false, true]),

    maximumZoomScale: PropTypes.number,

    minimumZoomScale: PropTypes.number,

    onMomentumScrollBegin: PropTypes.func,

    onMomentumScrollEnd: PropTypes.func,

    onScroll: PropTypes.func,

    onContentSizeChange: PropTypes.func,

    pagingEnabled: PropTypes.bool,

    pinchGestureEnabled: PropTypes.bool,

    scrollEnabled: PropTypes.bool,

    scrollEventThrottle: PropTypes.number,

    scrollIndicatorInsets: EdgeInsetsPropType,

    scrollsToTop: PropTypes.bool,

    showsHorizontalScrollIndicator: PropTypes.bool,

    showsVerticalScrollIndicator: PropTypes.bool,

    stickyHeaderIndices: PropTypes.arrayOf(PropTypes.number),

    snapToInterval: PropTypes.number,

    snapToAlignment: PropTypes.oneOf([
      'start', // default
      'center',
      'end',
    ]),

    removeClippedSubviews: PropTypes.bool,

    zoomScale: PropTypes.number,

    contentInsetAdjustmentBehavior: PropTypes.oneOf([
      'automatic',
      'scrollableAxes',
      'never', // default
      'always',
    ]),

    refreshControl: PropTypes.element,


    endFillColor: ColorPropType,


    scrollPerfTag: PropTypes.string,

    overScrollMode: PropTypes.oneOf([
      'auto',
      'always',
      'never',
    ]),
    DEPRECATED_sendUpdatedChildFrames: PropTypes.bool,
  },

  mixins: [ScrollResponder.Mixin],

  _scrollAnimatedValue: (new Animated.Value(0): Animated.Value),
  _scrollAnimatedValueAttachment: (null: ?{detach: () => void}),
  _stickyHeaderRefs: (new Map(): Map<number, ScrollViewStickyHeader>),
  _headerLayoutYs: (new Map(): Map<string, number>),
  getInitialState: function() {
    return this.scrollResponderMixinGetInitialState();
  },

  componentWillMount: function() {
    this._scrollAnimatedValue = new Animated.Value(this.props.contentOffset ? this.props.contentOffset.y : 0);
    this._scrollAnimatedValue.setOffset(this.props.contentInset ? this.props.contentInset.top : 0);
    this._stickyHeaderRefs = new Map();
    this._headerLayoutYs = new Map();
  },

  componentDidMount: function() {
    this._updateAnimatedNodeAttachment();
  },

  componentDidUpdate: function() {
    this._updateAnimatedNodeAttachment();
  },

  componentWillUnmount: function() {
    if (this._scrollAnimatedValueAttachment) {
      this._scrollAnimatedValueAttachment.detach();
    }
  },

  setNativeProps: function(props: Object) {
    this._scrollViewRef && this._scrollViewRef.setNativeProps(props);
  },

  /**
   * Returns a reference to the underlying scroll responder, which supports
   * operations like `scrollTo`. All SPHKeyboardAwareScrollViewHelper-like components should
   * implement this method so that they can be composed while providing access
   * to the underlying scroll responder's methods.
   */
  getScrollResponder: function(): SPHKeyboardAwareScrollViewHelper {
    return this;
  },

  getScrollableNode: function(): any {
    return ReactNative.findNodeHandle(this._scrollViewRef);
  },

  getInnerViewNode: function(): any {
    return ReactNative.findNodeHandle(this._innerViewRef);
  },


  scrollTo: function(
    y?: number | { x?: number, y?: number, animated?: boolean },
    x?: number,
    animated?: boolean
  ) {
    if (typeof y === 'number') {
      console.warn('`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, ' +
        'animated: true})` instead.');
    } else {
      ({x, y, animated} = y || {});
    }
    this.getScrollResponder().scrollResponderScrollTo(
      {x: x || 0, y: y || 0, animated: animated !== false}
    );
  },

  scrollToEnd: function(
    options?: { animated?: boolean },
  ) {
    // Default to true
    const animated = (options && options.animated) !== false;
    this.getScrollResponder().scrollResponderScrollToEnd({
      animated: animated,
    });
  },

  /**
   * Deprecated, use `scrollTo` instead.
   */
  scrollWithoutAnimationTo: function(y: number = 0, x: number = 0) {
    console.warn('`scrollWithoutAnimationTo` is deprecated. Use `scrollTo` instead');
    this.scrollTo({x, y, animated: false});
  },

  /**
   * Displays the scroll indicators momentarily.
   *
   * @platform ios
   */
  flashScrollIndicators: function() {
    this.getScrollResponder().scrollResponderFlashScrollIndicators();
  },

  _getKeyForIndex: function(index, childArray) {
    const child = childArray[index];
    return child && child.key;
  },

  _updateAnimatedNodeAttachment: function() {
    if (this._scrollAnimatedValueAttachment) {
      this._scrollAnimatedValueAttachment.detach();
    }
    if (this.props.stickyHeaderIndices && this.props.stickyHeaderIndices.length > 0) {
      this._scrollAnimatedValueAttachment = Animated.attachNativeEvent(
        this._scrollViewRef,
        'onScroll',
        [{nativeEvent: {contentOffset: {y: this._scrollAnimatedValue}}}]
      );
    }
  },

  _setStickyHeaderRef: function(key, ref) {
    if (ref) {
      this._stickyHeaderRefs.set(key, ref);
    } else {
      this._stickyHeaderRefs.delete(key);
    }
  },

  _onStickyHeaderLayout: function(index, event, key) {
    if (!this.props.stickyHeaderIndices) {
      return;
    }
    const childArray = React.Children.toArray(this.props.children);
    if (key !== this._getKeyForIndex(index, childArray)) {
      // ignore stale layout update
      return;
    }

    const layoutY = event.nativeEvent.layout.y;
    this._headerLayoutYs.set(key, layoutY);

    const indexOfIndex = this.props.stickyHeaderIndices.indexOf(index);
    const previousHeaderIndex = this.props.stickyHeaderIndices[indexOfIndex - 1];
    if (previousHeaderIndex != null) {
      const previousHeader = this._stickyHeaderRefs.get(
        this._getKeyForIndex(previousHeaderIndex, childArray)
      );
      previousHeader && previousHeader.setNextHeaderY(layoutY);
    }
  },

  _handleScroll: function(e: Object) {
    if (__DEV__) {
      if (this.props.onScroll && this.props.scrollEventThrottle == null && Platform.OS === 'ios') {
        console.log( // eslint-disable-line no-console
          'You specified `onScroll` on a <SPHKeyboardAwareScrollViewHelper> but not ' +
          '`scrollEventThrottle`. You will only receive one event. ' +
          'Using `16` you get all the events but be aware that it may ' +
          'cause frame drops, use a bigger number if you don\'t need as ' +
          'much precision.'
        );
      }
    }
    if (Platform.OS === 'android') {
      if (this.props.keyboardDismissMode === 'on-drag') {
        dismissKeyboard();
      }
    }
    this.scrollResponderHandleScroll(e);
  },

  _handleContentOnLayout: function(e: Object) {
    const {width, height} = e.nativeEvent.layout;
    this.props.onContentSizeChange && this.props.onContentSizeChange(width, height);
  },

  _scrollViewRef: (null: ?ScrollView),
  _setScrollViewRef: function(ref: ?SPHKeyboardAwareScrollViewHelper) {
    this._scrollViewRef = ref;
  },

  _innerViewRef: (null: ?NativeMethodsMixinType),
  _setInnerViewRef: function(ref: ?NativeMethodsMixinType) {
    this._innerViewRef = ref;
  },

  render: function() {
    let ScrollViewClass;
    let ScrollContentContainerViewClass;
    if (Platform.OS === 'ios') {
      ScrollViewClass = SHPKeyboardAwareScrollView;
      ScrollContentContainerViewClass = SHPKeyboardAwareScrollContentView;
      warning(
        !this.props.snapToInterval || !this.props.pagingEnabled,
        'snapToInterval is currently ignored when pagingEnabled is true.'
      );
    } else if (Platform.OS === 'android') {
      if (this.props.horizontal) {
        ScrollViewClass = AndroidHorizontalScrollView;
        ScrollContentContainerViewClass = AndroidHorizontalScrollContentView;
      } else {
        ScrollViewClass = AndroidScrollView;
        ScrollContentContainerViewClass = View;
      }
    }

    invariant(
      ScrollViewClass !== undefined,
      'ScrollViewClass must not be undefined'
    );

    invariant(
      ScrollContentContainerViewClass !== undefined,
      'ScrollContentContainerViewClass must not be undefined'
    );

    const contentContainerStyle = [
      this.props.horizontal && styles.contentContainerHorizontal,
      this.props.contentContainerStyle,
    ];
    let style, childLayoutProps;
    if (__DEV__ && this.props.style) {
      style = flattenStyle(this.props.style);
      childLayoutProps = ['alignItems', 'justifyContent']
        .filter((prop) => style && style[prop] !== undefined);
      invariant(
        childLayoutProps.length === 0,
        'SPHKeyboardAwareScrollViewHelper child layout (' + JSON.stringify(childLayoutProps) +
        ') must be applied through the contentContainerStyle prop.'
      );
    }

    let contentSizeChangeProps = {};
    if (this.props.onContentSizeChange) {
      contentSizeChangeProps = {
        onLayout: this._handleContentOnLayout,
      };
    }

    const {stickyHeaderIndices} = this.props;
    const hasStickyHeaders = stickyHeaderIndices && stickyHeaderIndices.length > 0;
    const childArray = hasStickyHeaders && React.Children.toArray(this.props.children);
    const children = hasStickyHeaders ?
      childArray.map((child, index) => {
        const indexOfIndex = child ? stickyHeaderIndices.indexOf(index) : -1;
        if (indexOfIndex > -1) {
          const key = child.key;
          const nextIndex = stickyHeaderIndices[indexOfIndex + 1];
          return (
            <ScrollViewStickyHeader
              key={key}
              ref={(ref) => this._setStickyHeaderRef(key, ref)}
              nextHeaderLayoutY={
                this._headerLayoutYs.get(this._getKeyForIndex(nextIndex, childArray))
              }
              onLayout={(event) => this._onStickyHeaderLayout(index, event, key)}
              scrollAnimatedValue={this._scrollAnimatedValue}>
              {child}
            </ScrollViewStickyHeader>
          );
        } else {
          return child;
        }
      }) :
      this.props.children;
    const contentContainer =
      <ScrollContentContainerViewClass
        {...contentSizeChangeProps}
        ref={this._setInnerViewRef}
        style={contentContainerStyle}
        removeClippedSubviews={
          // Subview clipping causes issues with sticky headers on Android and
          // would be hard to fix properly in a performant way.
          Platform.OS === 'android' && hasStickyHeaders ?
            false :
            this.props.removeClippedSubviews
        }
        collapsable={false}>
        {children}
      </ScrollContentContainerViewClass>;

    const alwaysBounceHorizontal =
      this.props.alwaysBounceHorizontal !== undefined ?
        this.props.alwaysBounceHorizontal :
        this.props.horizontal;

    const alwaysBounceVertical =
      this.props.alwaysBounceVertical !== undefined ?
        this.props.alwaysBounceVertical :
        !this.props.horizontal;

    const DEPRECATED_sendUpdatedChildFrames =
      !!this.props.DEPRECATED_sendUpdatedChildFrames;

    const baseStyle = this.props.horizontal ? styles.baseHorizontal : styles.baseVertical;
    const props = {
      ...this.props,
      alwaysBounceHorizontal,
      alwaysBounceVertical,
      style: ([baseStyle, this.props.style]: ?Array<any>),
      onContentSizeChange: null,
      onMomentumScrollBegin: this.scrollResponderHandleMomentumScrollBegin,
      onMomentumScrollEnd: this.scrollResponderHandleMomentumScrollEnd,
      onResponderGrant: this.scrollResponderHandleResponderGrant,
      onResponderReject: this.scrollResponderHandleResponderReject,
      onResponderRelease: this.scrollResponderHandleResponderRelease,
      onResponderTerminate: this.scrollResponderHandleTerminate,
      onResponderTerminationRequest: this.scrollResponderHandleTerminationRequest,
      onScroll: this._handleScroll,
      onScrollBeginDrag: this.scrollResponderHandleScrollBeginDrag,
      onScrollEndDrag: this.scrollResponderHandleScrollEndDrag,
      onScrollShouldSetResponder: this.scrollResponderHandleScrollShouldSetResponder,
      onStartShouldSetResponder: this.scrollResponderHandleStartShouldSetResponder,
      onStartShouldSetResponderCapture: this.scrollResponderHandleStartShouldSetResponderCapture,
      onTouchEnd: this.scrollResponderHandleTouchEnd,
      onTouchMove: this.scrollResponderHandleTouchMove,
      onTouchStart: this.scrollResponderHandleTouchStart,
      onTouchCancel: this.scrollResponderHandleTouchCancel,
      scrollEventThrottle: hasStickyHeaders ? 1 : this.props.scrollEventThrottle,
      sendMomentumEvents: (this.props.onMomentumScrollBegin || this.props.onMomentumScrollEnd) ?
        true : false,
      DEPRECATED_sendUpdatedChildFrames,
    };

    const { decelerationRate } = this.props;
    if (decelerationRate) {
      props.decelerationRate = processDecelerationRate(decelerationRate);
    }

    const refreshControl = this.props.refreshControl;

    if (refreshControl) {
      if (Platform.OS === 'ios') {

        return (
          <ScrollViewClass {...props} ref={this._setScrollViewRef}>
            {Platform.isTVOS ? null : refreshControl}
            {contentContainer}
          </ScrollViewClass>
        );
      } else if (Platform.OS === 'android') {

        return React.cloneElement(
          refreshControl,
          {style: props.style},
          <ScrollViewClass {...props} style={baseStyle} ref={this._setScrollViewRef}>
            {contentContainer}
          </ScrollViewClass>
        );
      }
    }
    return (
      <ScrollViewClass {...props} ref={this._setScrollViewRef}>
        {contentContainer}
      </ScrollViewClass>
    );
  }
});

const styles = StyleSheet.create({
  baseVertical: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'column',
    overflow: 'scroll',
  },
  baseHorizontal: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'row',
    overflow: 'scroll',
  },
  contentContainerHorizontal: {
    flexDirection: 'row',
  },
});

let nativeOnlyProps,
  AndroidScrollView,
  AndroidHorizontalScrollContentView,
  AndroidHorizontalScrollView,
  SHPKeyboardAwareScrollView,
  SHPKeyboardAwareScrollContentView;
if (Platform.OS === 'android') {
  nativeOnlyProps = {
    nativeOnly: {
      sendMomentumEvents: true,
    }
  };
  AndroidScrollView = requireNativeComponent(
    'SHPKeyboardAwareScrollView',
    (SPHKeyboardAwareScrollViewHelper: React.ComponentType<any>),
    nativeOnlyProps
  );
  AndroidHorizontalScrollView = requireNativeComponent(
    'AndroidHorizontalScrollView',
    (SPHKeyboardAwareScrollViewHelper: React.ComponentType<any>),
    nativeOnlyProps
  );
  AndroidHorizontalScrollContentView = requireNativeComponent(
    'AndroidHorizontalScrollContentView'
  );
} else if (Platform.OS === 'ios') {
  nativeOnlyProps = {
    nativeOnly: {
      onMomentumScrollBegin: true,
      onMomentumScrollEnd : true,
      onScrollBeginDrag: true,
      onScrollEndDrag: true,
    }
  };
  SHPKeyboardAwareScrollView = requireNativeComponent(
    'SHPKeyboardAwareScrollView',
    (SPHKeyboardAwareScrollViewHelper: React.ComponentType<any>),
    nativeOnlyProps,
  );
  SHPKeyboardAwareScrollContentView = requireNativeComponent('SHPKeyboardAwareScrollContentView', View);
}
module.exports = SPHKeyboardAwareScrollViewHelper;
