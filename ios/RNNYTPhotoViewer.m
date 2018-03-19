//
//  RNNYTPhotoViewer.m
//  CoolStuff
//
//  Created by Kerem Balcan on 18.03.2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RNNYTPhotoViewer.h"
#import <NYTPhotoViewer/NYTPhotosViewController.h>
#import <Foundation/Foundation.h>

@implementation RNNYTPhotoViewer {
  
  __weak RCTBridge* _bridge;

}

- (instancetype)initWithBridge:(RCTBridge*)bridge
{
  if ((self = [super init])) {
    _bridge = bridge;
  }
  
  return self;
}
- (void)didMoveToWindow
{
  if (self.data) {
    [self showViewer:self.data];
  }
}
- (void)removeFromSuperview
{
  [self hideViewer];
}
- (void)invalidate
{
  [self hideViewer];
}
- (void)clean
{
  self.nytPhotosViewController = nil;
  self.dataSource = nil;
  self.photos = nil;
  self.data = nil;
  self.reactPhotos = nil;
}


- (UIViewController*)visibleViewController:(UIViewController*)rootViewController
{
  if (rootViewController.presentedViewController == nil) {
    return rootViewController;
  }
  if ([rootViewController.presentedViewController isKindOfClass:[UINavigationController class]]) {
    UINavigationController* navigationController = (UINavigationController*)rootViewController.presentedViewController;
    UIViewController* lastViewController = [[navigationController viewControllers] lastObject];
    
    return [self visibleViewController:lastViewController];
  }
  if ([rootViewController.presentedViewController isKindOfClass:[UITabBarController class]]) {
    UITabBarController* tabBarController = (UITabBarController*)rootViewController.presentedViewController;
    UIViewController* selectedViewController = tabBarController.selectedViewController;
    
    return [self visibleViewController:selectedViewController];
  }
  
  UIViewController* presentedViewController = (UIViewController*)rootViewController.presentedViewController;
  
  return [self visibleViewController:presentedViewController];
}

- (UIViewController*)getRootView
{
  UIViewController* rootView =
  [self visibleViewController:[UIApplication sharedApplication].keyWindow.rootViewController];
  return rootView;
}

- (void)hideViewer
{
  [self.nytPhotosViewController dismissViewControllerAnimated:YES completion:nil];
  [self clean];
}

- (void)showViewer:(NSArray*)data
{
  
  if (!data) {
    return;
  }
  
  NSMutableArray* msPhotos = [NSMutableArray array];
  NSMutableArray* rsPhotos = [NSMutableArray array];
  
  for (NSDictionary* dic in data) {
    
    RNNYTPhotoData* d = [[RNNYTPhotoData alloc] initWithDictionary:dic];
    
    RNNYTPhoto* rnnytPhoto = [RNNYTPhoto new];
    
    rnnytPhoto.image = nil;
    
    if (d.title) {
      rnnytPhoto.attributedCaptionTitle = [RNNYTPhotoViewer attributedTitleFromString:d.title:d.titleColor ? [RCTConvert UIColor:d.titleColor] : [UIColor whiteColor]];
    }
    if (d.summary) {
      rnnytPhoto.attributedCaptionSummary = [RNNYTPhotoViewer attributedSummaryFromString:d.summary:d.summaryColor ? [RCTConvert UIColor:d.summaryColor] : [UIColor lightGrayColor]];
    }
    
    [msPhotos addObject:rnnytPhoto];
    
    [rsPhotos addObject:d];
  }
  
  self.photos = msPhotos;
  self.reactPhotos = rsPhotos;
  
  self.dataSource = [NYTPhotoViewerArrayDataSource dataSourceWithPhotos:self.photos];
  NSInteger initialPhoto = self.initial;
  
  dispatch_async(dispatch_get_main_queue(), ^{
    
    NYTPhotosViewController* photosViewController = [[NYTPhotosViewController alloc]
                                                     initWithDataSource:self.dataSource
                                                     initialPhoto:[self.photos objectAtIndex:initialPhoto]
                                                     delegate:self];
    // hide left bar button
    if (self.hideCloseButton) {
      photosViewController.leftBarButtonItem = nil;
    }
    // hide right bar button
    if (self.hideShareButton) {
      photosViewController.rightBarButtonItem = nil;
    }
    
    self.nytPhotosViewController = photosViewController;
    
    [[self getRootView] presentViewController:photosViewController
                                     animated:YES
                                   completion:nil];
    if (initialPhoto >= 0) {
      [self updatePhotoAtIndex:photosViewController Index:initialPhoto];
    }
    if (self.hideStatusBar) {
      [[UIApplication sharedApplication] setStatusBarHidden:YES withAnimation:YES];
    }
  });
}

/**
 Update Photo
 @param photosViewController <#photosViewController description#>
 @param photoIndex <#photoIndex description#>
 */
