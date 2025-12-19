//
//  FileSaver.h
//  PayslipSampleApp
//
//  Created by alaeddine jendoubi on 19/12/2025.
//

#import <Foundation/Foundation.h>
#import "FileSaver.h"
#import <React/RCTLog.h>

@implementation FileSaver

// Export module to React Native
RCT_EXPORT_MODULE();

// Export the saveBundledFile method
RCT_EXPORT_METHOD(saveFile:(NSString *)fileName
                  destinationPath:(NSString *)destinationPath
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        // Get the path to the bundled file
        NSString *bundledFilePath = [[NSBundle mainBundle] pathForResource:fileName ofType:nil];
        
        if (!bundledFilePath) {
            reject(@"FILE_NOT_FOUND",
                   [NSString stringWithFormat:@"Bundled file not found: %@", fileName],
                   nil);
            return;
        }
        
        // Get the documents directory
        NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
        NSString *documentsDirectory = [paths firstObject];
        
        // Create full destination path
        NSString *fullDestinationPath = [documentsDirectory stringByAppendingPathComponent:destinationPath];
        
        // Create intermediate directories if needed
        NSString *destinationDir = [fullDestinationPath stringByDeletingLastPathComponent];
        NSFileManager *fileManager = [NSFileManager defaultManager];
        
        NSError *dirError = nil;
        if (![fileManager fileExistsAtPath:destinationDir]) {
            [fileManager createDirectoryAtPath:destinationDir
                   withIntermediateDirectories:YES
                                    attributes:nil
                                         error:&dirError];
        }
        
        if (dirError) {
            reject(@"DIR_CREATE_ERROR", @"Could not create directory", dirError);
            return;
        }
        
        // Copy the file
        NSError *copyError = nil;
        
        // Remove existing file if it exists
        if ([fileManager fileExistsAtPath:fullDestinationPath]) {
            [fileManager removeItemAtPath:fullDestinationPath error:nil];
        }
        
        BOOL success = [fileManager copyItemAtPath:bundledFilePath
                                            toPath:fullDestinationPath
                                             error:&copyError];
        
        if (success) {
            RCTLogInfo(@"File saved successfully to: %@", fullDestinationPath);
            resolve(fullDestinationPath);
        } else {
            reject(@"COPY_ERROR", @"Failed to copy file", copyError);
        }
    }
    @catch (NSException *exception) {
        reject(@"EXCEPTION", exception.reason, nil);
    }
}

// Export method to get the documents directory path
RCT_EXPORT_METHOD(getDocumentsDirectory:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *documentsDirectory = [paths firstObject];
    resolve(documentsDirectory);
}

// Export method to check if file exists
RCT_EXPORT_METHOD(fileExists:(NSString *)filePath
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSFileManager *fileManager = [NSFileManager defaultManager];
    BOOL exists = [fileManager fileExistsAtPath:filePath];
    resolve(@(exists));
}

// Export method to delete a file
RCT_EXPORT_METHOD(deleteFile:(NSString *)filePath
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        NSFileManager *fileManager = [NSFileManager defaultManager];
        
        if (![fileManager fileExistsAtPath:filePath]) {
            reject(@"FILE_NOT_FOUND", @"File does not exist", nil);
            return;
        }
        
        NSError *error = nil;
        BOOL success = [fileManager removeItemAtPath:filePath error:&error];
        
        if (success) {
            resolve(@(YES));
        } else {
            reject(@"DELETE_ERROR", @"Failed to delete file", error);
        }
    }
    @catch (NSException *exception) {
        reject(@"EXCEPTION", exception.reason, nil);
    }
}

@end
