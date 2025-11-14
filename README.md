# SMPL - Simple Meal Prep & Logging

A React Native mobile application that simplifies calorie tracking for meal preppers by using Google Cloud Vision OCR to extract nutritional information from recipe images.

## What is SMPL?

SMPL is a cross-platform mobile app built with Expo and React Native that makes tracking macros easier for people who meal prep. Instead of manually entering nutritional information, users can simply upload a photo of their recipe, and the app uses Google Vision Optical Character Recognition to extract the text and convert it into trackable ingredients with corresponding macro information.

## Key Features

- **Photo-Based Recipe Input**: Upload recipe images directly from your device
- **OCR Text Extraction**: Automatically extract text from recipe images using Google Cloud Vision API
- **Recipe Management**: Store and organize multiple recipes in an intuitive grid layout
- **Cross-Platform**: Works on iOS, Android, and web platforms
- **Modern UI**: Clean, dark-themed interface with intuitive navigation

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A Google Cloud account with Vision API enabled

### Google Cloud Vision API Setup

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the [Cloud Vision API](https://console.cloud.google.com/apis/library/vision.googleapis.com)
3. Create an API key in the Credentials section
4. Keep your API key secure for the configuration step

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AroojiNO/SMPL.git
cd SMPL
```

2. Install dependencies:
```bash
npm install
```

3. Configure your environment:
   - Create a `.env` file in the root directory
   - Add your Google Vision API key:
   ```
   Vision_API_Key=your_api_key_here
   ```

## Usage

### Running the App

Start the development server:
```bash
npm start
```

This will open the Expo development tools. From there, you can:

- Press `a` to run on Android emulator
- Press `i` to run on iOS simulator
- Press `w` to run on web browser
- Scan the QR code with the Expo Go app on your physical device

### Platform-Specific Commands

Run on Android:
```bash
npm run android
```

Run on iOS:
```bash
npm run ios
```

Run on Web:
```bash
npm run web
```

### Example: Uploading a Recipe

1. Navigate to the "Photo Upload" tab
2. Tap "Upload a Photo Here"
3. Select a recipe image from your device
4. The app will automatically extract text using OCR
5. Process the recipe to convert it into macro information

## Project Structure

```
SMPL/
├── app/                    # App screens and navigation
│   ├── (tabs)/            # Tab-based navigation screens
│   │   ├── index.tsx      # Home screen with recipe grid
│   │   ├── photo_upload.tsx # Photo upload and OCR screen
│   │   └── _layout.tsx    # Tab navigation layout
│   ├── _layout.tsx        # Root layout
│   └── +not-found.tsx     # 404 screen
├── components/            # Reusable UI components
│   ├── Button.tsx
│   ├── ImageViewer.tsx
│   ├── ThemedText.tsx
│   ├── ThemedView.tsx
│   └── Vision_Requests.tsx
├── constants/             # App constants and colors
├── hooks/                 # Custom React hooks
├── assets/               # Images, fonts, and other assets
├── backend/              # Backend configuration
├── scripts/              # Utility scripts
├── app.json              # Expo configuration
├── package.json          # Project dependencies
└── tsconfig.json         # TypeScript configuration
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm test` - Run Jest tests
- `npm run lint` - Run ESLint for code quality checks
- `npm run reset-project` - Reset the project to initial state

## Technology Stack

- **Framework**: [Expo](https://expo.dev) ~52.0.24
- **UI Library**: [React Native](https://reactnative.dev) 0.76.5
- **Language**: TypeScript 5.3.3
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) ~4.0.16
- **OCR**: [Google Cloud Vision API](https://cloud.google.com/vision) 4.3.2
- **Image Handling**: [Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- **Testing**: Jest with jest-expo

## Design

View the app design and mockups on [Figma](https://www.figma.com/design/ilj1sYShVveoedpgDrXg7g/Meal-Planning-App?node-id=0-1&t=UyHvFtbg6wIGCjS8-1).

## Getting Help

- **Expo Documentation**: [https://docs.expo.dev](https://docs.expo.dev)
- **React Native Documentation**: [https://reactnative.dev/docs/getting-started](https://reactnative.dev/docs/getting-started)
- **Google Vision API Docs**: [https://cloud.google.com/vision/docs](https://cloud.google.com/vision/docs)
- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/AroojiNO/SMPL/issues)

## Troubleshooting

### Common Issues

**Expo CLI not found:**
```bash
npm install -g expo-cli
```

**Vision API errors:**
- Verify your API key is correctly set in the `.env` file
- Ensure the Vision API is enabled in your Google Cloud project
- Check that billing is enabled for your Google Cloud project

**Build errors:**
- Clear the cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Contributing

Contributions are welcome! If you'd like to contribute to SMPL:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and passes all linting checks.

## Maintainer

This project is maintained by the SMPL team. For questions or suggestions, please open an issue on GitHub.

## License

This project is private and proprietary.

---

Built with ❤️ using [Expo](https://expo.dev)
