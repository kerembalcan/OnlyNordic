//
//  RNNYTPhotoViewerManager.m
//  CoolStuff
//
//  Created by Kerem Balcan on 18.03.2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RNNYTPhotoViewerManager.h"
#import "RNNYTPhotoViewer.h"
#import <React/RCTLog.h>
#import <NYTPhotoViewer/NYTPhotosViewController.h>
#import <NYTPhotoViewer/NYTPhoto.h>
#import "AppDelegate.h"


@implementation RNNYTPhotoViewerManager

RCT_EXPORT_MODULE();

- (UIView*)view
{
  return [[RNNYTPhotoViewer alloc] initWithBridge: self.bridge];
}

RCT_EXPORT_VIEW_PROPERTY(data, NSArray)
RCT_EXPORT_VIEW_PROPERTY(initial, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(hideStatusBar, BOOL)
RCT_EXPORT_VIEW_PROPERTY(hideCloseButton, BOOL)
RCT_EXPORT_VIEW_PROPERTY(hideShareButton, BOOL)

RCT_EXPORT_VIEW_PROPERTY(onDismiss, RCTBubblingEventBlock)

@end
