//
//  SHPKeyboardAwareScrollContentView.m
//  CoolStuff
//
//  Created by Kerem Balcan on 17.03.2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "SHPKeyboardAwareScrollContentView.h"
#import <React/RCTAssert.h>
#import <React/UIView+React.h>

#import "SHPKeyboardAwareScrollView.h"

@implementation SHPKeyboardAwareScrollContentView

- (void)reactSetFrame:(CGRect)frame
{
  [super reactSetFrame:frame];
  
  SHPKeyboardAwareScrollView *scrollView = (SHPKeyboardAwareScrollView *)self.superview.superview;


  if (!scrollView) {
    return;
  }
  
  RCTAssert([scrollView isKindOfClass:[SHPKeyboardAwareScrollView class]],
            @"Unexpected view hierarchy of SHPKeyboardAwareScrollView component.");
  
  [scrollView updateContentOffsetIfNeeded];
}

@end
