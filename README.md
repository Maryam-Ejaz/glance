# User Profiles Application

## Description

This application fetches user data from [randomuser.me](https://randomuser.me) and displays it in both list and tabular views. It also provides a detailed view for each profile, using Next.js with TypeScript and styled with CSS modules.

## File Structure

```plaintext
src/
│
├── app/
│   ├── profiles/
│   │   ├── page.tsx           # Main profiles page with list and table views
│   │   ├── loading.tsx        # Loading indicator for the profiles page
│   │   ├── loadingDetail.tsx  # Loading indicator for the profile detail page
│   │   ├── [id]/
│   │   │   ├── page.tsx       # Profile detail page
│   │   │   ├── styles.module.css # Styles for the profile detail page
│   │   │   ├── components/    # Components specific to profile details
│   │   │   ├── data/          # Data utilities for profile details
│   │   │   ├── icons/         # Icons used in profile details
│   │   │   ├── providers/     # Providers for profile details
│   │   │   └── utils/         # Utility functions for profile details
│   ├── header/                # Header layout components
│   ├── layout.tsx             # Layout for the application
│   └── global.css             # Global styles
│
├── services/
│   └── userServices.ts        # Service for fetching user data
│
└── styles/
    └── loading.module.css     # Styles for loading indicators
```

## Features

- **List View Page** (`app/profiles/page.tsx`): Displays users in a list format. Includes search and sort functionalities.
- **Table View Page** (`app/profiles/page.tsx`): Shows users in a table format for structured viewing.
- **Profile Detail View Page** (`app/profiles/[id]/page.tsx`): Provides detailed information for a specific user.

## Components

- **Profiles Page**: Manages user display in list and table views with search and sorting options.
- **Profile Detail Page**: Displays detailed user information with dedicated components.
- **Loading Indicators**: Shows loading states using styles defined in `loading.module.css`.

## Setup Instructions

### 1. Download and Unzip the Repository

   Download the repository and unzip it to your local machine.

### 2. Set Up Environment Variables

   Create a `.env` file in the root directory of the project and add the following line to configure the Google Maps API key:

   ```plaintext
   NEXT_PUBLIC_GOOGLE_MAP_API=your_google_maps_api_key
   ```

### 3. Install Dependencies

   Open a terminal, navigate to the project directory, and run:

   ```bash
   npm install
   ```

   This installs all necessary dependencies for the project.

### 4. Run the Development Server

   Start the development server with:

   ```bash
   npm run dev
   ```

   This will start the Next.js development server and open the application in your default browser.

## Development Notes

- **Data Fetching**: Handled by `userServices.ts` in the `services` folder, which interacts with the `randomuser.me` API.
- **List and Table Views**: Managed in `app/profiles/page.tsx`.
- **Profile Details**: Displayed in `app/profiles/[id]/page.tsx`.
- **Styling**: CSS modules are used for styling, with definitions in `.module.css` files.
- **Loading States**: Managed using components in `loading.module.css`.

## Troubleshooting

- **API Key Issues**: Ensure the Google Maps API key in `.env` is correct and valid.
- **Dependency Issues**: Check for compatibility of your Node.js version with the project requirements if `npm install` fails.

For additional help, refer to the [Next.js documentation](https://nextjs.org/docs) or the [randomuser.me API documentation](https://randomuser.me/documentation).