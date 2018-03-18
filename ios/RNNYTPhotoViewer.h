//
//  RNNYTPhotoViewer.h
//  CoolStuff
//
//  Created by Kerem Balcan on 18.03.2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>
#import <React/RCTInvalidating.h>
#import <React/RCTBridge.h>
#import <React/RCTConvert.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTImageLoader.h>
#import <React/RCTImageSource.h>


#import <NYTPhotoViewer/NYTPhotoViewerArrayDataSource.h>
#import <NYTPhotoViewer/NYTPhotosViewController.h>
#import "RNNYTPhoto.h"
#import "RNNYTPhotoData.h"

@class RCTBridge;
@class RCTImageSource;

@class RCTEventDispatcher;

@interface RNNYTPhotoViewer : UIView <NYTPhotosViewControllerDelegate, RCTInvalidating>

// Define view properties here with @property
@property (nonatomic) NSInteger initial;
@property (nonatomic) NSArray* data;
@property (nonatomic) BOOL hideStatusBar;
@property (nonatomic, copy) RCTBubblingEventBlock onDismiss;
// @property (nonatomic, copy) RCTBubblingEventBlock onNavigateToPhoto;
@property (nonatomic) BOOL hideCloseButton;
@property (nonatomic) BOOL hideShareButton;

// Initializing with the event dispatcher allows us to communicate with JS
//- (instancetype)initWithEventDispatcher:(RCTEventDispatcher*)eventDispatcher NS_DESIGNATED_INITIALIZER;
- (instancetype)initWithBridge:(RCTBridge *)bridge NS_DESIGNATED_INITIALIZER;

@property (nonatomic) NSMutableArray* photos;
@property (nonatomic) NSMutableArray* reactPhotos;

@property (nonatomic) NYTPhotoViewerArrayDataSource* dataSource;
@property (nonatomic) NYTPhotosViewController* nytPhotosViewController;
@end
