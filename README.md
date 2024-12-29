# Stock Market Explorer

Stock Market Explorer is a React-based web application that allows users to search, explore, and paginate through stock market data fetched from the [Polygon.io API](https://polygon.io/).

## Features

- **Search Functionality**: Users can search stocks by name or ticker.
- **Infinite Scrolling**: Automatically fetch and load more stock data as the user scrolls down.
- **Pagination with Cursor**: Implements efficient pagination using the cursor-based mechanism provided by the API.
- **Debounced Search**: Reduces API calls by debouncing user input in the search bar.
- **Error Handling**: Provides appropriate feedback in case of errors.
- **Reusable Components**:
  - StockCard for displaying individual stock details.
  - SearchBar for user input.
  - Spinner for loading indicators.
  - ErrorMsg for graceful error.
  - NoDataFound for empty state handling.

## Tech Stack

- **Frontend**:
  - React (with TypeScript)
  - Tailwind CSS for styling
  - Redux Toolkit Query (RTK Query) for data fetching and state management
- **API**: [Polygon.io](https://polygon.io/) for stock market data

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd stock-market-explorer
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your Polygon.io API key:
   ```env
   REACT_APP_API_KEY=your_api_key_here
   ```
5. Start the development server:
   ```bash
   npm start
   ```

## Usage

### Searching Stocks

- Enter a stock name or ticker in the search bar.
- Results will automatically update after a short debounce period.

### Loading More Data

- Scroll down to fetch additional stocks automatically, or click the **Load More** button if implemented.

### Error Handling

- If an error occurs during data fetching, an error message will be displayed with a retry option.

## Project Structure

```
src/
├── components/
│   ├── StockCard.tsx
│   ├── SearchBar.tsx
│   ├── Spinner.tsx
│   └── ErrorMsg.tsx
├── features/
│   └── stocks/
│       └── stocksApi.ts
├── hooks/
│   └── useDebounce.ts
├── pages/
│   └── ExploreScreen.tsx
├── types/
│   └── index.ts
├── App.tsx
├── index.tsx
└── styles/
    └── tailwind.css
```

## API Details

- **Base URL**: `https://api.polygon.io/v3/reference`
- **Endpoints Used**:
  - `/tickers`: Fetches stock data with support for filtering and pagination.

### Sample Query

```http
GET /tickers?active=true&limit=21&search=AAPL&apiKey=your_api_key_here
```

## Future Enhancements

- Add user authentication.
- Save favorite stocks to a user profile.
- Improve the UI/UX with advanced charts for stock performance.
- Implement advanced filters for stock searches.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Polygon.io](https://polygon.io/) for providing stock market data.
- React, Redux Toolkit, and Tailwind CSS for powering the frontend.
