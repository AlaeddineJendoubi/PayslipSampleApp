package com.payslipsampleapp;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Environment;
import android.util.Log;

import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

public class FileSaverModule extends ReactContextBaseJavaModule {
    private static final String TAG = "FileSaver";
    private final ReactApplicationContext reactContext;

    public FileSaverModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "FileSaver";
    }

    /**
     * Check if storage permission is granted
     */
    @ReactMethod
    public void hasStoragePermission(Promise promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            // Android 10+ uses scoped storage, no permission needed for app-specific directories
            promise.resolve(true);
        } else {
            boolean hasPermission = ContextCompat.checkSelfPermission(
                    reactContext,
                    Manifest.permission.WRITE_EXTERNAL_STORAGE
            ) == PackageManager.PERMISSION_GRANTED;
            promise.resolve(hasPermission);
        }
    }



 
    @ReactMethod
    public void getDocumentsDirectory(Promise promise) {
        try {
            File filesDir = reactContext.getFilesDir();
            promise.resolve(filesDir.getAbsolutePath());
        } catch (Exception e) {
            promise.reject("ERROR", "Failed to get documents directory", e);
        }
    }

      @ReactMethod
    public void saveFile(String fileName, Promise promise) {
        try {
            Context context = getReactApplicationContext();
            InputStream is = context.getAssets().open(fileName);

            File outDir = context.getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS);
            if (!outDir.exists()) {
                outDir.mkdirs();
            }

            File outFile = new File(outDir, fileName);
            FileOutputStream fos = new FileOutputStream(outFile);

            byte[] buffer = new byte[1024];
            int read;
            while ((read = is.read(buffer)) != -1) {
                fos.write(buffer, 0, read);
            }

            fos.flush();
            fos.close();
            is.close();

            promise.resolve(outFile.getAbsolutePath());
        } catch (Exception e) {
            promise.reject("SAVE_FAILED", e.getMessage());
        }
    }


    @ReactMethod
    public void getDownloadsDirectory(Promise promise) {
        try {
            File downloadsDir = reactContext.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS);
            if (downloadsDir != null) {
                promise.resolve(downloadsDir.getAbsolutePath());
            } else {
                promise.reject("ERROR", "Downloads directory not available");
            }
        } catch (Exception e) {
            promise.reject("ERROR", "Failed to get downloads directory", e);
        }
    }

    @ReactMethod
    public void fileExists(String filePath, Promise promise) {
        try {
            File file = new File(filePath);
            promise.resolve(file.exists());
        } catch (Exception e) {
            promise.reject("ERROR", "Failed to check file existence", e);
        }
    }

}