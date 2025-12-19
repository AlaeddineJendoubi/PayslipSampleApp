# Payslip Manager - React Native App

A React Native application for viewing and managing payslips with search, filter, and download capabilities.

## Features

- 📋 Browse payslips in a scrollable list
- 🔍 Search by file type, extension, payslip ID, from date, or to date
- 🔄 Sort by ID, from date, or to date (ascending/descending)
- 📄 View detailed payslip information
- 💾 Download payslip files using native file saver

## Prerequisites

- Node.js >= 20
- React Native development environment set up ([React Native Environment Setup](https://reactnative.dev/docs/environment-setup))
- **For iOS:** macOS with Xcode 14+ and CocoaPods installed
- **For Android:** Android Studio with SDK 31+

## Setup

1. **Clone the repository and install dependencies:**

```bash
npm install
```

2. **iOS Setup:**

```bash
cd ios
pod install
cd ..
```

3. **Android Setup:**

No additional setup required. Gradle will handle dependencies automatically.

## Running the App

### Development Mode

Start the Metro bundler:

```bash
npm start
```

### iOS

```bash
npm run ios
```

Or open `ios/PayslipSampleApp.xcworkspace` in Xcode and run from there.

### Android

```bash
npm run android
```

Or open the `android` folder in Android Studio and run from there.

## Architecture & Design Decisions

### Hybrid Approach: Redux Toolkit + React Context
***Redux Toolkit (@reduxjs/toolkit)***: Manages application data (payslips list, filters, search state).

Why: Predictable state management with Redux DevTools for debugging, time-travel, and state inspection.
Trade-off: More boilerplate than Context API, but better suited for complex data flows and middleware integration for future scalability.



***React Context API***: Manages UI-level concerns (theme configuration, colors, spacing).

Why: Lightweight for UI preferences that don't need Redux's power. Avoids polluting Redux store with presentational logic.
Trade-off: Performance concerns if theme updates frequently (mitigated by memoization and careful context structure).

### Navigation
- **React Navigation (Native Stack)**: Industry-standard navigation solution with native performance.


### UI Components
- **FlatList**: Optimized for rendering large lists with built-in performance optimizations (virtualization, recycling).
- **ScrollView**: For static vertical scroll integration used for sort filters.
- **react-native-feather**: Lightweight icon library with consistent design language.
- **Trade-off**: Custom icons might require additional libraries or assets.

### File Management
- **Native File Saver Module**: Platform-specific implementation for reliable file downloads.


### Project Structure


This project follows a **feature-oriented and layered architecture**, separating application concerns, reusable UI components, domain-specific logic, and platform services. The structure is designed for scalability, testability, and clear ownership of responsibilities.


```
src/
├── app/          
│   ├── navigation/   
│   ├── state/     
│   └── theme/      
├── components/
│   ├── BackButton/ 
│   ├── Card/  
│   ├── Label/  
│   └── Line/     
├── modules/              
│   └── payslips 
├── services/              
│   └── fileSaver 
├── utils/     
│   dateConverters/         
│   filters 
├── Views/     
│   ├── PayslipDetails
│         └── Hooks
│   └── PayslipList 
│         ├── components 
│         └── Hooks

```

---

### `src/app/` – Application Core

Houses application-wide configuration and infrastructure.


```
app/
├── navigation/
├── state/
└── theme/
```
### `navigation/`

- Defines the application navigation structure and routes.
- Contains the main `AppNavigator` and strongly typed navigation definitions.
- Serves as the central source of truth for screen registration.

### `state/`
- Global state configuration.
- Redux store setup, middleware, and root reducers.
- App-wide state concerns only (feature-specific state lives in `modules/`).

### `theme/`
- Theme management (colors, spacing, typography).
- Provides theme context/providers and shared design tokens.

---

## `src/components/` – Shared UI Components

Globally reusable, **presentation-only** components.
```
components/
├── BackButton/
├── Card/
├── Label/
└── Line/
```

Characteristics:
- Stateless or minimally stateful
- Feature-agnostic
- No direct dependency on navigation or global state

---

## `src/modules/` – Domain / Feature Logic 

Encapsulates **feature-specific business logic and state management**.

```
modules/
└── payslips/
```

Contains:
- Redux slices (reducers)
- Selectors
- Types and interfaces
- Business rules related to the feature

This separation keeps domain logic independent from UI concerns and simplifies testing.

---

## `src/services/` – Platform & External Services

Handles interaction with native APIs, external SDKs, and system-level functionality.

```
services/
└── fileSaver/
```

### `fileSaver/`
- JavaScript wrapper around a native module (iOS / Android).
- Responsible for saving bundled or generated files to the user’s device.
- Abstracts platform differences behind a unified JS API.

---

## `src/utils/` – Shared Utilities

Pure helper functions with no UI or state dependencies.

```
utils/
├── dateConverters/
└── filters/
```

### `dateConverters/`
- Date formatting and conversion helpers.
- Handles ISO strings, timestamps, and human-readable formats.

### `filters/`
- Reusable filtering logic.
- Used across hooks and views for data transformation.

---

## `src/views/` – Screens & Feature UI

Represents **application screens (routes)**.  
Each view owns its UI composition and screen-specific logic.

```
views/
├── PayslipDetails/
│ └── hooks/
└── PayslipList/
├── components/
└── hooks/
```

### `PayslipDetails/`
- Screen responsible for displaying a single payslip.
- Contains hooks specific to the details screen.

### `PayslipList/`
- Screen responsible for listing payslips.

#### `components/`
- Screen-scoped UI elements (e.g. search bar, sort bar, list item).
- Not intended for global reuse.

#### `hooks/`
- Hooks encapsulating list-specific state and behavior.
- Keeps screens lean and improves testability.

---

## Architectural Principles

- **Separation of concerns**: UI, state, domain logic, and services are isolated.
- **Feature ownership**: Feature logic resides in `modules/` and `views/`.
- **Reusability**: Shared UI and utilities are centralized.
- **Scalability**: New features can be added with minimal impact on existing code.

### Key Technical Choices

1. **TypeScript**: Type safety reduces runtime errors and improves developer experience.
2. **Functional Components + Hooks**: Modern React patterns, better performance, cleaner code.
3. **Redux Toolkit**: Reduces Redux boilerplate while maintaining predictability.
4. **Safe Area Context**: Handles device notches and safe areas consistently across devices.

### Trade-offs Made

- **Redux vs Context API**: Redux adds overhead but provides better DevTools and middleware support for future features (API integration, persistence when needed).
- **Native File Saver vs JS-only**: Native implementation requires platform-specific code but provides reliable file system access and better UX.
- **FlatList vs SectionList**: FlatList is simpler for unsectioned data; SectionList could be used if grouping by date/month is needed.
- **With more time** , better handle saving files by providing the user the ability to choose where to save the file, better error handling for native module, and more consitancy. 
- **Missing nice to have** A file viewer feature was missed due to time limitations, it would've been implemented if not for the native module restriction. 

## Testing

```bash
npm test
```


## Troubleshooting

**Metro bundler cache issues:**
```bash
npm start -- --reset-cache
```

**iOS build issues:**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

**Android build issues:**
```bash
cd android
./gradlew clean
cd ..
```

## License

Public
