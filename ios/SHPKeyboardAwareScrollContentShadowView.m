//
//  ShapeKeyboardAwareScrollContentShadowView.m
//  CoolStuff
//
//  Created by Kerem Balcan on 17.03.2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "SHPKeyboardAwareScrollContentShadowView.h"
#import <yoga/Yoga.h>
#import <React/RCTUtils.h>

@interface RCTShadowView () {
  // This will be removed after t15757916, which will remove
  // side-effects from `setFrame:` method.
@public CGRect _frame;
}
@end

@implementation SHPKeyboardAwareScrollContentShadowView

- (void)applyLayoutNode:(YGNodeRef)node
      viewsWithNewFrame:(NSMutableSet<RCTShadowView *> *)viewsWithNewFrame
       absolutePosition:(CGPoint)absolutePosition
{
  // Call super method if LTR layout is enforced.
  if (YGNodeLayoutGetDirection(self.yogaNode) != YGDirectionRTL) {
    [super applyLayoutNode:node
         viewsWithNewFrame:viewsWithNewFrame
          absolutePosition:absolutePosition];
    return;
  }
  
  // Motivation:
  // Yoga place `contentView` on the right side of `scrollView` when RTL layout is enfoced.
  // That breaks everything; it is completly pointless to (re)position `contentView`
  // because it is `contentView`'s job. So, we work around it here.
  
  // Step 1. Compensate `absolutePosition` change.
  CGFloat xCompensation = YGNodeLayoutGetRight(node) - YGNodeLayoutGetLeft(node);
  absolutePosition.x += xCompensation;
  
  // Step 2. Call super method.
  [super applyLayoutNode:node
       viewsWithNewFrame:viewsWithNewFrame
        absolutePosition:absolutePosition];
  
  // Step 3. Reset the position.
  _frame.origin.x = RCTRoundPixelValue(YGNodeLayoutGetRight(node));
}

@end

