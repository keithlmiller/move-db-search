# Setup

In src/utils/api.js replace `<API_KEY_HERE>` with an api key

Run `yarn` and `yarn start`

# Challenges

The main challenge overall was trying to stay close to the time limit and not dive too deeply into different possible avenues of development/design. To help with this I tried to make sure I had met the bare requirements and something that looks relatively good and works well.

Testing with react testing library in this from CRA environment was something that I needed to do research for, which can eat up time easily.

# Decisions

I decided to make the search bar/header sticky, so that the user could easily modify the search even after scrolling down.

I played around with debounce, but it didn't appear to make it that much smoother, so I decided to focus on other things for this iteration, considering how fast the search is.

I decided not to make the stars actual images for the sake of time.

# Future improvements

- Clear search button
- Implement debounce search smoothly
- Make stars svg
- Improve visuals, add color
- Make page for each movie with more details, or minimize/maximize feature
- Add more search filters
- Add links to streaming services or reviews
- Add save/favorite functionality
