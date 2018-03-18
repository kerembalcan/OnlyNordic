//
//  RNYSegmentedControl.m
//  CoolStuff
//
//  Created by Kerem Balcan on 4.02.2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RNYSegmentedControl.h"
#import <React/RCTLog.h>
#import <React/RCTViewManager.h>
#import <React/RCTBridge.h>
#import <React/RCTConvert.h>
#import "RNYSegmentedControlViewController.h"
#import "NYSegmentedControl.h"
#import "RNYSegmentView.h"
#import "AppDelegate.h"

@interface RNYSegmentedControl : RCTViewManager


@end

@implementation RNYSegmentedControl

RCT_EXPORT_MODULE()
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)

- (UIView *)view
{
  return [[RNYSegmentView alloc] init];
  
}

RCT_EXPORT_METHOD(showImage)
{
 RCTLogInfo(@"showImage");
  /*
  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  RNYSegmentedControlViewController *segmentedVC = [[RNYSegmentedControlViewController alloc] initWithNibName:nil bundle:nil];
  

  dispatch_async(dispatch_get_main_queue(), ^{
    delegate.window.rootViewController = segmentedVC;
  });
   */
}
@end
