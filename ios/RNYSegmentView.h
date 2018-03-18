//
//  RNYSegmentView.h
//  CoolStuff
//
//  Created by Kerem Balcan on 11.02.2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface RNYSegmentView : UIView
@property (nonatomic, strong) UIStackView *stackView;
@property (nonatomic, copy) RCTBubblingEventBlock onChange;
@end
