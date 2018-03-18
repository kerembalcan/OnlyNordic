//
//  RNNYTPhotoData.m
//  CoolStuff
//
//  Created by Kerem Balcan on 18.03.2018.
//  Copyright © 2018 Facebook. All rights reserved.
//
#import <Foundation/Foundation.h>
#import "RNNYTPhotoData.h"

NSString* const photoDataSummary = @"summary";
NSString* const photoDataSummaryColor = @"summaryColor";
NSString* const photoDataTitle = @"title";
NSString* const photoDataTitleColor = @"titleColor";
NSString* const photoSource = @"source";

@interface RNNYTPhotoData ()
@end
@implementation RNNYTPhotoData

/**
 * Instantiate the instance using the passed dictionary values to set the properties values
 */

- (instancetype)initWithDictionary:(NSDictionary*)dictionary
{
  self = [super init];
  if (![dictionary[photoDataSummary] isKindOfClass:[NSNull class]]) {
    self.summary = dictionary[photoDataSummary];
  }
  if (![dictionary[photoDataSummaryColor] isKindOfClass:[NSNull class]]) {
    self.summaryColor = dictionary[photoDataSummaryColor];
  }
  if (![dictionary[photoDataTitle] isKindOfClass:[NSNull class]]) {
    self.title = dictionary[photoDataTitle];
  }
  if (![dictionary[photoDataTitleColor] isKindOfClass:[NSNull class]]) {
    self.titleColor = dictionary[photoDataTitleColor];
  }
  
  if (![dictionary[photoSource] isKindOfClass:[NSNull class]]) {
    self.source = [RCTConvert RCTImageSource: dictionary[photoSource]];
  }
  return self;
}
@end