- (void)updatePhotoAtIndex:(NYTPhotosViewController*)photosViewController
                     Index:(NSUInteger)photoIndex
{
  NSInteger current = (unsigned long)photoIndex;
  RNNYTPhoto* currentPhoto = [self.dataSource.photos objectAtIndex:current];
  RNNYTPhotoData* d = self.reactPhotos[current];
  
  [_bridge.imageLoader loadImageWithURLRequest:d.source.request
                                          size:d.source.size
                                         scale:d.source.scale
                                       clipped:YES
                                    resizeMode:RCTResizeModeStretch
                                 progressBlock:^(int64_t progress, int64_t total) {
                                   //            NSLog(@"%lld %lld", progress, total);
                                 }
                              partialLoadBlock:nil
                               completionBlock:^(NSError* error, UIImage* image) {
                                 if (image) {
                                   dispatch_async(dispatch_get_main_queue(), ^{
                                     
                                     currentPhoto.image = image;
                                     
                                     [photosViewController updatePhoto:currentPhoto];
                                     
                                   });
                                 }
                               }];
}

#pragma mark - NYTPhotosViewControllerDelegate
- (UIView*)photosViewController:(NYTPhotosViewController*)photosViewController loadingViewForPhoto:(id<NYTPhoto>)photo
{
  return nil;
}
- (UIView*)photosViewController:(NYTPhotosViewController*)photosViewController
          referenceViewForPhoto:(id<NYTPhoto>)photo
{
  return nil;
}

/**
 Customize title display
 @param photosViewController <#photosViewController description#>
 @param photo <#photo description#>
 @param photoIndex <#photoIndex description#>
 @param totalPhotoCount <#totalPhotoCount description#>
 @return <#return value description#>
 */
- (NSString*)photosViewController:(NYTPhotosViewController*)photosViewController
                    titleForPhoto:(id<NYTPhoto>)photo
                          atIndex:(NSInteger)photoIndex
                  totalPhotoCount:(nullable NSNumber*)totalPhotoCount
{
  return [NSString stringWithFormat:@"%lu / %lu", (unsigned long)photoIndex + 1,
          (unsigned long)totalPhotoCount.integerValue];
}

- (void)photosViewController:(NYTPhotosViewController*)photosViewController
          didNavigateToPhoto:(id<NYTPhoto>)photo
                     atIndex:(NSUInteger)photoIndex
{
  if (!photo.image || !photo.imageData) {
    [self updatePhotoAtIndex:photosViewController Index:photoIndex];
  }

}

- (void)displayActivityViewController:(UIActivityViewController*)controller animated:(BOOL)animated
{
  
  [[self getRootView] presentViewController:controller animated:animated completion:nil];
}
- (BOOL)photosViewController:(NYTPhotosViewController*)photosViewController handleLongPressForPhoto:(id<NYTPhoto>)photo withGestureRecognizer:(UILongPressGestureRecognizer*)longPressGestureRecognizer
{
  
  if ((photosViewController.currentlyDisplayedPhoto.image || photosViewController.currentlyDisplayedPhoto.imageData)) {
    UIImage* image = photosViewController.currentlyDisplayedPhoto.image ? photosViewController.currentlyDisplayedPhoto.image : [UIImage imageWithData:photosViewController.currentlyDisplayedPhoto.imageData];
    UIActivityViewController* activityViewController = [[UIActivityViewController alloc] initWithActivityItems:@[ image ] applicationActivities:nil];
    
    activityViewController.completionWithItemsHandler = ^(NSString* __nullable activityType, BOOL completed, NSArray* __nullable returnedItems, NSError* __nullable activityError) {
      if (completed && [photosViewController.delegate respondsToSelector:@selector(photosViewController:actionCompletedWithActivityType:)]) {
        [photosViewController.delegate photosViewController:photosViewController actionCompletedWithActivityType:activityType];
      }
    };
    
    [self displayActivityViewController:activityViewController animated:YES];
  }
  return YES;
}
- (void)photosViewControllerDidDismiss:(NYTPhotosViewController*)photosViewController
{
  
  if (self.hideStatusBar) {
    [[UIApplication sharedApplication] setStatusBarHidden:NO withAnimation:NO];
  }
  
  if (self.onDismiss) {
    self.onDismiss(nil);
  }
  [self clean];
}

+ (NSAttributedString*)attributedTitleFromString:(NSString*)caption
                                                :(UIColor*)color
{
  return [[NSAttributedString alloc]
          initWithString:caption
          attributes:@{
                       NSForegroundColorAttributeName : color,
                       NSFontAttributeName : [UIFont preferredFontForTextStyle:UIFontTextStyleBody]
                       }];
}

+ (NSAttributedString*)attributedSummaryFromString:(NSString*)summary
                                                  :(UIColor*)color
{
  return [[NSAttributedString alloc]
          initWithString:summary
          attributes:@{
                       NSForegroundColorAttributeName : color,
                       NSFontAttributeName : [UIFont preferredFontForTextStyle:UIFontTextStyleBody]
                       }];
}

@end
