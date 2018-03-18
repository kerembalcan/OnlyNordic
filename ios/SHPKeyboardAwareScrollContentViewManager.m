//
//  SHPKeyboardAwareScrollContentViewManager.m
//  CoolStuff
//
//  Created by Kerem Balcan on 17.03.2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "SHPKeyboardAwareScrollContentViewManager.h"
#import "SHPKeyboardAwareScrollContentView.h"
#import "SHPKeyboardAwareScrollContentShadowView.h"

@implementation SHPKeyboardAwareScrollContentViewManager

RCT_EXPORT_MODULE()

- (SHPKeyboardAwareScrollContentView *)view
{
  return [SHPKeyboardAwareScrollContentView new];
}

- (RCTShadowView *)shadowView
{
  return [SHPKeyboardAwareScrollContentShadowView new];
}

@end

