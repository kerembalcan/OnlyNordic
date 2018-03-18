//
//  RNYSegmentView.m
//  CoolStuff
//
//  Created by Kerem Balcan on 11.02.2018.
//  Copyright © 2018 Facebook. All rights reserved.
//
#import <React/RCTView.h>
#import "RNYSegmentView.h"
#import <React/RCTLog.h>
#import "NYSegmentedControl.h"

@interface RNYSegmentView ()

@property (nonatomic, copy) RCTBubblingEventBlock onChange;

@end

@implementation RNYSegmentView

- (NYSegmentedControl *)flatGraySegmentedControl {
  NYSegmentedControl *flatGraySegmentedControl = [[NYSegmentedControl alloc] initWithItems:@[@"ENGLISH", @"中文文学"]];
  [flatGraySegmentedControl addTarget:self action:@selector(segmenSelected) forControlEvents:UIControlEventValueChanged];
  flatGraySegmentedControl.selectedSegmentIndex = 1;
  flatGraySegmentedControl.backgroundColor = [UIColor colorWithRed:0.09f green:0.09f blue:0.12f alpha:1.0f];
  flatGraySegmentedControl.selectedTitleFont = [UIFont systemFontOfSize:12.0f weight:UIFontWeightSemibold];
  flatGraySegmentedControl.titleFont = [UIFont systemFontOfSize:12.0f weight:UIFontWeightSemibold];
  flatGraySegmentedControl.borderColor = [UIColor colorWithRed:0.18f green:0.18f blue:0.22f alpha:1.0f];
  flatGraySegmentedControl.borderWidth = 2.0f;
  flatGraySegmentedControl.segmentIndicatorBorderColor = [UIColor clearColor];
  flatGraySegmentedControl.segmentIndicatorBackgroundColor = [UIColor colorWithRed:0.18f green:0.18f blue:0.22f alpha:1.0f];
  flatGraySegmentedControl.segmentIndicatorInset = 5.0f;
  flatGraySegmentedControl.titleTextColor = [UIColor colorWithRed:0.30f green:0.31f blue:0.36f alpha:1.0f];
  flatGraySegmentedControl.selectedTitleTextColor = [UIColor whiteColor];
  flatGraySegmentedControl.cornerRadius = 22.0f;
  [flatGraySegmentedControl.widthAnchor constraintEqua@property (nonatomic, copy) RCTBubblingEventBlock onChange;lToConstant:240.0f].active = YES;
  [flatGraySegmentedControl.heightAnchor constraintEqualToConstant:44.0f].active = YES;
  
  return flatGraySegmentedControl;
}
- (UIView *)addSegmentedControlExample:(NYSegmentedControl *)segmentedControl {
  segmentedControl.translatesAutoresizingMaskIntoConstraints = NO;
  return segmentedControl;
}

- (instancetype)init
{
/*  self = [super init];
  NYSegmentedControl *segmented1 = [self flatGraySegmentedControl];
  segmented1 = [NYSegmentedControl alloc];
  

  [self addSubview: segmented1];
  return self;*/
  self = [super init];
  
  //UIView *paintView=[[UIView alloc]initWithFrame:CGRectMake(0, 50, 320, 430)];
  //[paintView setBackgroundColor:[UIColor yellowColor]];
  //[self addSubview:paintView];
  
  UIView *segmentView=[self addSegmentedControlExample:[self flatGraySegmentedControl]];;
  [self addSubview:segmentView];
  return self;
}

- (void)didChange:(NYSegmentedControl *)segmented
{
  if (_onChange && segmented.selectedSegmentIndex == 0) {
    RCTLogInfo(@"showImage");
    _onChange(@{ @"selectedSegmentIndex": @(1) });
  } else if (_onChange && segmented.selectedSegmentIndex == 1) {
    RCTLogInfo(@"showImage");
    _onChange(@{ @"selectedSegmentIndex": @(0) });
  }
}

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

@end
