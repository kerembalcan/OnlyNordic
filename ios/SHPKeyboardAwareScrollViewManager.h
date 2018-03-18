//
//  SHPKeyboardAwareScrollViewManager.h
//  CoolStuff
//
//  Created by Kerem Balcan on 17.03.2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <React/RCTConvert.h>
#import <React/RCTViewManager.h>

@interface RCTConvert (UIScrollView)

+ (UIScrollViewKeyboardDismissMode)UIScrollViewKeyboardDismissMode:(id)json;

@end

@interface SHPKeyboardAwareScrollViewManager : RCTViewManager

@end

