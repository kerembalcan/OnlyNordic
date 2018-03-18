//
//  RNNYTPhoto.h
//  CoolStuff
//
//  Created by Kerem Balcan on 18.03.2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <NYTPhotoViewer/NYTPhoto.h>

@interface RNNYTPhoto : NSObject<NYTPhoto>

@property(nonatomic) UIImage *image;
@property(nonatomic) NSData *imageData;
@property(nonatomic) UIImage *placeholderImage;
@property(nonatomic) NSAttributedString *attributedCaptionTitle;
@property(nonatomic) NSAttributedString *attributedCaptionSummary;
@property(nonatomic) NSAttributedString *attributedCaptionCredit;

@end
