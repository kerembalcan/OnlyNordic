//
//  RNNYTPhotoData.h
//  CoolStuff
//
//  Created by Kerem Balcan on 18.03.2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTImageSource.h>

@interface RNNYTPhotoData : NSObject

@property (nonatomic, strong) NSString* summary;
@property (nonatomic, strong) NSString* summaryColor;
@property (nonatomic, strong) NSString* title;
@property (nonatomic, strong) NSString* titleColor;
@property (nonatomic) RCTImageSource* source;
- (instancetype)initWithDictionary:(NSDictionary*)dictionary;
@end
